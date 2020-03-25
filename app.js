var express = require('express'),
    mongoose = require('mongoose'),
    bodyParser = require('body-parser'),
    expressSession = require('express-session');

 
// ===================
// DB conncection
// ===================
mongoose.connect("mongodb://localhost/passport_auth", {useNewUrlParser: true,useUnifiedTopology: true});

var app = express();
app.set('view engine', 'ejs');


// ===================
// Routes
// ===================
app.get('/', (req, res) => {
    res.render('home');
});

app.get('/dashboard', (req, res) => {
    res.render('dashboard');
});

// ===================
// Server startup
// ===================
app.listen(process.env.PORT || 3000, () => {
    console.log("Server has started");
});
