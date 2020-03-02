// FileName: index.js
// Import express
let express = require('express')
let path = require('path');
let passport = require('passport');


var indexRouter = require("./routes/index");

// Initialize the app
let app = express();
app.use(express.static(__dirname + '/public'));
// Setup server port
var port = process.env.PORT || 8080;


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

app.post('/login',
  passport.authenticate('local'),
  function(req, res) {
    // If this function gets called, authentication was successful.
    // `req.user` contains the authenticated user.
    res.redirect('/users/' + req.user.username);
 });


