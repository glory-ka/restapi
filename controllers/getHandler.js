const Survey = require('../models/surveyModel');
const Response = require('../models/responseModel');


/** GET CONTROLLER */

const listPublishedSurvey = (req, res, next) => {
    Survey.find( { status: 'published', ownerName: { $not: { req.userID }} } ) // CHANGE USERID TO USER NAME
        .exec({
            function ( error, survey_list ){
                if ( error ) return next( error );

                res.send( JSON.stringify( survey_list.map( survey => survey.surveyName )));
            }
        });
};

const listAllOpenSurvey = ( req, res, next ) => {
    Survey.find( { date_close: { $gte: Date() }})
        .exec( {
            function( error, survey_list ){
                if ( error ) return next( error );

                res.send( JSON.stringify( survey_list.map( survey => survey.surveyName )));
            }
        });
};

const surveyDetail = ( req, res, next ) => {
    Survey.find( { surveyName: req.name } )
        .exec( {
            function( error, survey ){
                if ( error ) return next( error );

                res.send( JSON.stringify( survey ));
            }
        } );
};

const surveyResponseCount = ( req, res, next ) => {
    Survey.find( { surveyName: req.name } )
        .exec( {
            function( error, survey ){
                if( error ) return next( error );

                Response.find( { servey: servey } )
            }
        } );
};

export {
        listPublishedSurvey,
        listAllOpenSurvey,
        surveyDetail,
        surveyResponseCount
};
