const Survey = require( '../models/surveyModel' );
const Response = require( '../models/responseModel' );
const UserInfo = require( '../models/userIdModel' );
const returnError = require( './errorHandling' );

/** GET CONTROLLER */

const listPublishedSurvey = ( req, res, next ) => {

    const validateUser = await UserInfo.find( {  } ).exec();

    await Survey.find( { status: 'published', ownerInfo: { $not: { req.} } } ) // CHANGE USERID TO USER NAME
        .exec(
            function ( error, survey_list ){
                if ( error ) return next( error );

                if ( survey_list == null )
                    returnError( 'No Survey found', next );

                res.send( JSON.stringify( survey_list.map( survey => survey.surveyName ) ) );
            }
         );
};

const listAllOpenSurvey = ( req, res, next ) => {

    await Survey.find( { date_close: { $gte: Date() } } )
        .exec(
            function( error, survey_list ){
                if ( error ) return next( error );

                if ( survey_list == null )
                    returnError( 'No Survey found', next );

                res.send( JSON.stringify( survey_list.map( survey => survey.surveyName ) ) );
            }
         );
};

const surveyDetail = ( req, res, next ) => {

    await Survey.find( { surveyName: req.name } )
        .exec(
            function( error, survey ){
                if ( error ) return next( error );

                if ( survey == null )
                    returnError( 'Survey not found' , next );

                res.send( JSON.stringify( survey ));
            }
         );
};

const surveyResponseCount = ( req, res, next ) => {

    await Survey.find( { surveyName: req.name } )
        .exec(
            function( error, survey ){
                if( error ) return next( error );

                if ( survey == null )
                    returnError( 'Survey not found', next );

                await Response.find( { servey: servey } )
                    .populate( 'survey' )
                    .exec(
                        function( error, reponse_list ){
                            if( error ) return next ( error );

                            res.send( JSON.stringify( response_list.length ) );
                        };
                     );
            }
         );
};

export {
    listPublishedSurvey,
    listAllOpenSurvey,
    surveyDetail,
    surveyResponseCount
};
