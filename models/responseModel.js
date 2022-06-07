const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const responseSChema = new Schema({
    name: {type: String, required: true},
    response: {type: String, required: true},
    survey: {type: Schema.Types.ObjectId, ref: 'surveryFormat', required: true}
});

