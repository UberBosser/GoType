package main

import (
    "log"
    "net/http"
    "html/template"
    "io/ioutil"
    "os"
)

var text string

type webError struct {
    ErrorName    string
    ErrorMessage string
}

type playText struct {
    Text string
}

func errorHandler(w http.ResponseWriter, r *http.Request, e *webError) { 
    t := template.Must(template.ParseFiles("./templates/error.tmpl")) 
    t.Execute(w, e)
}

func homeHandler(w http.ResponseWriter, r *http.Request) {
    http.ServeFile(w, r, "./templates/index.html")
}

func playHandler(w http.ResponseWriter, r *http.Request) {
    if r.Method == "GET" {
        t := template.Must(template.ParseFiles("./templates/play.tmpl"))
        p := playText{Text: text}
        t.Execute(w, p)
    } else {
        r.ParseForm()
        log.Println(r.Form["wpm"])
    }
}

func loginHandler(w http.ResponseWriter, r *http.Request) {}


func main() {
    file, _ := os.Open("texts.txt")
    t, _ := ioutil.ReadAll(file)
    text = string(t)
    file.Close()

    http.HandleFunc("/", homeHandler)
    http.HandleFunc("/play", playHandler)
    http.HandleFunc("/login", loginHandler)
    
    fs := http.FileServer(http.Dir("static"))
    http.Handle("/static/", http.StripPrefix("/static/", fs))

    log.Println("Server running on port 8080")
    log.Fatal(http.ListenAndServe(":8080", nil))
}
