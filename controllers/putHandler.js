const Survey = require( '../models/surveyModel' );
const UserInfo = require( '../models/userIdModel' );
const returnError = require( './errorHandling' );

/** UPDATE ROUTE */

exports.changeSurveyStatus = ( req, res, next ) => {

    const ownerInfo = UserInfo.find( { userUUID: req.params.ownerID } ).exec();

    if ( ownerInfo == null )
        returnError( 'User not found', next )

    Survey.find( { surveyName: req.body.name, ownerInfo: ownerInfo } )
        .exec(
            function( error, survey ){
                if ( error ) return next( error );

                if ( survey == null )
                    returnError( 'Survey not found', next );

                survery.changeStatus = req.body.status;
        } );
};

exports.changeSurveyQuestion = ( req, res, next ) => {

    const ownerInfo = UserInfo.find( { userUUID: req.params.ownerID } ).exec();

    if ( ownerInfo == null )
        returnError( 'User not found', next );

    Survey.find( { surveyName: req.body.name, ownerInfo: ownerInfo } )
        .exec(
            function( error, survey ){
                if ( error ) return next( error );

                if ( survey == null )
                   returnError( 'Survey not found', next );

                if ( survey.status === "unpublished" )
                    returnError( 'Survey already publish', next );

                survey.changeQuestion = req.body.question;
        } );
};
