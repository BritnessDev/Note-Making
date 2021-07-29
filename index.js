const http = require('http')
const path = require('path')
const port = 8000
const db = require('./config/mongoose')
const signup = require('./models/signup')
const notes = require('./models/notes')
const express = require('express')
const { notStrictEqual } = require('assert')
const app = express()
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
// app.use(express.urlencoded());
app.use(express.static('assets'))
app.use(express.urlencoded({ extended: true }));
app.get("/", (req, res) => {
    return res.render("index");
});
app.get("/index", (req, res) => {
    return res.render("index");
});
app.get("/login", (req, res) => {
    return res.render("login");
});
app.get("/notes", function(req, res){
    notes.find({},function(err,notes){
        if(err){
        console.log('Error in fetching contacts from db');
        return;
    }
    return res.render("notes",{
        notes: notes
    });
})
});
app.get("/sign", (req, res) => {
    return res.render("sign");
});
app.post("/signup", function (req, res) {
    signup.create({
        name: req.body.name,
        password: req.body.name,
        email: req.body.name
    }, function (err, newUser) {
        if (err) {
            console.log('Error in creating a user!')
            return;
        }
        console.log('******', newUser);
        return res.redirect('notes');

    }
    )
})
app.post("/save", function (req, res) {
    notes.create({
        date: req.body.value,
        notes: req.body.value
    }, function (err, newNotes) {
        if (err){
            console.log('Error in creating a user!');
        return;
        }
    console.log('******', newNotes);
    return res.redirect('notes');
    })

})
// app.post('/save',function(req,res){
//     let newNote=new notes({
//         date: req.body.name,
//         notes: req.body.valu
//     }) 
//     newNote.save()
// })
app.listen(port, () => {
    console.log('Server is listening on port', port)
})