const mangoose = require('mongoose');

const Schema = mangoose.Schema;


const surveyFormatSchema = new Schema ({
    surveyName: {type: String, required: true},
    ownerInfo: {type: Schema.Types.ObjectId, required: true},
    date_open: {type: Date, require: true},
    date_close: {type: Date, require: true},
    status: {type: String, require: true, enum: ['published', 'unpublished']},
    question: {type: Map, of: String, require: true}
});


surveyFormatSchema
.virtual('changeStatus')
.set ( function() {
    status = "published";
});

surveyFormatSchema
.virtual('changeQuestion')
.set (function(newQuestion) {
    question.question = newQuestion;
});

surveyFormatSchema
.method ('isAnswerExist', function(answer) {
    return this.question.hasOwnProperty(answer);
});

export mangoose.model('surveyFormat', surveyFormatSchema);
