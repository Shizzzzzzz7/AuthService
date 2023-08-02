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
        return res.status(500).json({
            data: {},
            error:error,
            success: false,
            message: "Unable to Create User"
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
        return res.status(500).json({
            data: {},
            error:error,
            success: false,
            message: "Unable to SignIn"
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

module.exports={
    create,
    signIn,
    isAuthentic
}