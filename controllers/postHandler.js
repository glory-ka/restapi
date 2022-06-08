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

    if ( !validateUser || !validateSurvey || validateUser == null || validateSurvey == null )
        returnError( 'Incorrect user id or survey name', next );

    if ( ! validateSurvey[0].isAnswerExist( req.body.response ) )
        returnError( "Response doesn't exist", next );
    
    if ( validateSurvey[0].status === 'unpublished' )
        returnError( 'This Servery is not published yet' );
    // TODO: check that only one sruvey is returned

    const response = new Response( {
        user: validateUser[0],
        response: req.body.response,
        survey: validateSurvey[0]
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
        user: validateUser[0],
        response: req.body.response,
        survey: validateSurvey[0]
    } );

    response.save( function( error ){
        if (error) return next( error );

        res.send( JSON.stringify( { status: "Response Successfully Saved!" } ) );
    } );
};

exports.createNewSurvey = async ( req, res, next ) => {
    
    const validateUser = await UserInfo.find( { userUUID: req.params.userID } ).exec();
    
    if ( !validateUser || validateUser == null )
        returnError( 'Access denied: user not found', next );

    const newSurvey = new Survey( {
        surveyName: req.body.name,
        ownerInfo: validateUser[0],
        date_open: new Date(req.body.date_open),
        date_close: new Date(req.body.date_close),
        status: req.body.status,
        question: req.body.question
    } );

    newSurvey.save( ( error ) => {
        
        if( error ) return next( error );
        
        res.send( JSON.stringify( { response: 'Survey was sucessfully added' } ) );
    } );
};
