const Survey = require( '../models/surveyModel' );
const Response = require( '../models/responseModel' );
const UserInfo = require( '../models/userIdModel' );
const returnError = require( './errorHandling' );

/** PUT ROUTE */

const deleteUserResponse = ( req, res, next ) => {

    const validateUser = await UserInfo.find( { userUUID: req.ownerID } )
        .exec();

    if ( validateUser == null ){
        returnError( 'Incorrect User Id', next )
    }

    const validateSurvey = await Survey.find( { surveyName: req.name, ownerInfo: validateUser } )
        .populate( 'ownerInfo' )
        .exec();

    if ( validateSurvey == null ){
        returnError( 'Incorrect Survey Name', next );
    }


    const response = await Response.find( { survey: validateSurvey } )
        .populate( ['user', 'survey'] )
        .exec(
            function( error, response_list ){
                if ( error ) return next( error );

                if ( response_list == null )
                    returnError( 'User Response not found' , next );

                response_list.forEach( response => {
                    if (response.name === req.body.name){
                        response.changeResponse = undefined;
                    }
                });
    } );

};

const deleteSurvey = ( req, res, next ) => {

    const validateUser = await UserInfo.find( { userUUID: req.ownerID } )
        .exec();

    if ( validateUser == null )
       returnError( 'Incorrect user id', next );

    const validateSurvey = await Survey.find( { surveyName: req.name, ownerInfo: validateUser } )
        .populate( 'ownerInfo' )
        .exec();

    if ( validateSurvey == null )
        returnError( 'Incorrect survey name', next );

    await Survey.deleteOne( { surveyName: req.name } )
        .exec(
            function( error, result ) {
                if ( error ) return next(error);

                res.send( JSON.stringify( { status: "Survey successfully deleted" } ) );
            }
        );
};


export {
    deleteUserResponse,
    deleteSurvey
};