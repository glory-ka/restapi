const mangoose = require('mongoose');

const Schema = mangoose.Schema;


const surveyFormatSchema = new Schema ({
    surveyName: {type: String, required: true, unique: true},
    ownerInfo: {type: Schema.Types.ObjectId, ref: 'userId', required: true},
    date_open: {type: Date, require: true},
    date_close: {type: Date, require: true},
    status: {type: String, require: true, enum: ['published', 'unpublished']},
    question: {type: Map, of: String, require: true}
});


surveyFormatSchema
    .virtual( 'changeStatus' )
    .set ( function() {
        this.status = "published";
});

surveyFormatSchema
    .virtual( 'changeQuestion' )
    .set ( function( newQuestion ) {
        question.question = newQuestion;
});

surveyFormatSchema
    .method ('doesAnswerExist', function( answer ) {
        return this.question.has( answer );
});

surveyFormatSchema
    .virtual( 'detail' )
    .get(
        function(){
          return {
              owner: this.ownerInfo.name,
              date_open: this.date_open,
              date_close: this.date_close,
              status: this.status,
              question: this.question
            }
     } );

module.exports =  mangoose.model('surveyFormat', surveyFormatSchema);
