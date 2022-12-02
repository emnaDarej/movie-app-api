var express = require("express");
var router = express.Router();
const clientController = require("../../controllers/clientController");
const middleware = require("../../middlewares/middleware");
//user route

// register http://localhost:5000user/register
router.post("/register", middleware.validator, clientController.addClient);

// login http://localhost:5000/user/login
router.post("/login", clientController.login);

// register http://localhost:5000/user/logout
router.get("/logout", clientController.logout);

//the login and the logout part and checkAuth works only on the browser
router.get("/checkAuth", middleware.checkToken);
//get All user
router.get("/", clientController.getAllClient);

module.exports = router;
