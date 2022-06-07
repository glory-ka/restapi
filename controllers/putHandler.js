const Survey = require( '../models/surveyModel' );
const Response = require( '../models/responseModel' );
const UserInfo = require( '../models/userIdModel' );

/** PUT ROUTE */

const deleteUserResponse = ( req, res, next ) => {

    const validateUser = await UserInfo.find( { userUUID: req.ownerID } )
                                    .exec();
    const validateSurvey = await Survey.find( { surveyName: req.name, ownerInfo: validateUser } )
                                    .populate( 'ownerInfo' )
                                    .exec();

    if ( validateUser == null || validateSurvey == null )
        req.send( JSON.stringify( { Error: "Incorrect user id or survey name" } ) );

if ( ! validateSurvey.isAnswerExist( req.body.reponse ) )
req.send( JSON.stringify( { Error: "Response doesn't exist" } ) );
};

const deleteSurvey = ( req, res, next ) => {
    console.log("Not yet implemented");
};


export {
        deleteUserResponse,
        deleteSurvey
};