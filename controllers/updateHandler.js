const Survey = require( '../models/surveyModel' );


/** UPDATE ROUTE */

const changeSurveyStatus = ( req, res, next ) => {

    Survey.find( { surveyName: req.name } )
        .exec(
            function( error, survey ){
                if ( error ) return next( error );

                survery.changeStatus = req.body.status;
        } );
};

const changeSurveyQuestion = ( req, res, next ) => {

    Survey.find( { surveyName: req.name } )
    .exec(
        function( error, survey ){
            if ( error ) return next( error );

            if ( survey.status === "unpublished" )
                

            survey.changeQuestion = req.body.question;
    } );
};

export {
        changeSurveyStatus,
        changeSurveyQuestion
};