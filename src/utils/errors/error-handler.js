const { StatusCodes } = require("http-status-codes");

class AppError extends Error{
    constructor(
        name= "App Error",
        message= "Something Wrong Occured",
        explaination= "Something Wrong Occured",
        statusCode= StatusCodes.INTERNAL_SERVER_ERROR
    ){
        super();
        this.name=name,
        this.message=message,
        this.explaination=explaination,
        this.statusCode=statusCode
    }
}

module.exports= AppError;