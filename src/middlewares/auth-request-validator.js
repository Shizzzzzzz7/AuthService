const authRequestValidator=(req,res,next)=>{
    if(!req.body.email || !req.body.password){
        return res.status(400).json({
            data:{},
            success: false,
            message:"Email or Password doesn't sent to the request",
            err:{}
        });
    }

    next();
}

const isAdminValidator=(req,res,next)=>{
    if(!req.body.id){
        return res.status(400).json({
            data:{},
            success: false,
            message:"Please enter an user ID",
            err:{}
        });
    }

    next();
}

module.exports={
    authRequestValidator,
    isAdminValidator
}