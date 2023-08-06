const express= require("express");

const UserController= require("../../controllers/user-controller");
const { AuthRequestValidator }= require("../../middlewares/index");

const router= express.Router();

router.post(
    "/signup",
    AuthRequestValidator.authRequestValidator, 
    UserController.create
);

router.post(
    "/signIn", 
    AuthRequestValidator.authRequestValidator,
    UserController.signIn
);

router.get(
    '/isAuthentic',
    UserController.isAuthentic
);

router.post(
    "/isAdmin",
    AuthRequestValidator.isAdminValidator, 
    UserController.isAdmin
);

module.exports= router;