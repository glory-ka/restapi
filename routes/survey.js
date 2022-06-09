const express = require('express');
const router = express.Router();

const { listPublishedSurvey, listAllOpenSurvey, surveyDetail, surveyResponseCount } = require('../controllers/getHandler');
const { respondToSurvey, otherResponse, createNewSurvey } = require( '../controllers/postHandler');
const { deleteUserResponse, deleteSurvey } = require( '../controllers/deleteHandler');
const { changeSurveyStatus, changeSurveyQuestion } = require('../controllers/putHandler');


/** GET ROUTER */
router.get('/published', listPublishedSurvey);
router.get('/:name/detail', surveyDetail);
router.get('/:name/count', surveyResponseCount)


/** POST ROUTER */
router.post('/:name/response', respondToSurvey);
router.post('/:name/otherResponse', otherResponse);
router.post( '/:name/create', createNewSurvey )


/** DELETE ROUTER */
router.delete('/:name/delete', deleteUserResponse);
router.delete('/:name/deleteSurvey', deleteSurvey);

/** PUT ROUTER */
router.put('/:name/updateStatus', changeSurveyStatus);
router.put('/:name/updateQuestion', changeSurveyQuestion);


module.exports =  router;