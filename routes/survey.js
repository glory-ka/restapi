const express = require('express');
const router = express.Router();

const { listPublishedSurvey, listAllOpenSurvey, surveyDetail, surveyResponseCount } = require('../controllers/getHandler');
const { respondToSurvey, otherResponse } = require( '../controllers/postHandler');
const { deleteUserResponse, deleteSurvey } = require( '../controllers/putHandler');
const { changeQuestionStatus, changeSurveyQuestion } = require('../controllers/updateHandler');


/** GET ROUTER */
router.get('orangutan/survey/:userID/published', listPublishedSurvey);
router.get('orangutan/survey/published', listAllOpenSurvey)
router.get('orangutan/survey/:name/detail', surveyDetail);
router.get('oranguton/survey/:name/count', surveyResponseCount)


/** POST ROUTER */
router.post('orangutan/survey/:name/:userID/response', respondToSurvey);
router.post('orangutan/survey/:name/:userID/otherResponse', otherResponse);


/** PUT ROUTER */
router.put('orangutan/survey/:name/:userID/delete', deleteUserResponse);
router.put('orangutan/survey/:name/:userID/deleteSurvey', deleteSurvey);











