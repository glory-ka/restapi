const Survey = require( '../models/surveyModel' );
const Response = require( '../models/responseModel' );
const UserInfo = require( '../models/userIdModel' );


/** UPDATE ROUTE */

const changeSurveyStatus = ( req, res, next ) => {

    Survey.find( { surveyName:  } )
};

const changeSurveyQuestion = (req, res) => {
    console.log("Not yet implemented");
};

export {
        changeSurveyStatus,
        changeSurveyQuestion
};