
var express = require( 'express' );
var path = require( 'path' );
var cookieParser = require( 'cookie-parser' );
var logger = require( 'morgan');
var catchError = require( 'http-errors' );
var mongoose = require( 'mongoose' );


var serverRouter = require( './routes/survey.js' );

var app = express();

app.use( logger( 'dev' ) );
app.use( express.json() );
app.use( express.urlencoded({ extended: false } ) );
app.use( cookieParser() );
app.use( express.static( path.join( __dirname, 'public' ) ) );

app.use( '/orangutan/survey', serverRouter );

app.use( ( req, res, next ) => {
    next( catchError( 404 ) );
} );

app.use( () )

module.exports = app;

var mongooseDB = process.env.MONGODB_URL || '-';
mongoose.connect( mongooseDB, { useNewUrlParse: true, userUnifiedTopology: true } )

var connection = mongoose.connection;
connection.on( 'error' , console.error.bing( console, 'Connection To database Interrupted' ) )
