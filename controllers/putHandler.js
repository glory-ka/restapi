const Survey = require( '../models/surveyModel' );
const UserInfo = require( '../models/userIdModel' );
const { returnError } = require( './errorHandling' );

/** UPDATE ROUTE */

exports.changeSurveyStatus = async ( req, res, next ) => {

    const ownerInfo = await UserInfo.findOne( { userUUID: req.body.ownerId } ).exec();

    if ( ownerInfo == null )
        return res.status( 404 ).json( { response: 'User not found' } );

    await Survey.findOneAndUpdate( { surveyName: req.params.name, ownerInfo: ownerInfo }, { status: req.body.status } )
        .exec(
            function( error, survey ){
                if ( error ) return next( error );

                if ( survey == null )
                    return res.status( 404 ).json( { response: 'Survey Not found' } );

                else
                    res.json( { response: 'Survey Status Sucessfully Changed', surveyAffected: survey } );
            }
        );
};

exports.changeSurveyQuestion = async ( req, res, next ) => {

    // Returns an array of match
    const ownerInfo = await UserInfo.findOne( { userUUID: req.body.ownerId } ).exec();

    if ( ownerInfo == null )
        res.status( 404 ).json( { response: 'User not found' } );

    await Survey.findOne( { surveyName: req.params.name, ownerInfo: ownerInfo } )
        .exec(
            async function( error, survey ){

                if ( error ) return next( error );

                if ( survey == null )
                    return res.status( 404 ).json( { response: 'Survey Not found' } );

                if ( survey.status === "published" ) // res.json() alone doesn't stop the function execution
                    return res.json( { response: 'You can not change a published survey' } ); //CHECK REQUIREMENT

                // This is a Map
                const question = survey.question;
                question.set('question', req.body.question)

                await Survey.updateOne( { surveyName: req.params.name }, { question: question } )
                    .exec( ( error, resp ) => {

                        if( error ) return next( error );

                        res.json( { response: 'Survey Question Sucessfully Changed', question /* question:question */, status: resp } );
                });

        } );
};
