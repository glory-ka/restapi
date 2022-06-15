const express = require('express');
const router = express.Router();

const { 
        listPublishedSurvey, 
        surveyDetail,
        createNewSurvey,
        changeSurveyStatus,
        changeSurveyQuestion,
        deleteSurvey 
    } = require( "../controllers/survey" )




/** GET ROUTER */
router.get('/published', listPublishedSurvey);
router.get('/:name/detail', surveyDetail);



/** POST ROUTER */
router.post( '/:name/:userId/create', createNewSurvey )


/** DELETE ROUTER */
router.delete('/:name/:ownerId/survey', deleteSurvey);

/** PUT ROUTER */
router.put('/:name/:ownerId/status', changeSurveyStatus);
router.put('/:name/question', changeSurveyQuestion);


module.exports =  router;