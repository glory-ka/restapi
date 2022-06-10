const Survey = require( '../models/surveyModel' );
const UserInfo = require( '../models/userIdModel' );
const { returnError } = require( './errorHandling' );

/** UPDATE ROUTE */

exports.changeSurveyStatus = async ( req, res, next ) => {

    const ownerInfo = await UserInfo.findOne( { userUUID: req.body.ownerId } ).exec();

    if ( ownerInfo == null )
        return returnError( 'User not found', next )

    await Survey.findOneAndUpdate( { surveyName: req.params.name, ownerInfo: ownerInfo }, { status: req.body.status } )
        .exec(
            async function( error, survey ){
                if ( error ) return next( error );

                if ( survey == null )
                    return returnError( 'Survey Not found', next );

                else
                    res.json( { response: 'Survey Status Sucessfully Changed', surveyAffected: survey } );
            }
        );
};

exports.changeSurveyQuestion = async ( req, res, next ) => {

    // Returns an array of match
    const ownerInfo = await UserInfo.findOne( { userUUID: req.body.ownerId } ).exec();

    if ( ownerInfo == null )
        returnError( 'User not found', next );

    await Survey.findOne( { surveyName: req.params.name, ownerInfo: ownerInfo } )
        .exec(
            async function( error, survey ){

                if ( error ) return next( error );

                if ( survey == null )
                    returnError( 'Survey Not found', next );

                if ( survey.status === "published" )
                    res.json( { response: 'Survey is already published' } ); //CHECK REQUIREMENT

                // This is a Map
                const question = survey.question;
                question.set('question', req.body.question)

                await Survey.updateOne( { surveyName: req.body.name }, { question: question } )
                    .exec( ( error ) => {

                        if( error ) return next( error );

                        res.json( { response: 'Servey Question Sucessfully Changed' } );
                });

        } );
};
