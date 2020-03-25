var express                 = require('express'),
    mongoose                = require('mongoose'),
    passport                = require('passport'),
    bodyParser              = require('body-parser'),
    User                    = require('./models/user'),
    LocalStrategy           = require('passport-local'),
    passportLocalMongoose   = require('passport-local-mongoose');
    
// ===================
// DB conncection
// ===================

mongoose.connect("mongodb://localhost/passport_auth", {useNewUrlParser: true,useUnifiedTopology: true});

var app = express();
app.use(require('express-session')({
    secret: 'xpired brain is on fire',
    resave: true,
    saveUninitialized: false
}));
app.set('view engine', 'ejs');
app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser())

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
