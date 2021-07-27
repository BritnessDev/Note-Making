const http= require('http')
const path=require('path')
const port= 8000
const express = require('express')
const app = express()
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static('assets'))
app.get("/", (req, res) => {
    return res.render("index");
  });
  app.get("/login", (req, res) => {
    return res.render("login");
  });
  app.get("/notes", (req, res) => {
    return res.render("notes");
  });
  app.get("/sign", (req, res) => {
    return res.render("sign");
  });
app.listen(port, () => {
    console.log('Server is listening on port',port)
  })