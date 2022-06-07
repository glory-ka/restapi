const Survey = require( '../models/surveyModel' );
const UserInfo = require( '../models/userIdModel' );


/** UPDATE ROUTE */

const changeSurveyStatus = ( req, res, next ) => {

    const ownerInfo = UserInfo.find( { userUUID: req.ownerID } )

    Survey.find( { surveyName: req.name, ownerInfo: ownerInfo } )
        .exec(
            function( error, survey ){
                if ( error ) return next( error );

                if ( survey == null ){
                    const err = new Error( 'Survey not found' );
                    err.status = 404;
                    return next( err );
                }

                survery.changeStatus = req.body.status;
        } );
};

const changeSurveyQuestion = ( req, res, next ) => {

    Survey.find( { surveyName: req.name } )
    .exec(
        function( error, survey ){
            if ( error ) return next( error );

            if ( survey.status === "unpublished" )
                return ( new Error( 'Survey already publish' ); )

            survey.changeQuestion = req.body.question;
    } );
};

export {
        changeSurveyStatus,
        changeSurveyQuestion
};