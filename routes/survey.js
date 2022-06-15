const express = require('express');
const router = express.Router();

const { 
        listPublishedSurvey, 
        surveyDetail,
        createNewSurvey,
        changeSurveyStatus,
        changeSurveyQuestion,
        deleteSurvey 
    } = require( "../controllers/surveyController" )




/** GET ROUTER */
router.get('/published', listPublishedSurvey);
router.get('/:name/detail', surveyDetail);



/** POST ROUTER */
router.post( '/:name/:userId/create', createNewSurvey )


/** DELETE ROUTER */
router.delete('/:name/:ownerId/delete', deleteSurvey);

/** PUT ROUTER */
router.put('/:name/:ownerId/status', changeSurveyStatus);
router.put('/:name/:ownerId/question', changeSurveyQuestion);


module.exports =  router;