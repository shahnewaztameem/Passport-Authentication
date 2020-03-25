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

app.use(express.static(__dirname + '/public'));
app.set('view engine', 'ejs');
app.use(passport.initialize());
app.use(passport.session());
app.use(bodyParser.urlencoded({extended: true}));

passport.use(new LocalStrategy(User.authenticate()))
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser())

// ===================
// Routes
// ===================

app.get('/', (req, res) => {
    res.render('home');
});

app.get('/dashboard', isLoggedIn, (req, res) => {
    res.render('dashboard');
});

// ===================
// Signup Routes
// ===================

app.get('/signup', (req, res) => {
    res.render('signup');
});

app.post('/signup', (req, res) => {
    User.register(new User({username: req.body.username , email: req.body.email}), req.body.password, (error, user) => {
        if(error) {
            console.log(error);
            return res.render('signup');
        }
        passport.authenticate('local')(req, res, () => {
            res.redirect('/dashboard');
        })
    });
});

// ===================
// Login Routes
// ===================
app.get('/login', (req, res) => {
    res.render('login');
});

app.post('/login', passport.authenticate('local', {
    successRedirect: '/dashboard',
    failureRedirect: '/login'
}) ,(req, res) => {})

// ===================
// Logout Route
// ===================

app.get('/logout', (req, res) => {
    req.logOut();
    res.redirect('/')
});

// ===================
// Middleware
// ===================

function isLoggedIn(req, res, next) {
    if(req.isAuthenticated()) {
        return next();
    }
    res.redirect('/login');
}

// ===================
// Server startup
// ===================

app.listen(process.env.PORT || 3000, () => {
    console.log("Server has started");
});
