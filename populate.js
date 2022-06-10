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
//console.log( connection );

var userList = [];
var surveyList = [];

var createUser = ( firstName, lastName, uuid ) => {

    const user = new UserId({
        firstName: firstName,
        lastName: lastName,
        userUUID: uuid
    });

    userList.push( user );

    return user.save();

};

const createSurvey = (surveyName, owner, date_open, date_close, status, question ) => {

    const survey = new Survey( {

        surveyName: surveyName,
        ownerInfo: owner,
        date_open: date_open,
        date_close: date_close,
        status: status,
        question: question

    } );

    surveyList.push( survey );

    return survey.save();
};

const createResponse = async ( user, response, otherResponse, survey ) => {

    let responseObject = {
        user: user,
        survey: survey
    }

    if ( response != undefined && response != null && response.length > 0 )
        responseObject.response = response;
    else
        response.otherResponse = otherResponse;

    const _response = new Response( {

        user: user,
        survey: survey

    } );

    return _response.save();
};


const surveyQuestion = ( question, ...answerList ) => {

    let answer = {};
    answerList.forEach( ( item, index ) => {
        answer[`answer${index}`] = item;
        return item;
    } );

    return {
        question: question,
        ...answer
    }
};

const questionGroup1 = surveyQuestion( 'What is the color of the pacific ocean', 'darkblue', 'blue', 'black' );
const questionGroup2 = surveyQuestion( 'What country is at war taday', 'Yemen', 'Congo', 'Ukrain' );



try {

    // CREATE USERS
    Promise.all([
        createUser( 'Mathiew', 'Luther', '123abc' ),
        createUser( 'Simon', 'Socksi', '3455dds' ),
        createUser( 'Andre', 'Kariasim', '53ifnow' ),
        createUser( 'Sulivan', 'Rodriguez', 'kfj8392')
    ])

    // CREATE SURVEY
    .then( _ =>
        Promise.all([
            createSurvey('OceanSurvey', userList[0], new Date(), new Date('7/12/2022'), 'unpublished', questionGroup1),
            createSurvey('GeogrSurvey', userList[1], new Date(), new Date('7/10/2022'), 'unpublished', questionGroup2),
            createSurvey('PolitSurvey', userList[2], new Date(), new Date('6/27/2022'), 'unpublished', questionGroup2),
            createSurvey('WaterSurvey', userList[3], new Date(), new Date('8/02/2022'), 'unpublished', questionGroup1),
            createSurvey('NaturSurvey', userList[2], new Date(), new Date('8/30/2022'), 'unpublished', questionGroup1),
            createSurvey('NatioSurvey', userList[3], new Date(), new Date('9/19/2022'), 'unpublished', questionGroup2)
        ])
    )

    // CREATE RESPONSE
    .then( _ =>
        Promise.all([
            createResponse(userList[2], 'blue', undefined, surveyList[0]),
            createResponse(userList[3], 'Yemen', undefined, surveyList[1]),
            createResponse(userList[0], 'Congo', undefined, surveyList[1]),
            createResponse(userList[1], 'darkblue', undefined, surveyList[0]),
            createResponse(userList[3], 'Ukrain', undefined, surveyList[2]),
            createResponse(userList[1], 'Congo', undefined, surveyList[2]),
            createResponse(userList[0], 'black', undefined, surveyList[3]),
            createResponse(userList[1], 'darkblue', undefined, surveyList[4]),
            createResponse(userList[2], 'Yemen', undefined, surveyList[5]),
            createResponse(userList[1], 'Yemen', undefined, surveyList[5]),
            createResponse(userList[0], 'Ukrain', undefined, surveyList[5]),
            createResponse(userList[2], 'blue', undefined, surveyList[0])
        ])
    )
    .then( _ => console.log( 'All data was successfully sent to the database' ))
    .then( _ => mongoose.connection.close())

} catch( error ) {

    console.log( 'Object creation failed: ', error );
}






