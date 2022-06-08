const Survey = require( '../models/surveyModel' );
const Response = require( '../models/responseModel' );
const UserInfo = require( '../models/userIdModel' );
const returnError = require( './errorHandling' );

/** GET CONTROLLER */

exports.listPublishedSurvey = ( req, res, next ) => {

    const validateUser = UserInfo.find( { userUUID: req.params.userID } ).exec();

    if( validateUser == null )
        returnError( 'Access denied: User not found', next );

    Survey.find( { status: 'published', ownerInfo: { $ne : req.params.userID } } )
        .exec(
            function ( error, survey_list ){
                if ( error ) return next( error );

                if ( survey_list == null )
                    returnError( 'No Survey found', next );

                res.send( JSON.stringify( survey_list.map( survey => survey.surveyName ) ) );
            }
         );
};

exports.listAllOpenSurvey = ( req, res, next ) => {

    Survey.find( { date_close: { $gte: Date() } } )
        .exec(
            function( error, survey_list ){
                if ( error ) return next( error );

                if ( survey_list == null )
                    returnError( 'No Survey found', next );

                res.send( JSON.stringify( survey_list.map( survey => survey.surveyName ) ) );
            }
         );
};

exports.surveyDetail = ( req, res, next ) => {

    Survey.find( { surveyName: req.params.name } )
        .exec(
            function( error, survey ){
                if ( error ) return next( error );

                if ( survey == null )
                    returnError( 'Survey not found' , next );

                res.send( JSON.stringify( survey ));
            }
         );
};

exports.surveyResponseCount = ( req, res, next ) => {
    Survey.find( { surveyName: req.params.name } )
        .exec(
            function( error, survey ){
                if( error ) return next( error );

                if ( survey == null )
                    returnError( 'Survey not found', next );

                Response.find( { survey: survey } )
                    .populate( 'survey' )
                    .exec(
                        function( error, response_list ){
                            if( error ) return next ( error );

                            res.send( JSON.stringify( response_list.length ) );
                        }
                     );
            }
         );
};


