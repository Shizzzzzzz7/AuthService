const express= require("express");
const bodyParser= require("body-parser");

const { PORT }= require("./config/serverConfig");

const apiRoutes= require("./routes/index");

const { User, Role}= require("./models/index");

const app= express();

const prepareAndStart = ()=>{

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended:true}));

    app.use("/api",apiRoutes);

    app.listen(PORT,()=>{

        console.log(`Server Started at Port: ${PORT}`);
        // const u= await User.findByPk(4);
        // const r= await Role.findByPk(1);

        // console.log(await u.hasRole(r));

    });
}

prepareAndStart();