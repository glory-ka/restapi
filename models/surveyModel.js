const mangoose = require('mongoose');

const Schema = mangoose.Schema;


const surveyFormatSchema = new Schema ({
    surveyName: {type: String, required: true},
    ownerName: {type: String, required: true},
    date_open: {type: Date, require: true},
    date_close: {type: Date, require: true},
    status: {type: Boolean, require: true},
    question: {type: Map, of: String, require: true}
});


surveyFormatSchema
.virtual('survey')
.get (function() => {
    return {
        surveyName: this.surveyName,
        ownerName: this.ownerName,
        date_open: this.date_open,
        date_close: this.date_close,
        status: this.status,
        question: this.question
    };
});

surveyFormatSchema
.virtual('surveyName')
.get (function() => {
    return this.surveyName;
});


