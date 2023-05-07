const express = require("express");
const UserRouter = express.Router();
const app = express();


const UserController =require("../controller/UserController")
UserRouter.post("/register", UserController.register);
UserRouter.post("/login", UserController.loginUser);

module.exports = UserRouter;