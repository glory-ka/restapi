const survey = require('../models/surveyModel');


/** GET CONTROLLER */

const listPublishedSurvey = (req, res, next) => {
    survey.find({status: 'publish'})
        .exec({
            function (error, survey_list){
                if (error) return next(error);

                res.send(JSON.stringify(survey_list));
            }
        });
};

const listAllOpenSurvey = (req, res) => {
    survey.find({date_close: { $gte: Date() }})
        .exec({
            function(error, survey_list){
                if (error) return next(error);

                res.send(JSON.stringify(survey_list));
            }
        });
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
