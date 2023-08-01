const UserRepository= require("../repository/user-repository");
const jwt= require("jsonwebtoken");
const { JWT_KEY }= require("../config/serverConfig");

class UserService{
    constructor(){
        this.userRepository= new UserRepository();
    }

    async create(data){
        try {
            const user= await this.userRepository.create(data);
            return user;
        } catch (error) {
            console.log("Problem in Service Layer");
            throw {error};
        }
    }

    createToken(user){
        try {
            const token=jwt.sign(user, JWT_KEY, {expiresIn: '1d'});
            return token;
        } catch (error) {
            console.log("Problem in JWT Creation");
            throw {error};
        }
    }

    verifyToken(token){
        try {
            const result= jwt.verify(token, JWT_KEY);
            return result;
        } catch (error) {
            console.log("Problem in JWT Verification", error);
            throw {error};
        }
    }
}

module.exports= UserService;