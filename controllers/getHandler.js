const survey = require('../models/surveyModel');


/** GET CONTROLLER */

const listPublishedSurvey = (req, res, next) => {
    survey.find()
        .exec({
            function (error, survey_list){
                if (error) return next(error);

                res.send(JSON.stringify( survey_list.filter(survey => )));
            }
        });
};

const listAllOpenSurvey = (req, res) => {
    console.log("Not Yet implemented");
};

const surveyDetail = (req, res) => {
    console.log("Not Yet implemented");
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
