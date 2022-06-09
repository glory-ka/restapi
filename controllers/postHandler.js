const Survey = require( '../models/surveyModel' );
const Response = require( '../models/responseModel' );
const UserInfo = require( '../models/userIdModel' );
const { returnError } = require( './errorHandling' );

/** POST ROUTE */

exports.respondToSurvey = async ( req, res, next ) => {

    const validateUser = await UserInfo.findOne( { userUUID: req.body.userId } )
        .exec();

    const validateSurvey = await Survey.findOne( { surveyName: req.params.name, status: 'published' } )
        .exec();

    if ( validateUser == null || validateSurvey == null || 
            Object.keys( validateUser ).length == 0 ||  Object.keys( validateSurvey ).length == 0 )
        returnError( 'Incorrect user id or survey name', next );

    if ( ! validateSurvey.doesAnswerExist( req.body.response ) )
        returnError( "Response doesn't exist", next );
    
    // TODO: check that only one sruvey is returned

    const validateResponse = await Response.findOne( { user: validateUser } ); 

    if ( validateResponse != null )
        returnError( "You already have a response", next ); // CHANGE ERROR CODE

    const response = new Response( {
        user: validateUser,
        response: req.body.response,
        survey: validateSurvey
    } );

    await response.save( function( error ){
        if (error) return next( error );

        res.json( { response: "Response Successfully Saved!" } );
    } );

};


exports.otherResponse = async ( req, res, next ) => {

    const validateUser = await UserInfo.findOne( { userUUID: req.body.userId } )
        .exec();

    const validateSurvey = await Survey.findOne( { surveyName: req.params.name, status: 'published' } )
        .exec();

    if ( validateUser == null || validateSurvey == null || 
        Object.keys(validateUser).length == 0 ||  Object.keys(validateSurvey).length == 0 )
            returnError( 'Incorrect user id or survey name', next );

    if ( validateSurvey.doesAnswerExist( req.body.response ) )
        returnError( 'Incorrect Alernative response format', next ); // CHANGE ERROR MESSAGE

    const response = new Response( {
        user: validateUser,
        response: req.body.response,
        survey: validateSurvey
    } );

    await response.save( function( error ){
        if (error) return next( error );

        res.send( JSON.stringify( { status: "Response Successfully Saved!" } ) );
    } );
};

exports.createNewSurvey = async ( req, res, next ) => {
    
    const validateUser = await UserInfo.findOne( { userUUID: req.body.userId } ).exec();
    
    if ( validateUser == null || validateSurvey == null || 
        Object.keys(validateUser).length == 0 ||  Object.keys(validateSurvey).length == 0 )
            returnError( 'Incorrect user id or survey name', next );

    const newSurvey = new Survey( {

        surveyName: req.params.name,
        ownerInfo: validateUser,
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
