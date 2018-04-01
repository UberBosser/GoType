package main

import (
	"github.com/gorilla/websocket"
)

type FindHandler func(int) (Handler, bool)

type Message struct {
	Code int         `json:"code"`
	Data interface{} `json:"data"`
}

type Client struct {
	conn        *websocket.Conn
	message     chan Message
	findHandler FindHandler
	game        *Game
}

func (c *Client) Read() {
	var message Message
	for {
		if err := c.conn.ReadJSON(&message); err != nil {
			break
		}
		if handler, found := c.findHandler(message.Code); found {
			handler(c, message.Data)
		}
	}
	c.game.RemoveClient <- c
	c.conn.Close()
}

func (c *Client) Write() {
	for m := range c.message {
		if err := c.conn.WriteJSON(m); err != nil {
			break
		}
	}
	c.game.RemoveClient <- c
	c.conn.Close()
}

func newClient(conn *websocket.Conn, findHandler FindHandler, game *Game) *Client {
	return &Client{
		conn:        conn,
		message:     make(chan Message),
		findHandler: findHandler,
		game:        game,
	}
}
