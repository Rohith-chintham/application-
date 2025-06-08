const express = require('express');
const bodyParser = require('body-parser');
const db = require('./db');
const path = require('path');

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

app.set('view engine', 'ejs');

app.get('/', (req, res) => {
  res.render('form');
});

app.post('/submit', (req, res) => {
  const { name, email, phone, dob, address } = req.body;
  const sql = 'INSERT INTO applicants (name, email, phone, dob, address) VALUES (?, ?, ?, ?, ?)';
  db.query(sql, [name, email, phone, dob, address], (err, result) => {
    if (err) throw err;
    res.send('Application submitted successfully!');
  });
});

app.listen(3000, () => {
  console.log('Server started on http://localhost:3000');
});
