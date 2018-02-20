package main

import (
    "log"
    "os"
    "net/http"
    "html/template"
    "io/ioutil"
    "encoding/json"
    "github.com/google/uuid"
    "math/rand"
    "time"
)

var text string

const letterBytes = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"

func idGenerator() string {
    b := make([]byte, 5)
    for i := range b {
        b[i] = letterBytes[rand.Intn(len(letterBytes))]
    }
    return string(b)
}

type webError struct {
    ErrorName    string
    ErrorMessage string
}

type playTemplate struct {
    GameID  string
    Uuid    string
    UserNumber int
    Text    string
}

type userData struct {
    Uuid    string `json:",omitempty"`
    UserNumber int
    Name    string
    Wpm    float32
    Characters int
    Percentage int
}

type gameData struct {
    Text           string
    TextSize          int
    CountdownTime float32
    GameTime      float32
    ConnectedUsers    int
    Users      []userData
}

type gameLobby struct {
    GameID     string
    GameData gameData
    Uuids    []string
}


var lobby *gameLobby

func (g *gameLobby) create() {
    t, _ := ioutil.ReadFile("texts.txt")
    text = string(t)
    g.GameData.Text = text
    g.GameData.TextSize = len(g.GameData.Text)
    log.Println(g.GameData.TextSize)
    g.GameData.CountdownTime = 20
    g.GameData.GameTime = 120
    g.GameID = idGenerator()
    log.Println(g.GameID + " : Lobby created.")
    g.save()
    go g.update()
}

func (g *gameLobby) update() {
    for true {
        start := time.Now()
        if (g.GameData.GameTime == 0) {
            os.Remove("./data/" + g.GameID + ".json")
            return 
        } else if (g.GameData.CountdownTime == 1) {
            lobby = &gameLobby{}
            lobby.create()
            g.GameData.CountdownTime -= 1
            g.save()
        } else if (g.GameData.CountdownTime == 0) {
            g.GameData.GameTime -= 1 
            g.save()
        } else if (g.GameData.ConnectedUsers > 1) {
            g.GameData.CountdownTime -= 1 
            g.save()
        }
        end := time.Now()
        time.Sleep(1 * time.Second - end.Sub(start))
    }
}

func (g *gameLobby) save() {
    b, _ := json.Marshal(g.GameData)
    // Save to file.
    ioutil.WriteFile("./data/" + g.GameID + ".json", b, 0644)
}

func errorHandler(w http.ResponseWriter, r *http.Request, e *webError) { 
    t := template.Must(template.ParseFiles("./templates/error.tmpl")) 
    t.Execute(w, e)
}

func homeHandler(w http.ResponseWriter, r *http.Request) {
    http.ServeFile(w, r, "./templates/index.html")
}

func (g *gameLobby) playHandler(w http.ResponseWriter, r *http.Request) {
    if r.Method == "GET" {
        if (g.GameData.ConnectedUsers < 4) {
            u, _ := uuid.NewRandom()
            g.GameData.Users = append(g.GameData.Users, userData{UserNumber: g.GameData.ConnectedUsers, Name: "Guest"})
            g.Uuids = append(g.Uuids, u.String())
            te := playTemplate{GameID: g.GameID, Uuid: u.String(), UserNumber: g.GameData.ConnectedUsers, Text: g.GameData.Text} 
            g.GameData.ConnectedUsers += 1
            g.save()
            t := template.Must(template.ParseFiles("./templates/play.tmpl"))
            t.Execute(w, te)
        }
    } else {
        r.ParseForm()
        log.Println(r.Form["wpm"])
    }
}


func (g *gameLobby) dataHandler(w http.ResponseWriter, r *http.Request) {
    if r.Method == "GET" {
        http.ServeFile(w, r, "./data/" + g.GameID + ".json") 
    } else {
        var u userData
        decoder := json.NewDecoder(r.Body) 
        decoder.Decode(&u)
        if (u.Uuid == g.Uuids[int(u.UserNumber)]) {
            u.Uuid = ""            
            if (g.GameData.Users[u.UserNumber].Percentage != 100 && g.GameData.GameTime < 120 && u.Characters > 0) { 
                g.GameData.Users[u.UserNumber].Wpm = (float32(u.Characters)/5)/((120 - g.GameData.GameTime)/60)
                g.GameData.Users[u.UserNumber].Percentage = u.Percentage
            }
        }
    }
}


func main() {
    rand.Seed(time.Now().UnixNano())
    lobby = &gameLobby{}
    lobby.create()

    http.HandleFunc("/", homeHandler)
    http.HandleFunc("/play", lobby.playHandler)
    http.HandleFunc("/data", lobby.dataHandler)
    
    fs := http.FileServer(http.Dir("static"))
    http.Handle("/static/", http.StripPrefix("/static/", fs))

    log.Println("Server running on port 8080")
    log.Fatal(http.ListenAndServe(":8080", nil))
}
