
var express = require( 'express' );
var path = require( 'path' );
var cookieParser = require( 'cookie-parser' );
var logger = require( 'morgan');
var createError = require( 'http-errors' );
var mongoose = require( 'mongoose' );


var serverRouter = require( './routes/survey.js' );

var app = express();

app.use( logger( 'dev' ) );
app.use( express.json() );
app.use( express.urlencoded({ extended: false } ) );
app.use( cookieParser() );
app.use( express.static( path.join( __dirname, 'public' ) ) );

app.use( '/orangutan/survey', serverRouter );

app.use(function(req, res, next) {
    next(createError(404));
  });
  
  // error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;

var mongooseDB = process.env.MONGODB_URL || '-';
mongoose.connect( mongooseDB, { useNewUrlParser: true, useUnifiedTopology: true } )

var connection = mongoose.connection;
connection.on( 'error' , console.error.bind( console, 'Connection To database Interrupted' ) )
