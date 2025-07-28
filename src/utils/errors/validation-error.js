const { StatusCodes } = require("http-status-codes");

class ValidationError extends Error {
    constructor(error, statusCode = StatusCodes.BAD_REQUEST, message = "Not able to validate data sent in request") {
        super(message);
        this.name = "ValidationError";

        this.explanation = [];

        if (error && Array.isArray(error.errors)) {
            error.errors.forEach((err) => {
                if (err.message) {
                    this.explanation.push(err.message);
                }
            });
        } else if (error && error.message) {
            this.explanation.push(error.message);
        }

        this.statusCode = statusCode;
        Error.captureStackTrace(this, this.constructor);
    }
}

module.exports = ValidationError;
