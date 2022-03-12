const path = require('path');
const dotenv = require('dotenv');
dotenv.config();
const db = require('./config/mongoose');
const User = require('./models/signupSchema');
const Note = require('./models/notesSchema');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const express = require('express');
const app = express();
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static('assets'));
app.use(express.urlencoded({ extended: true }));
app.get('/', (req, res) => {
   res.render('index');
});
app.get('/index', (req, res) => {
   res.render('index');
});
app.get('/login', (req, res) => {
  console.log(req.body);

  res.render('login');
});
app.get('/sign', (req, res) => {
  res.render('sign');
});
app.get('/notes', (req, res) => {
  Note.find({},(err,notes)=>{
    res.render('notes',{notesArray:notes,idTask:0});
  })
});
app.post('/signup', async (req, res) => {
  const { name, password, email } = req.body;
  if (!name || !password || !email) {
    return res.status(422).json({ error: 'Not filled details' });
  }
  const user = new User();
  user.name = name;
  user.password = await bcrypt.hash(password, 12);
  user.email = email;
  await user.save();
  return res.render('notes');
});
app.post('/login', async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(422).json({ error: 'Not filled' });
  }
  const user = await User.findOne({ email: email });
  const isMatch = await bcrypt.compare(password, user.password);
  console.log(user, '999999', isMatch);
  if (user) {
    if (isMatch) {
      return res.render('notes');
    } else {
      return res.status(401).json({ error: 'User does not exist' });
    }
  } else {
    return res.status(401).json({ error: 'User does not exist' });
  }
});
app.get('/remove/:id',(req,res) => {
  const id=req.params.id;
  Note.findByIdAndRemove(id, err => {
    if (err) return res.send(500, err);
    res.redirect("/notes");
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
res.redirect("/notes");
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
  
  res.redirect('notes');
});
app.listen(process.env.PORT, () => {
  console.log('Server is listening on port', process.env.PORT);
});
