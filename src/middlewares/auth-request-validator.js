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


module.exports={
    authRequestValidator
}