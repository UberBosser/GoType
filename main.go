package main

import (
	"github.com/gin-contrib/gzip"
	"github.com/gin-gonic/gin"
)

func indexHandler(c *gin.Context) {
	c.HTML(200, "index.tmpl", nil)
}

func playHandler(c *gin.Context) {
	c.HTML(200, "play.tmpl", nil)
}

func noHandler(c *gin.Context) {
	c.HTML(404, "404.tmpl", nil)
}

func main() {
	router := gin.Default()
	router.Use(gzip.Gzip(gzip.DefaultCompression))
	router.LoadHTMLGlob("./templates/*/*.tmpl")

	router.Static("/static", "./static")
	router.GET("/", indexHandler)
	router.GET("/play", playHandler)

	wsRouter := newRouter()
	router.GET("/ws", wsRouter.websocketHandler)
	wsRouter.Handle(CTS_ADD_USER, addUser)
	wsRouter.Handle(CTS_UPDATE_USER, updateUser)

	router.NoRoute(noHandler)

	router.Run()
}
