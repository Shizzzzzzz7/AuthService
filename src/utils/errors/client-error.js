const AppError= require("./error-handler");
const { StatusCodes }= require("http-status-codes");

class ClientError extends AppError{
    constructor(
        errorName,
        errorMessages,
        errorExplaination,
        statusCode
        ){
        super(
            errorName,
            errorMessages,
            errorExplaination,
            statusCode
        );
    }
}

module.exports= ClientError;