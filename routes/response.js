const express = require('express');
const router = express.Router();

const { 
    surveyResponseCount, 
    respondToSurvey, 
    otherResponse,
    deleteUserResponse  
} = require( "../controllers/response" )


/** GET ROUTER */
router.get('/:name/count', surveyResponseCount)


/** POST ROUTER */
router.post('/:name/:userId', respondToSurvey);
router.post('/:name/:userId/otherResponse', otherResponse);


/** DELETE ROUTER */
router.delete('/:name/:ownerId/response', deleteUserResponse);


module.exports =  router;