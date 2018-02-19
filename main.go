package main

import (
    "log"
    "net/http"
    "html/template"
    "io/ioutil"
    "encoding/json"
    "github.com/google/uuid"
//    "time"
)

var text string

type webError struct {
    ErrorName    string
    ErrorMessage string
}

type playTemplate struct {
    Uuid    string
    UserNumber int
    Text    string
}

type userData struct {
    Uuid    string `json:",omitempty"`
    UserNumber int
    Name    string
    Wpm        int
    Percentage int
}

type gameData struct {
    Text        string
    Time           int
    ConnectedUsers int
    Users   []userData
}

type gameLobby struct {
    GameData gameData
    Uuids    []string
}

func (g *gameLobby) create() {
    t, _ := ioutil.ReadFile("texts.txt")
    text = string(t)
    log.Println(text)
    g.GameData.Text = text
}

func (g *gameLobby) update() {
}

func (g *gameLobby) save() {
    b, _ := json.Marshal(g.GameData)
    // Save to file.
    ioutil.WriteFile("./data/test.json", b, 0644)
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
            te := playTemplate{Uuid: u.String(), UserNumber: g.GameData.ConnectedUsers, Text: g.GameData.Text} 
            g.GameData.ConnectedUsers += 1
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
        http.ServeFile(w, r, "./data/test.json") 
    } else {
        var u userData
        decoder := json.NewDecoder(r.Body) 
        decoder.Decode(&u)
        if (u.Uuid == g.Uuids[int(u.UserNumber)]) {
            u.Uuid = ""
            if (g.GameData.Users[u.UserNumber].Percentage != 100) { 
                g.GameData.Users[u.UserNumber].Wpm = u.Wpm
                g.GameData.Users[u.UserNumber].Percentage = u.Percentage
            }
            g.save()
        }
    }
}


func main() {
    lobby := &gameLobby{}
    lobby.create()
    lobby.save()

    http.HandleFunc("/", homeHandler)
    http.HandleFunc("/play", lobby.playHandler)
    http.HandleFunc("/data", lobby.dataHandler)
    
    fs := http.FileServer(http.Dir("static"))
    http.Handle("/static/", http.StripPrefix("/static/", fs))

    log.Println("Server running on port 8080")
    log.Fatal(http.ListenAndServe(":8080", nil))
}
