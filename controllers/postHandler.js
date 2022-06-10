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

    if ( validateUser == null || validateSurvey == null )
        return res.status( 404 ).json( { response: "Incorrect user id or survey name" } );

    if ( ! validateSurvey.doesAnswerExist( req.body.response ) )
        return res.status( 404 ).json( { response: "Response doesn't exist" } );

    // TODO: check that only one sruvey is returned

    const validateResponse = await Response.findOne( { user: validateUser, survey: validateSurvey } ).exec();

    if ( validateResponse != null )
        return res.status( 403 ).json( { response: "You already have a response" } );

    const response = new Response( {
        user: validateUser,
        response: req.body.response,
        survey: validateSurvey
    } );

    // MODEL.prototype.save() doesn't return a promise when called with a callback
    response.save( function( error ){
        if (error) return next( error );

        res.json( { response: "Response Successfully Saved!" } );
    } );

};


exports.otherResponse = async ( req, res, next ) => {

    const validateUser = await UserInfo.findOne( { userUUID: req.body.userId } )
        .exec();

    const validateSurvey = await Survey.findOne( { surveyName: req.params.name, status: 'published' } )
        .exec();

    if ( validateUser == null || validateSurvey == null )
        return res.status( 404 ).json( 'Incorrect user id or survey name', next );


    const validateResponse = await Response.findOne( { user: validateUser, survey: validateSurvey } ).exec();

    if ( validateResponse != null )
        return res.status( 404 ).json( "You already have a response", next, errorCode=403 );

    if ( validateSurvey.doesAnswerExist( req.body.response ) )
        return res.status( 404 ).json( 'Incorrect Alernative response format', next, errorCode=403 );

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

exports.createNewSurvey = async ( req, res, next ) => {

    const validateUser = await UserInfo.findOne( { userUUID: req.body.userId } ).exec();

    if ( validateUser == null )
        return res.status( 404 ).json( 'Incorrect user id or survey name', next );

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

        res.json( { response: 'Survey was sucessfully added' } );
    } );
};
