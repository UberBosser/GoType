package main

import (
	"time"
)

const (
	// Client to Server
	CTS_ADD_USER    = 0
	CTS_UPDATE_USER = 1
	// Server to Client
	STC_ADD_USER     = 2
	STC_UPDATE_USERS = 3
	STC_INIT_USER    = 4
	STC_START_GAME   = 5
	STC_END_GAME     = 6
	// Events
	E_CONNECT    = 7
	E_DISCONNECT = 8
	E_ERROR      = 9
)

type User struct {
	Id    string `json:"-"`
	Name  string `json:"name"`
	Chars int    `json:"chars"`
}

type Init struct {
	Id   string `json:"id"`
	Text string `json:"text"`
}

type Game struct {
	Text         string       `json:"-"`
	Users        []User       `json:"users"`
	CdTime       int          `json:"cdtime"`
	Started      bool         `json:"started"`
	Ended        bool         `json:"ended"`
	Clients      []*Client    `json:"-"`
	NewUser      chan User    `json:"-"`
	UpdateUser   chan User    `json:"-"`
	RemoveClient chan *Client `json:"-"`
}

func newGame() *Game {
	return &Game{
		Text:         "Typing text goes here",
		CdTime:       20,
		Started:      false,
		Ended:        false,
		NewUser:      make(chan User),
		UpdateUser:   make(chan User),
		RemoveClient: make(chan *Client),
	}
}

func (g *Game) run() {
	timeTick := time.Tick(1 * time.Second)
	emitTick := time.Tick(500 * time.Millisecond)
	for {
		select {
		case user := <-g.NewUser:
			g.Users = append(g.Users, user)
		case user := <-g.UpdateUser:
			for i, u := range g.Users {
				if u.Id == user.Id {
					g.Users[i] = user
				}
			}
		case client := <-g.RemoveClient:
			for i, c := range g.Clients {
				if c == client {
					g.Clients[i] = g.Clients[len(g.Clients)-1]
					g.Clients = g.Clients[:len(g.Clients)-1]
				}
			}
		case <-emitTick:
			var message Message
			message.Code = STC_UPDATE_USERS
			message.Data = *g
			for _, client := range g.Clients {
				client.message <- message
			}
		case <-timeTick:
			if len(g.Users) > 1 {
				if g.CdTime > 0 {
					g.CdTime -= 1
				}
			}
			if g.CdTime == 0 && g.Started == false {
				g.Started = true
				g.CdTime = len(g.Text) * 3
			} else if g.CdTime == 0 && g.Started == true && g.Ended == false {
				g.Ended = true
				g.CdTime = 10
			} else if g.CdTime == 0 && g.Ended == true {
				for _, c := range g.Clients {
					c.conn.Close()
				}
				return
			}
		}
	}
}

type Games struct {
	games []*Game
}

func (g *Games) findGame() *Game {
	for i, game := range g.games {
		if game.CdTime > 5 {
			return game
		} else {
			g.games[i] = g.games[len(g.games)-1]
			g.games = g.games[:len(g.games)-1]
		}
	}
	game := newGame()
	go game.run()
	g.games = append(g.games, game)
	return game
}
