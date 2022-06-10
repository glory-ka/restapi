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

responseSchema
    .virtual( 'changeResponse' )
    .set(
        function( value ){
            if( this.response )
                this.response = value;
            else
                this.otherResponse = value;
        } );

responseSchema
    .virtual( 'detail' )
    .get(
        function(){
            return {
                owner: this.user.name,
                this.date_open,
                this.date_close,
                this.status,
                this.question
            }
     } );

module.exports = mongoose.model('response', responseSchema);