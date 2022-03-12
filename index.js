const path = require('path');
const dotenv = require('dotenv');
dotenv.config();
const db = require('./config/mongoose');
const Note = require('./models/notesSchema');
const port = process.env.PORT || 8000;
const express = require('express');
const app = express();
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static('assets'));
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  Note.find({},(err,notes)=>{
    res.render('notes',{notesArray:notes,idTask:0});
  })
});

app.get('/remove/:id',(req,res) => {
  const id=req.params.id;
  Note.findByIdAndRemove(id, err => {
    if (err) return res.send(500, err);
    res.redirect("/");
    });
})
app.get('/edit/:id',(req, res) => {
const id = req.params.id;
Note.find({}, (err, not) => {
res.render("notes", { notesArray: not, idTask: id });
});
})
app.post('/edit/:id',(req, res) => {
const id = req.params.id;
Note.findByIdAndUpdate(id, { content: req.body.content }, err => {
if (err) return res.send(500, err);
res.redirect("/");
});
});
app.post('/save', (req, res) => {
  const {content} = req.body;
  if (!content) {
    return res.status(422).json({ error: 'Not filled' });
  }
  const note = new Note();
  note.content = content;
  note.save((err, not) => {
    if (err) console.log(err);
    else console.log(not);
  });
  
  res.redirect('/');
});
app.listen(port, () => {
  console.log('Server is listening on port', port);
});
