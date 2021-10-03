const path = require('path');
const port = 8000;
const db = require('./config/mongoose');
const Users = require('./models/signupSchema');
const Notes = require('./models/notesSchema');
const express = require('express');
const { log } = require('console');
const app = express();
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static('assets'));
app.use(express.urlencoded({ extended: true }));
app.get('/', (req, res) => {
  return res.render('index');
});
app.get('/index', (req, res) => {
  return res.render('index');
});
app.get('/login', (req, res) => {
  console.log(req.body);

  return res.render('login');
});
app.get('/sign', (req, res) => {
  return res.render('sign');
});
app.get('/notes', (req, res) => {
  return res.render('notes');
});
app.post('/signup', (req, res) => {
  const { name, password, email } = req.body;
  if (!name || !password || !email) {
    return res.status(422).json({ error: 'Not filled details' });
  }
  const user = new Users();
  user.name = name;
  user.password = password;
  user.email = email;
  user.save((err, userdata) => {
    if (err) console.log(err);
    console.log(userdata);
  });
  // Users.find({},(err,data)=>{
  //     if(err)console.log(err)
  //     console.log(data)
  // })

  return res.render('notes');
});
app.post('/login', (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(422).json({ error: 'Not filled' });
  }
  Users.findOne({ email: email }, (err, data) => {
    if (err) console.log(err);
    if (data) {
      console.log(data);
      return res.render('notes');
    } else {
      return res.status(400).json({ error: 'Invalid credentials' });
    }
  });
});
app.post('/save', (req, res) => {
  const { date, notes } = req.body;
  if (!date || !notes) {
    return res.status(422).json({ error: 'Not filled' });
  }
  const Note = new Notes();
  Note.date = date;
  Note.notes = notes;
  Note.save((err, note) => {
    if (err) console.log(err);
    else console.log(note);
  });
  // Notes.find({}, function(err, data){
  //     if(err)console.log(err);
  //     console.log(data);
  // });
  res.redirect('notes');
});
app.listen(port, () => {
  console.log('Server is listening on port', port);
});
