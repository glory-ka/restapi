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

    const servey = new Survey( {
        surveyName: res.body.name,
        ownerName: validateUser.name,
        date_open: res.body.date_open,
        date_close: res.body.date_close,
        status: res.body.status,
        question: {type: Map, of: String, require: true}
    } );

};


const otherResponse = (req, res) => {
    console.log("Not yet implemented");
};

export {
        respondToSurvey,
        otherResponse
};