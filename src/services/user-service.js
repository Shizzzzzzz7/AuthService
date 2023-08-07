const UserRepository= require("../repository/user-repository");
const jwt= require("jsonwebtoken");
const bcrypt= require("bcrypt");
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
            throw error;
        }
    }

    async signIn(email, plainPassword){
        try {
            const user= await this.userRepository.getByEmail(email);

            const isPassword=await this.checkPassword(plainPassword, user.password);

            if(!isPassword){
                throw {error: "Password Doesn,t match"};
            }

            const token= this.createToken({email:user.email, id:user.id});
            return token;

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

    async checkPassword(plainPassword, encryptedPassword){
        try {
            const result=await bcrypt.compare(plainPassword, encryptedPassword);
            return result;
        } catch (error) {
            console.log("Problem in Service Layer[checkPassword]");
            throw {error};
        }
    }

    async isAuthentic(token){
        try {
            const response= this.verifyToken(token);
            if(!response){
                throw {error: "User Token is Invalid"};
            }
            const user=await this.userRepository.getById(response.id);
            if(!user){
                throw {error: "User doesn't exist anymore"};
            }
            return user.id;
        } catch (error) {
            console.log("Problem in Service Layer[isAuthentic]");
            throw {error};
        }
    }

    async isAdmin(userId){
        try {
            const result= await this.userRepository.isAdmin(userId);
            return result;
        } catch (error) {
            console.log("Problem in Service Layer");
            throw {error};
        }
    }
}

module.exports= UserService;