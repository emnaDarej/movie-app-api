var express = require("express");
var router = express.Router();
const UserControllers = require("../../controllers/UserController");
const middleware = require("../../middlewares/middleware");
//user route

// register http://localhost:5000user/register
router.post("/register", middleware.validator, UserControllers.addUser);

// login http://localhost:5000/user/login
router.post("/login", UserControllers.login);

// register http://localhost:5000/user/logout
router.get("/logout", UserControllers.logout);

//the login and the logout part and checkAuth works only on the browser
router.get("/checkAuth", middleware.checkToken);
//get All user
router.get("/", UserControllers.getAllUsers);

module.exports = router;
