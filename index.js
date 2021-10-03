const path = require('path')
const port = 8000
const db = require('./config/mongoose')
const Signup = require('./models/signupSchema')
const Notes = require('./models/notesSchema')
const express = require('express')
const app = express()
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
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
app.get("/sign", (req, res) => {
    return res.render("sign");
});
app.get('/notes',(req,res)=>{
    return res.render('notes')
})
app.post("/signup",(req,res)=>{
    console.log(req.body);
    return res.render("notes")
})
app.post("/login",(req,res)=>{
    console.log(req.body);
    return res.render("notes")
})
app.post('/save',async(req,res)=>{
    const {date,notes}=req.body;
    const Note= new Notes()
    Note.date=date;
    Note.notes=notes;
    Note.save((err,note)=>{
        if(err)
        console.log(err);
        else
        console.log(note);
    })
    Notes.find({}, function(err, data){
        console.log(data);
    });
    res.redirect('notes')
})
app.listen(port, () => {
    console.log('Server is listening on port', port)
})
