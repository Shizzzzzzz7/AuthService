const {User}= require("../models/index");

class UserRepository{

    async create(data){
        try {
            const user= await User.create(data);
            return user;
        } catch (error) {

            console.log("Went Wrong in Repository Layer");
            throw {error};
            
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
                throw {error: "User Doesn't exist"};
            }

            return user;
        } catch (error) {
            console.log("Went Wrong in Repository Layer");
            throw {error};
        }
    }
}

module.exports= UserRepository;