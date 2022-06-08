
exports.returnError = ( message, next, errorCode=404 ) => {
    const err = new Error( message );
    err.status = errorCode;
    return next( err );
}
