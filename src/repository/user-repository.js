const {User,Role}= require("../models/index");
const { StatusCodes }= require("http-status-codes");
const ValidationError= require("../utils/errors/validation-error");
const ClientError= require("../utils/errors/client-error");

class UserRepository{

    async create(data){
        try {
            const user= await User.create(data);
            return user;
        } catch (error) {
            if(error.name==="SequelizeValidationError"){
                const validationError= new ValidationError(error);
                throw validationError;
            }
            console.log("Went Wrong in Repository Layer");
            throw error;
            
        }
    }

    async getById(userId){
        try {
            
            const user= await User.findByPk(userId, {

                attributes: ["email","id"] 
            });
            return user;
        } catch (error) {
            console.log("Went Wrong in Repository Layer");
            throw {error};
        }
    }

    async getByEmail(email){
        try {
            const user= await User.findOne({
                where:{
                    email:email
                }
            });

            if(!user){
                let errorName= "AttributeNotFound";
                let errorMessages="Invalid Email Sent";
                let errorExplaination= "Please check the Email, as there is no record of Email";
                let statusCode= StatusCodes.NOT_FOUND;

                const clientError= new ClientError(
                    errorName,
                    errorMessages,
                    errorExplaination,
                    statusCode
                );

                throw clientError;
            }

            return user;
        } catch (error) {
            if(error.name === "AttributeNotFound"){
                throw error;
            }
            console.log("Went Wrong in Repository Layer");
            throw error;
        }
    }

    async isAdmin(userId){
        try {
            const user= await User.findByPk(userId);
            const adminRole= await Role.findOne({
                where:{
                    name:"ADMIN"
                }
            });

            const result= await user.hasRole(adminRole);
            return result;
        } catch (error) {
            
            // console.log("Went Wrong in Repository Layer");
            // throw {error};
        }
    }
}

module.exports= UserRepository;