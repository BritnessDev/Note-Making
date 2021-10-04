const path = require('path');
const port = process.env.PORT;
const db = require('./config/mongoose');
const User = require('./models/signupSchema');
const Notes = require('./models/notesSchema');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const express = require('express');
const app = express();
require('dotenv').config();
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

  // User.find({},(err,data)=>{
  //     if(err)console.log(err)
  //     console.log(data)
  // })
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
