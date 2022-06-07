const Survey = require( '../models/surveyModel' );
const Response = require( '../models/responseModel' );
const UserInfo = require( '../models/userIdModel' );

/** PUT ROUTE */

const deleteUserResponse = ( req, res, next ) => {

    const validateUser = await UserInfo.find( { userUUID: req.ownerID } )
        .exec();

    if ( validateUser == null ){
        const err = new Error( 'Incorrect user id' );
        err.status = 404;
        return next( err );
    }

    const validateSurvey = await Survey.find( { surveyName: req.name, ownerInfo: validateUser } )
                                    .populate( 'ownerInfo' )
                                    .exec();
    if ( validateSurvey == null ){
        const err = new Error( 'Incorrect survey name' );
        err.status = 404;
        return next( err );
    }


    const response = await Response.find( { survey: validateSurvey } )
        .populate( ['user', 'survey'] )
        .exec(
            function( error, response_list ){
                if ( error ) return next( error );

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
        req.send( JSON.stringify( { Error: "Incorrect user id" } ) );

    const validateSurvey = await Survey.find( { surveyName: req.name, ownerInfo: validateUser } )
        .populate( 'ownerInfo' )
        .exec();

    if ( validateSurvey == null )
        req.send( JSON.stringify( { Error: "Incorrect survey name" } ) );

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