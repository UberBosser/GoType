package main

import (
	"github.com/google/uuid"
	"github.com/mitchellh/mapstructure"
)

func addUser(c *Client, data interface{}) {
	c.game.Clients = append(c.game.Clients, c)
	var user User
	mapstructure.Decode(data, &user)
	u, err := uuid.NewRandom()
	if err != nil {
		return
	}
	user.Id = u.String()
	c.game.NewUser <- user

	var init Init
	init.Id = u.String()
	init.Text = c.game.Text

	var message Message
	message.Code = STC_INIT_USER
	message.Data = init
	c.message <- message
}

func updateUser(c *Client, data interface{}) {
	var user User
	mapstructure.Decode(data, &user)
	c.game.UpdateUser <- user
}
