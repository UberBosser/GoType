# GoTemplate
Gin + Infernojs = 💙

[Gin](https://github.com/gin-gonic/gin) and [Infernojs](https://github.com/infernojs/inferno) create a blazing fast server/client.

## Project tree
```
GoTemplate
├── main.go
├── package.json
├── README.md
├── src
│   ├── components
│   │   └── navbar.jsx
│   ├── containers
│   │   ├── 404.jsx
│   │   └── index.jsx
│   ├── css
│   │   └── global.sass
│   └── images
├── static
│   ├── css
│   │   ├── 404.bundle.css
│   │   ├── bootstrap.min.css
│   │   └── index.bundle.css
│   ├── images
│   │   └── favicon.ico
│   └── js
│       ├── 404.bundle.js
│       └── index.bundle.js
├── templates
│   ├── includes
│   │   └── headers.tmpl
│   └── layouts
│       ├── 404.tmpl
│       └── index.tmpl
├── webpack.config.js
└── yarn.lock
```
* `main.go` main Gin server.
* `src` .jsx + .sass.
* `src/components` contain components of the ui.
* `src/containers` different web pages.
* `static` webpacked .css and .js.
* `templates/includes` Golang template "defines".
* `templates/layouts` Golang container templates.
