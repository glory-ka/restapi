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
        surveyName: req.body.name,
        ownerName: validateUser.name,
        date_open: req.body.date_open,
        date_close: req.body.date_close,
        status: req.body.status,
        question: req.body.question
    } );

    servey.save( function( error ){
        if (error) return next( error );

        res.send( JSON.stringify( { status: "Servey Successfully Saved!" } ) );
    } );

};


const otherResponse = (req, res) => {
    console.log("Not yet implemented");
};

export {
        respondToSurvey,
        otherResponse
};