const Survey = require( '../models/surveyModel' );
const Response = require( '../models/responseModel' );
const UserInfo = require( '../models/userIdModel' );

/** PUT ROUTE */

const deleteUserResponse = ( req, res, next ) => {

    const validateUser = await UserInfo.find( { userUUID: req.ownerID } )
                                    .exec();

    if ( validateUser == null )
        req.send( JSON.stringify( { Error: "Incorrect user id" } ) );

    const validateSurvey = await Survey.find( { surveyName: req.name, ownerInfo: validateUser } )
                                    .populate( 'ownerInfo' )
                                    .exec();
    if ( validateSurvey == null )
        req.send( JSON.stringify( { Error: "Incorrect survey name" } ) );


    const response = await Response.find( { survey: validateSurvey } )
                                .populate( ['user', 'survey'] )
                                .exec(
                                    function( error, response_list ){
                                        if ( error ) return next( error );

                                        response_list.forEach( response => {
                                            if (response.name === req.body.name){
                                                
                                            }
                                        });
                        } );
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