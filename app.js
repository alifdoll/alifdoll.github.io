const express = require('express');
const mysql = require('mysql');
const app = express();

app.use(express.static('public'));
app.use(express.urlencoded({extended:false}));

app.get('/', (req, res) => {
	res.render('top.ejs');
});

const connection = mysql.createConnection({
	host: 'localhost',
	user: 'root',
	password: 'ubayakontol321',
	database: 'list_app'
});

app.get('/index', (req, res) => {
	connection.query(
    'SELECT * FROM users',
    (error, results) => {
      res.render('index.ejs', {items: results});
    }
  );
});

app.get('/edit/:id', (req, res) => {
	connection.query(
		'SELECT * FROM users WHERE id = ?',
		[req.params.id],
		(error, results) => {
			res.render('edit.ejs', {item: results[0]});
		});
});

app.post('/update/:id', (req, res) => {
	 connection.query(
    'UPDATE  users SET name = ? WHERE id = ?',
    [req.body.itemName, req.params.id],
    (error, results)=>{
      res.redirect('/index');
    });
});

app.get('/new', (req, res) => {
	res.render('new.ejs');
});

app.post('/create', (req, res) => {
	connection.query(
		'INSERT INTO users (name) VALUES (?)',
		[req.body.itemName],
		(error, results)=>{
			res.redirect('/index');
		});
});

app.post('/delete/:id', (req, res)=>{
	connection.query(
		'DELETE FROM users WHERE id = ?',
		[req.params.id],
		(error, results)=>{
			res.redirect('/index');
		});
});

app.listen(3000);

