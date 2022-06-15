const express = require('express');
const router = express.Router();

const { 
    surveyResponseCount, 
    respondToSurvey, 
    otherResponse,
    deleteUserResponse  
} = require( "../controllers/responseController" )


/** GET ROUTER */
router.get('/:name/count', surveyResponseCount)


/** POST ROUTER */
router.post('/:name/:userId', respondToSurvey);
router.post('/:name/:userId/otherResponse', otherResponse);


/** DELETE ROUTER */
router.delete('/:name/:ownerId/delete', deleteUserResponse);


module.exports =  router;