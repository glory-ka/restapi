const Survey = require( '../models/surveyModel' );
const Response = require( '../models/responseModel' );
const UserInfo = require( '../models/userIdModel' );

/** POST ROUTE */

const respondToSurvey = ( req, res, next ) => {

    const validateUser = await UserInfo.find( { userUUID: req.userID } )
                                .exec();
    const validateSurvey = await Survey.find( { surveyName: req.name } )
                                .exec();

    if ( validateUser == null || validateSurvey == null ) return;

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
    
};

export {
        respondToSurvey,
        otherResponse
};