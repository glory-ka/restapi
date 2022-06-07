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
        surveyName: res.,
        ownerName: {type: String, required: true},
        date_open: {type: Date, require: true},
        date_close: {type: Date, require: true},
        status: {type: String, require: true, enum: ['published', 'unpublished']},
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