const Survey = require( '../models/surveyModel' );
const Response = require( '../models/responseModel' );
const UserInfo = require( '../models/userIdModel' );
const returnError = require( './errorHandling' );

/** POST ROUTE */

const respondToSurvey = ( req, res, next ) => {

    const validateUser = await UserInfo.find( { userUUID: req.userID } )
        .exec();

    const validateSurvey = await Survey.find( { surveyName: req.name } )
        .exec();

    if ( validateUser == null || validateSurvey == null )
        req.send( JSON.stringify( { Error: "Incorrect user id or survey name" } ) );

    if ( ! validateSurvey.isAnswerExist( req.body.reponse ) )
        req.send( JSON.stringify( { Error: "Response doesn't exist" } ) );

    const response = new Response( {
        user: validateUser,
        response: req.body.response,
        survey: validateSurvey
    } );

    response.save( function( error ){
        if (error) return next( error );

        res.send( JSON.stringify( { status: "Response Successfully Saved!" } ) );
    } );

};


const otherResponse = ( req, res, next ) => {

    const validateUser = await UserInfo.find( { userUUID: req.userID } )
        .exec();
    const validateSurvey = await Survey.find( { surveyName: req.name } )
        .exec();

    if ( validateUser == null || validateSurvey == null )
        req.send( JSON.stringify( { Error: "Incorrect user id or survey name" } ) );

    if ( validateSurvey.isAnswerExist( req.body.reponse ) )
        req.send( JSON.stringify( { Error: "Incorrect Alernative response format" } ) );

    const response = new Response( {
        user: validateUser,
        response: req.body.response,
        survey: validateSurvey
    } );

    response.save( function( error ){
        if (error) return next( error );

        res.send( JSON.stringify( { status: "Response Successfully Saved!" } ) );
    } );
};

export {
        respondToSurvey,
        otherResponse
};