const Survey = require( '../models/surveyModel' );
const Response = require( '../models/responseModel' );
const UserInfo = require( '../models/userIdModel' );

/** POST ROUTE */

const respondToSurvey = ( req, res, next ) => {
    const validateUser = await UserInfo.find( { userUUID: req.userID } )
                                .exec();
    const validdateSurvey = await Survey.find( { surveyName: req.name } )
                                .exec();

    if ( validateUser == null || validateSurvey == null )
        return;

    

};


const otherResponse = (req, res) => {
    console.log("Not yet implemented");
};

export {
        respondToSurvey,
        otherResponse
};