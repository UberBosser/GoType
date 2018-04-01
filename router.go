package main

import (
	"github.com/gin-gonic/gin"
	"github.com/gorilla/websocket"
	"log"
	"net/http"
)

type Handler func(*Client, interface{})

var upgrader = websocket.Upgrader{
	ReadBufferSize:  1024,
	WriteBufferSize: 1024,
	CheckOrigin:     func(r *http.Request) bool { return true },
}

type Router struct {
	rules map[int]Handler
	games Games
}

func newRouter() *Router {
	return &Router{
		rules: make(map[int]Handler),
	}
}

func (r *Router) Handle(code int, handler Handler) {
	r.rules[code] = handler
}

func (r *Router) FindHandler(code int) (Handler, bool) {
	// One liner?
	handler, found := r.rules[code]
	return handler, found
}

func (r *Router) websocketHandler(c *gin.Context) {
	conn, err := upgrader.Upgrade(c.Writer, c.Request, nil)
	if err != nil {
		c.Writer.WriteHeader(http.StatusInternalServerError)
		log.Println(err)
		return
	}
	client := newClient(conn, r.FindHandler, r.games.findGame())
	go client.Read()
	go client.Write()
}
