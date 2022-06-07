const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const responseSchema = new Schema({
    name: {type: String, required: true},
    response: {type: String, required: true},
    survey: {type: Schema.Types.ObjectId, ref: 'surveyFormat', required: true}
});


export mongoose.model('response', responseSchema);