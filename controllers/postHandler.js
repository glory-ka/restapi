const Survey = require( '../models/surveyModel' );
const Response = require( '../models/responseModel' );
const UserInfo = require( '../models/userIdModel' );
const returnError = require( './errorHandling' );

/** POST ROUTE */

exports.respondToSurvey = ( req, res, next ) => {

    const validateUser = UserInfo.find( { userUUID: req.params.userID } )
        .exec();

    const validateSurvey = Survey.find( { surveyName: req.body.name } )
        .exec();

    if ( validateUser == null || validateSurvey == null )
        returnError( 'Incorrect user id or survey name', next );

    if ( ! validateSurvey.isAnswerExist( req.body.response ) )
        returnError( "Response doesn't exist", next );

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


exports.otherResponse = ( req, res, next ) => {

    const validateUser = UserInfo.find( { userUUID: req.params.userID } )
        .exec();

    const validateSurvey = Survey.find( { surveyName: req.body.name } )
        .exec();

    if ( validateUser == null || validateSurvey == null )
        req.send( JSON.stringify( { Error: "Incorrect user id or survey name" } ) );

    if ( validateSurvey.isAnswerExist( req.body.reponse ) )
        returnError( 'Incorrect Alernative response format', next );

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

exports.createNewSurvey = ( req, res, next ) => {

    const validateUser = UserInfo.find( { userUUID: req.params.userID } ).exec();

    if ( !validateUser || validateUser == null )
        returnError( 'Access denied: user not found', next );

    const newSurvey = new Survey( {
        surveyName: req.body.name,
        ownerInfo: validateUser,
        date_open: req.body.date_open,
        date_close: req.body.date_close,
        status: req.body.status,
        question: req.body.question
    } );

    newSurvey.save( ( error ) => {

        if( error ) return next( error );

        res.send( JSON.stringify( { response: 'Survey was sucessfully added' } ) );
    } );
};
