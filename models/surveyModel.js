const mangoose = require('mongoose');

const Schema = mangoose.Schema;


const surveyFormatSchema = new Schema ({
    surveyName: {type: String, required: true},
    ownerName: {type: String, required: true},
    date_open: {type: Date, require: true},
    date_close: {type: Date, require: true},
    status: {type: String, require: true},
    question: {type: Map, of: String, require: true}
});


surveyFormatSchema
.virtual('changeStatus')
.set (function() => {
    status = "published";
});

surveyFormatSchema
.virtual('changeQuestion')
.set (function(newQuestion) => {
    question.question = newQuestion;
});

surveyFormatSchema
.method. (function() => {
    return this.question.hasOwnProperty();
});

