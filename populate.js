#! /usr/bin/env node

// change mode to +x
// MONGODB_URL='mongodb+srv://glory-ka:jDCWKq8RSJuL52r@cluster0.9fhcb.mongodb.net/restapi?retryWrites=true&w=majority'
// DEBUG=restapi:*
// MONGODB_URL=$MONGODB_URL DEBUG=$DEBUG npm run devstart


var Response = require( './models/responseModel' );
var Survey = require( './models/surveyModel' );
var UserId = require( './models/userIdModel' );

var mongoose = require( 'mongoose' );

var userArg = process.argv.splice( 2 );
var mongodbUrl = userArg[ 0 ];
mongoose.connect( mongodbUrl, { useNewUrlParser: true, useUnifiedTopology: true } );
mongoose.Promise = global.Promise;

var connection = mongoose.connection;
connection.on( 'error', console.error.bind( console, 'Connection Error to mongodb' ) );

var createUser = ( firstName, lastName, uuid ) => {

    const user = new UserId({
        firstName: firstName,
        lastName: lastName,
        userUUID: uuid
    });

    user.save( ( error ) => {

        if ( error ){
            console.error( 'Useer creation failed' );
            return;
        }

        console.log( 'You Sucessfully created an user' );
    } );
};

createUser( 'Mathiew', 'Luther', '123abc' );
createUser( 'Simon', 'Socksi', '3455dds' );
createUser( 'Andre', 'Kariasim', '53ifnow' );

mongoose.connection.close();