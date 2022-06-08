const mongoose = require( 'mongoose' );

const Schema = mongoose.Schema;

const userIdSchema = new Schema( {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    userUUID: { type: String, required: true , unique: true}
} );


userIdSchema
    .virtual( 'name' )
    .get( function () {
        return `${this.firstName} ${this.lastName}`;
    } );

userIdSchema
    .virtual( 'getUUID' )
    .set ( function() {
        return this.userUUID;
    } );

userIdSchema
    .virtual( 'setUUID' )
    .set( function( uuid ) {
        this.userUUID = uuid;
    } );

userIdSchema
    .method( 'isUserUuid' , function ( uuid ) {
        return this.userUUID === uuid
    } );


module.exports  = mongoose( 'userId', userIdSchema );