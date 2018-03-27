package main

import (
	"github.com/gin-gonic/gin"
)

func indexHandler(c *gin.Context) {
	c.HTML(200, "index.tmpl", nil)
}

func noHandler(c *gin.Context) {
	c.HTML(404, "404.tmpl", nil)
}

func main() {
	router := gin.Default()
	router.LoadHTMLGlob("./templates/*/*.tmpl")

	router.Static("/static", "./static")
	router.GET("/", indexHandler)

	router.NoRoute(noHandler)

	router.Run()
}
