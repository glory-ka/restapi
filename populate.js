var Response = require( './models/responseModel' );
var Survey = require( './models/surveyModel' );
var UserId = require( './models/userIdModel' );

var mongoose = require( 'mongoose' );


var createUser = ( firstName, lastName, uuid ) => {

    const user = new UserId({
        firstName: firstName,
        lastName: lastName,
        userId: uuid
    });

};