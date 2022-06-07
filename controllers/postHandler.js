const Survery = require( '../models/surveyModel' );
const Response = require( '../models/responseModel' );
const UserInfo = require( '../models/userIdModel' );

/** POST ROUTE */

const respondToSurvey = ( req, res, next ) => {
    UserInfo.find( { userUUID: req.userID } )
        .orFail()
        .exec( {
            function ( error, userInfo) {};
        } );
};


const otherResponse = (req, res) => {
    console.log("Not yet implemented");
};

export {
        respondToSurvey,
        otherResponse
};