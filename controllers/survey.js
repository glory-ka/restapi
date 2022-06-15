const Survey = require( '../models/surveyModel' );
const UserInfo = require( '../models/userIdModel' );


// GET SURVEY LIST
exports.listPublishedSurvey = async ( req, res, next ) => {

    let searchBy;

    if ( 'firstname'in req.query && 'lastname' in req.query){

        //await Survey.find( { status: 'published', ownerInfo: { $ne : req.params.userID } } )

        searchBy = { firstName: req.query.firstname, lastName: req.query.lastname };

        const validateUser = await UserInfo.findOne( { ...searchBy } ).exec();

        if( validateUser == null )
            return res.status( 404 ).json( { response:  'Access denied: User not found' } );

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
                return res.status( 404 ).json( { response:  'No Survey found' } );

            res.json( { response: survey_list.map( surveyItem => surveyItem.surveyName ) } );
        }
    );
};


// GET SURVEY DETAIL
exports.surveyDetail = async ( req, res, next ) => {

    await Survey.findOne( { surveyName: req.params.name, status: 'published' } )
        .populate( 'ownerInfo' )
        .exec(
            function( error, survey ){
                if ( error ) return next( error );

                if ( survey == null )
                    return res.status( 404 ).json( { response:  'Survey not found' } );

                res.json( { response: survey.detail } );
            }
         );
};


// POST CREATE NEW SURVEY
exports.createNewSurvey = async ( req, res, next ) => {

    const validateUser = await UserInfo.findOne( { userUUID: req.params.userId } ).exec();

    if ( validateUser == null )
        return res.status( 404 ).json( { response: "Incorrect user id or survey name" } );

    const newSurvey = new Survey( {

        surveyName: req.params.name,
        ownerInfo: validateUser,
        date_open: new Date(req.body.date_open),
        date_close: new Date(req.body.date_close),
        status: req.body.status,
        question: req.body.question

    } );

    newSurvey.save( ( error ) => {

        if( error ) return next( error );

        res.json( { response: "Survey was sucessfully added" } );
    } );
};

// PUT NEW SURVEY STATUS
exports.changeSurveyStatus = async ( req, res, next ) => {

    const ownerInfo = await UserInfo.findOne( { userUUID: req.params.ownerId } ).exec();

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


// PUT NEW SURVEY QUESTION
exports.changeSurveyQuestion = async ( req, res, next ) => {

    // Returns an array of match
    const ownerInfo = await UserInfo.findOne( { userUUID: req.params.ownerId } ).exec();

    if ( ownerInfo == null )
        return res.status( 404 ).json( { response: 'User not found' } );

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


// DELETE SURVEY
exports.deleteSurvey = async ( req, res, next ) => {

    const validateOwner = await UserInfo.findOne( { userUUID: req.params.ownerId } )
        .exec();

    if ( validateOwner == null )
       return res.status( 404 ).json( { response: 'Incorrect user id' } );

    await Survey.findOneAndDelete( { surveyName: req.params.name, ownerInfo: validateOwner } )
       /* .populate( 'ownerInfo' )*/
        .exec(
            function( error, result ) {
                if ( error ) return next( error );

                if ( result == null )
                    return res.status( 404 ).json( { response: "Survey not found" } );

                res.json( { status: "Survey successfully deleted", deleted: result } );
            }
        );
};