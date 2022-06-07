const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const responseSchema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: 'userId', required: true },
    response: { type: String, required: false },
    otherResponse: { type: String, required: false },
    survey: { type: Schema.Types.ObjectId, ref: 'surveyFormat', required: true }
});

responseSchema
    .virtual( 'name' )
    .get (
        function() {
            return `${this.user.name}`;
    } );

export mongoose.model('response', responseSchema);