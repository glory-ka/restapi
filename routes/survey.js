const express = require('express');
const router = express.Router();

const { listPublishedSurvey, listAllOpenSurvey, surveyDetail, surveyResponseCount } = require('../controllers/getHandler');
const { respondToSurvey, otherResponse, createNewSurvey } = require( '../controllers/postHandler');
const { deleteUserResponse, deleteSurvey } = require( '../controllers/deleteHandler');
const { changeSurveyStatus, changeSurveyQuestion } = require('../controllers/putHandler');


/** GET ROUTER */
router.get('/:userID/published', listPublishedSurvey);
router.get('/published', listAllOpenSurvey)
router.get('/:name/detail', surveyDetail);
router.get('/:name/count', surveyResponseCount)


/** POST ROUTER */
router.post('/:userID/response', respondToSurvey);
router.post('/:userID/otherResponse', otherResponse);
router.post( '/:userID/create', createNewSurvey )
router.post('/detail', ( res, req, next ) => { res.json( { works: 'yup' } )});

/** DELETE ROUTER */
router.delete('/:ownerID/delete', deleteUserResponse);
router.delete('/:ownerID/deleteSurvey', deleteSurvey);

/** PUT ROUTER */
router.put('/:ownerID/updateStatus', changeSurveyStatus);
router.put('/:ownerID/updateQuestion', changeSurveyQuestion);


module.exports =  router;