const Survey = require( '../models/surveyModel' );
const Response = require( '../models/responseModel' );
const UserInfo = require( '../models/userIdModel' );
const { returnError } = require( './errorHandling' );

/** GET CONTROLLER */

exports.listPublishedSurvey = async ( req, res, next ) => {

    let searchBy;

    if ( 'firstname'in req.query && 'lastname' in req.query){

        //await Survey.find( { status: 'published', ownerInfo: { $ne : req.params.userID } } )

        searchBy = { firstName: req.query.firstname, lastName: req.query.lastname };

        const validateUser = await UserInfo.findOne( { ...searchBy } ).exec();

        if( validateUser == null )
            return returnError( 'Access denied: User not found', next );

        searchBy = { ownerInfo: validateUser };
    }
    else{
        searchBy = { date_close: { $gte: Date() } }
    }

    await Survey.find( { ...searchBy, status: 'published' } )
    .exec(
        function( error, survey_list ){
            if ( error ) return next( error );

            if ( survey_list.length == 0 )
                return returnError( 'No Survey found', next );

            res.json( { response: survey_list.map( surveyItem => surveyItem.surveyName ) } );
        }
    );
};

exports.surveyDetail = async ( req, res, next ) => {

    await Survey.findOne( { surveyName: req.params.name, status: 'published' } )
        .exec(
            function( error, survey ){
                if ( error ) return next( error );

                if ( survey == null )
                    return returnError( 'Survey not found' , next );

                res.json( { response: survey } );
            }
         );
};

exports.surveyResponseCount = async ( req, res, next ) => {

    await Survey.findOne( { surveyName: req.params.name, status: 'published' } )
        .exec(
            async function( error, survey ){
                if( error ) return next( error );

                if ( survey == null || Object.keys( survey ).length == 0 )
                    return returnError( 'Survey not found', next );

                await Response.find( { survey: survey } )
                    /*.populate( 'survey' ) //Dont have to populate*/
                    .exec(
                        function( error, response_list ){
                            if( error ) return next ( error );

                            res.json( { response: response_list.length } );
                        }
                    );
            }
    );
};


