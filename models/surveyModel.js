const mangoose = require('mongoose');

const Schema = mangoose.Schema;


const surveyFormat = new Schema ({
    surveyName: {type: String, required: true},
    ownerName: {type: String, required: true},
    date_open: {type: Date, require: true},
    date_close: {type: Date, require: true},
    status: {type: Boolean, require: true},
    question: {type: Map, of: String, require: true}
});

