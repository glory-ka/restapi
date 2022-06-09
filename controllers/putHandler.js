const Survey = require( '../models/surveyModel' );
const UserInfo = require( '../models/userIdModel' );
const { returnError } = require( './errorHandling' );

/** UPDATE ROUTE */

exports.changeSurveyStatus = async ( req, res, next ) => {
    
    const ownerInfo = await UserInfo.find( { userUUID: req.params.ownerID } ).exec();

    if ( ownerInfo == null || !ownerInfo)
        returnError( 'User not found', next )
        
    await Survey.find( { surveyName: req.body.name, ownerInfo: ownerInfo } )
        .exec(
            async function( error, survey ){
                if ( error ) return next( error );
                
                if ( survey == null || !survey )
                    returnError( 'Survey not found', next );

                await Survey.updateOne( { surveyName: req.body.name } , { status: req.body.status } )
                    .exec( function( error ){
                        if ( error ) return next( error );

                        res.json( {response: 'Survey Status Sucessfully Changed' } );

                    } );
            }                 
        );
};

exports.changeSurveyQuestion = async ( req, res, next ) => {

    // Returns an array of match
    const ownerInfo = await UserInfo.find( { userUUID: req.params.ownerID } ).exec();

    if ( ownerInfo == null )
        returnError( 'User not found', next );

    await Survey.findOne( { surveyName: req.body.name, ownerInfo: ownerInfo[0] } )
        .exec(
            async function( error, survey ){
                
                if ( error ) return next( error );

                if ( survey == null || !survey )
                   returnError( 'Survey not found', next );

                if ( survey.status === "unpublished" )
                    returnError( 'Survey already publish', next );

                // This is a Map    
                const question = survey.question;
                question.set('question', req.body.question)

                await Survey.updateOne( { surveyName: req.body.name }, { question: question } ).exec( ( error ) => {

                    if( error ) return next( error );

                    res.json( { response: 'Servey Question Sucessfully Changed' } );
                });

        } );
};
