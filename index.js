// FileName: index.js
// Import express
let express = require('express')
let path = require('path');
let passport = require('passport');
let bodyParser = require('body-parser')
let bcrypt = require('bcrypt')
let flash = require('express-flash')
let session = require('express-session')
let methodOverride = require('method-override')



//Here is the passport authentication
let initializePassport = require('./passport-config')

var indexRouter = require("./routes/index");

const users = []

// Initialize the app
let app = express();
app.use(flash());
app.use(express.urlencoded({ extended: false }))
app.use(express.static(__dirname + '/public'));
app.use(bodyParser());

// Setup server port
var port = process.env.PORT || 8080;
app.use(session({ 
  cookie: { maxAge: 60000 },
  secret: 'secret',
  resave: false,
  saveUninitialized: false
}))

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.get("/hello", (req, res, next) => {
	// mongo 
	res.send({
		hello: 'world'
	})
})

// Send message for default URL
app.use("/", indexRouter);
app.use(passport.initialize())
app.use(passport.session())
app.use(methodOverride('_method'))


app.use(function(req, res, next) {
  next(createError(404));
});

app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});


// Launch app to listen to specified port
app.listen(port, function () {
     console.log("Running RestHub on port " + port);
});



initializePassport(
  passport,
  email => users.find(user => user.email === email),
  id => users.find(user => user.id === id)
)



app.post('/register', checkNotAuthenticated, async (req, res) => {
	console.log("AQUI VA");
  try {
  	console.log("AQUI VA");
    const hashedPassword = await bcrypt.hash(req.body.password, 10)
    users.push({
      id: Date.now().toString(),
      name: req.body.name,
      email: req.body.email,
      password: hashedPassword
    })
    console.log("AQUI VA");
    console.log(users);
    res.redirect('/login')
  } catch {
    res.redirect('/register')
  }
})



function checkAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next()
  }

  res.redirect('/login')
}

function checkNotAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return res.redirect('/')
  }
  next()
}









