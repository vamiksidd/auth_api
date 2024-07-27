const {
    VALIDATION_ERROR,
    UNAUTHORISED,
    FORBIDDEN,
    NOT_FOUND,
    SERVER_ERROR
} = require('../constants');

const errorHandler = (err, req, res, next) => {
    const statusCode = res.statusCode ? res.statusCode : 500;
    switch (statusCode) {
        case VALIDATION_ERROR:
            res.json({
                title: "Validation error",
                message: err.message,
                stackTrace: err.stack
            })
            break;
        case NOT_FOUND:
            res.json({
                title: "Not found",
                message: err.message,
                stackTrace: err.stack
            })
            break;
        case UNAUTHORISED:
            res.json({
                title: "Unauthorised",
                message: err.message,
                stackTrace: err.stack
            })
            break;
        case FORBIDDEN:
            res.json({
                title: "Forbidden",
                message: err.message,
                stackTrace: err.stack
            })
            break;
        case SERVER_ERROR:
            res.json({
                title: "Server error",
                message: err.message,
                stackTrace: err.stack
            })
            break;

        default:
            console.log("Some Unknow error occured");
            break;
    }
}

module.exports = errorHandler;