const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const port = process.env.PORT || 3000;

var app = express();


hbs.registerPartials(__dirname+'/views/partials');
app.set('view engine','hbs');



app.use((req, res, next) =>{
	now = new Date().toString();
	
	var log = `${now}: ${req.method} ${req.url}`;
	console.log(log);
	fs.appendFile('server.log',log + '\n' , (err) => {
		if (err) {
			console.log('Unable to append to server.log');
		}
	});
	next();
});

app.use((req, res, next) => {
	res.render('maintenance.hbs',{
		pageTitle: 'Maintenance',
		welcomeMessage: 'We will be right back',
	});
});

//middleware
app.use(express.static(__dirname+'/public'));

hbs.registerHelper('getCurrentYear',() => {
	return new Date().getFullYear()
});


hbs.registerHelper('screamIt', (text) => {
	return text.toUpperCase();
});

app.get('/', (req, res) => {
	//res.send('<h1>Hello Express</h1>');
	// res.send({
		// name: 'Andrew',
		// likes : [
		// 'Biking',
		// 'Cities'
		// ],
	// });
	res.render('home.hbs',{
		pageTitle: 'Home Page',
		welcomeMessage: 'Hello! welcome',
	});
});

app.get('/about',(req,res) => {
	//res.send('About page');
	res.render('about.hbs', {
		pageTitle: 'About Page',
	});
});

app.get('/bad',(req,res) => {
	res.send({
		errorMessage: 'Unable to process this request',
	});
});

app.listen(port , () => {
	console.log(`Server is up on port ${port}`);
});