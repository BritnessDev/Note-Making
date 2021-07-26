const http= require('http')
const path=require('path')
const port= 8000
const express = require('express')
const app = express()
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.get("/", (req, res) => {
    return res.render("index");
  });
app.listen(port, () => {
    console.log('Server is listening on port',port)
  })