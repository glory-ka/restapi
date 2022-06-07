const Survey = require( '../models/surveyModel' );
const UserInfo = require( '../models/userIdModel' );
const returnError = require( './errorHandling' );

/** UPDATE ROUTE */

const changeSurveyStatus = ( req, res, next ) => {

    const ownerInfo = await UserInfo.find( { userUUID: req.ownerID } ).exec();

    if ( ownerInfo == null )
        returnError( 'User not found', next )

    await Survey.find( { surveyName: req.name, ownerInfo: ownerInfo } )
        .exec(
            function( error, survey ){
                if ( error ) return next( error );

                if ( survey == null )
                    returnError( 'Survey not found', next );

                survery.changeStatus = req.body.status;
        } );
};

const changeSurveyQuestion = ( req, res, next ) => {

    const ownerInfo = await UserInfo.find( { userUUID: req.ownerID } ).exec();

    if ( ownerInfo == null )
        returnError( 'User not found', next );

    await Survey.find( { surveyName: req.name, ownerInfo: ownerInfo } )
        .exec(
            function( error, survey ){
                if ( error ) return next( error );

                if ( survey == null )
                   returnError ( 'Survey not found', next );


                if ( survey.status === "unpublished" )
                    return ( new Error( 'Survey already publish' ); )

                survey.changeQuestion = req.body.question;
        } );
};

export {
    changeSurveyStatus,
    changeSurveyQuestion
};