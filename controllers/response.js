const Survey = require( '../models/surveyModel' );
const Response = require( '../models/responseModel' );
const UserInfo = require( '../models/userIdModel' );


// GET SURVEY RESPONSE COUNT 
exports.surveyResponseCount = async ( req, res, next ) => {

    await Survey.findOne( { surveyName: req.params.name, status: 'published' } )
        .exec(
            async function( error, survey ){
                if( error ) return next( error );

                if ( survey == null || Object.keys( survey ).length == 0 )
                    return res.status( 404 ).json( { response:  'Survey not found' } );

                await Response.find( { survey: survey } )
                    /*.populate( 'survey' ) //Dont have to populate*/
                    .exec(
                        function( error, response_list ){
                            if( error ) return next ( error );

                            res.json( { response: response_list.length } );
                        }
                    );
            }
    );
};


// POST SURVEY QUESTION
exports.respondToSurvey = async ( req, res, next ) => {

    const [ validateUser, validateSurvey ] = Promise.all([
         UserInfo.findOne( { userUUID: req.params.userId } ).exec(),
         Survey.findOne( { surveyName: req.params.name, status: 'published' } ).exec()
    ]);

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

// POST OTHER SURVEY QUESTION
exports.otherResponse = async ( req, res, next ) => {

    const [ validateUser, validateSurvey ] = Promise.all([
        UserInfo.findOne( { userUUID: req.params.userId } ).exec(),
        Survey.findOne( { surveyName: req.params.name, status: 'published' } ).exec()
   ]);

    if ( validateUser == null || validateSurvey == null )
        return res.status( 404 ).json( { response: "Incorrect user id or survey name" } );


    const validateResponse = await Response.findOne( { user: validateUser, survey: validateSurvey } ).exec();

    if ( validateResponse != null )
        return res.status( 404 ).json( { response: "You already have a response" } );

    if ( validateSurvey.doesAnswerExist( req.body.response ) )
        return res.status( 404 ).json( { response: "Incorrect Alernative response format" } );

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


// DELETE RESPONSE
exports.deleteUserResponse = async ( req, res, next ) => {

    const [ validateOwner, validateUser ] = Promise.all([
        UserInfo.findOne( { userUUID: req.params.ownerId } ).exec(),
        UserInfo.findOne( { firstName: req.query.firstname, lastName: req.query.lastname } ) .exec()
    ]);

    if ( validateUser == null || validateOwner == null )
        return res.status( 404 ).json( { response: 'User or Owner not found' } );


    const validateSurvey = await Survey.findOne( { surveyName: req.params.name, ownerInfo: validateOwner } )
        /*.populate( 'ownerInfo' ) // Dont need to populate */
        .exec();

    if ( validateSurvey == null )
        return res.status( 404 ).json( { response: 'Survey not found' } );


    await Response.deleteOne( { survey: validateSurvey, user: validateUser } )
        /*.populate( ['user', 'survey'] ) // Dont need to populate */
        .exec(
            function( error, _response ){
                if ( error ) return next( error );

                res.json( { response: "Response sucessfully deleted", report: _response } );
        } );

};