const createError = require('http-errors');
var express  = require('express');
var session  = require('express-session');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var morgan = require('morgan');
const path = require('path');

var app = express();
// var server = require('http').Server(app);
var server = require('https').Server(app);

var io = require('socket.io')(server);

var indexRouter = require('./routes/index');
var port = process.env.PORT;

var passport = require('passport');
var flash    = require('connect-flash');

require('./config/passport')(passport);

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');



app.use(morgan('dev'));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Para el passport
app.use(session({
	secret: 'ssdspeoirnvjdfhjds',
	resave: true,
	saveUninitialized: true
}));

app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

//rutas

require('./routes/index.js')(app, passport);

// catch 404 and forward to error handler
app.use((req, res) => res.sendFile("not_found.html", {root: path.join(__dirname, "public")}));


// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

io.on('connection', (socket) => {
	console.log(socket.id);
    socket.broadcast.emit('new user', {message : "Ha entrado un usuario al chat"})
    socket.on('new_message', (message) => {
        console.log(message);
        io.emit('new_message', message);
    })
})

module.exports = app;
