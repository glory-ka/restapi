const survey = require('../models/surveyModel');


/** GET CONTROLLER */

const listPublishedSurvey = (req, res, next) => {
    survey.find( { status: 'published',  } )
        .exec({
            function ( error, survey_list ){
                if ( error ) return next( error );

                res.send( JSON.stringify( survey_list.map( survey => survey.surveyName )));
            }
        });
};

const listAllOpenSurvey = (req, res, next) => {
    survey.find( { date_close: { $gte: Date() }})
        .exec( {
            function( error, survey_list ){
                if ( error ) return next( error );

                res.send( JSON.stringify( survey_list.map( survey => survey.surveyName )));
            }
        });
};

const surveyDetail = (req, res, next) => {
    survey.find()
};

const surveyResponseCount = (req, res) => {
    console.log("Not Yet implemented");
};

export {
        listPublishedSurvey,
        listAllOpenSurvey,
        surveyDetail,
        surveyResponseCount
};
