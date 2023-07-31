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
        return res.status(201).json({
            data: {},
            error:error,
            success: false,
            message: "Unable to Create User"
        });
    }
}

module.exports={
    create
}