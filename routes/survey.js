const express = require('express');
const router = express.Router();

const { listPublishedSurvey, listAllOpenSurvey, surveyDetail, surveyResponseCount } = require('../controllers/getHandler');
const { respondToSurvey, otherResponse } = require( '../controllers/postHandler');
const { deleteUserResponse, deleteSurvey } = require( '../controllers/putHandler');
const { changeSurveyStatus, changeSurveyQuestion } = require('../controllers/updateHandler');


/** GET ROUTER */
router.get('/:userID/published', listPublishedSurvey);
router.get('/published', listAllOpenSurvey)
router.get('/:name/detail', surveyDetail);
router.get('/:name/count', surveyResponseCount)


/** POST ROUTER */
router.post('/:name/:userID/response', respondToSurvey);
router.post('/:name/:userID/otherResponse', otherResponse);


/** PUT ROUTER */
router.put('/:name/:ownerID/:userName/delete', deleteUserResponse);
router.put('/:name/:ownerID/deleteSurvey', deleteSurvey);

/** UPDATE ROUTER */
router.update('/:name/:ownerID/updateStatus', changeSurveyStatus);
router.update('/:name/:ownerID/updateQuestion', changeSurveyQuestion);


export router;