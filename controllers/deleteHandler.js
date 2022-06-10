const Survey = require( '../models/surveyModel' );
const Response = require( '../models/responseModel' );
const UserInfo = require( '../models/userIdModel' );
const { returnError } = require( './errorHandling' );

/** PUT ROUTE */

exports.deleteUserResponse = async ( req, res, next ) => {

    const validateUser = await UserInfo.findOne( { firstName: req.body.firstname, lastName: req.body.lastname } )
        .exec();

    const validateOwner = await UserInfo.findOne( { userUUID: req.body.ownerId } )
        .exec();

    if ( validateUser == null || validateOwner == null )
        return returnError( 'User or Owner not found', next )


    const validateSurvey = await Survey.findOne( { surveyName: req.params.name, ownerInfo: validateOwner } )
        /*.populate( 'ownerInfo' ) // Dont need to populate */
        .exec();

    if ( validateSurvey == null )
        return returnError( 'Survey not found', next );


    await Response.deleteOne( { survey: validateSurvey, user: validateUser } )
        /*.populate( ['user', 'survey'] ) // Dont need to populate */
        .exec(
            function( error, response ){
                if ( error ) return next( error );

                res.json( { response: "Response sucessfully deleted", report: response } );
        } );

};

exports.deleteSurvey = async ( req, res, next ) => {

    const validateOwner = await UserInfo.findOne( { userUUID: req.body.ownerId } )
        .exec();

    if ( validateOwner == null )
       return returnError( 'Incorrect user id', next );

    await Survey.findOneAndDelete( { surveyName: req.params.name, ownerInfo: validateOwner } )
       /* .populate( 'ownerInfo' )*/
        .exec(
            function( error, result ) {
                if ( error ) return next( error );

                res.json( { status: "Survey successfully deleted", deleted: result } );
            }
        );
};


