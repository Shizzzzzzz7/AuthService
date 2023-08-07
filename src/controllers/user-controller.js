const UserService= require("../services/user-service");

const userService= new UserService();

const create= async (req, res)=>{
    try {
        const data={
            email: req.body.email,
            password: req.body.password
        };

        const response= await userService.create(data);
        return res.status(201).json({
            data: response,
            error:{},
            success: true,
            message: "Successfully Created User"
        });
    } catch (error) {
        console.log("Error in Controller Layer");
        return res.status(error.statusCode).json({
            data: {},
            error:error.explaination,
            success: false,
            message: error.message
        });
    }
}

const signIn= async (req,res)=>{
    try {
        const response= await userService.signIn(req.body.email, req.body.password);
        return res.status(200).json({
            data: response,
            error:{},
            success: true,
            message: "Successfully SignIn"
        });
    } catch (error) {
        console.log("Error in Controller Layer");
        return res.status(error.statusCode).json({
            data: {},
            error:error.explaination,
            success: false,
            message: error.message
        });
    }
}

const isAuthentic= async (req,res)=>{
    try {
        const token=req.headers['x-access-token'];
        const response= await userService.isAuthentic(token)
        return res.status(200).json({
            data: response,
            error:{},
            success: true,
            message: "User successfully Authenticated"
        });
    } catch (error) {
        console.log("Error in Controller Layer");
        return res.status(500).json({
            data: {},
            error:error,
            success: false,
            message: "Authentication Failed"
        });
    }
}

const isAdmin= async(req,res)=>{
    try {
        const response= await userService.isAdmin(req.body.id);
        return res.status(200).json({
            data: response,
            error:{},
            success: true,
            message: "Successfully fetched weather user has Admin Role or Not"
        });
    } catch (error) {
        console.log("Error in Controller Layer");
        return res.status(500).json({
            data: {},
            error:error,
            success: false,
            message: "User Doesn't have Admin Role"
        });
    }
}

module.exports={
    create,
    signIn,
    isAuthentic,
    isAdmin
}