const { verify } = require("jsonwebtoken");

const { User } = require("../models/user");
const middleware = {};
middleware.validator = async (req, res, next) => {
  //check User
  const userCheck = await User.findOne({ username: req.body.username });
  if (userCheck) {
    return res.status(400).send("This name is already been used");
  }
  //check email
  const email = req.body.email;
  var regEx = /\S+@\S+\.\S+/;
  if (!regEx.test(email)) {
    return res.status(400).json({ message: "Invalid email address" });
  }
  //check password
  const pass = req.body.password;
  const passConf = req.body.password;

  if (pass !== passConf) {
    return res.status(400).json({ message: "false Password!, Try Again" });
  }
  next();
};
//check authentication

middleware.checkToken = async (req, res, next) => {
  // Take Bearer out
  const accessToken = req.headers.authorization.split(" ")[0] || "";
  console.log("token", accessToken);
  if (accessToken == "null") {
    return res.json({ auth: false, message: "User NOT Authenticated!" });
  }
  try {
    const validToken = await verify(accessToken, process.env.TOKEN_TEXT);
    if (!validToken) {
      return res
        .status(404)
        .json({ auth: false, message: "You need to login!" });
    }
  } catch (err) {
    res.status(400).json({ auth: false, message: err.message });
  }
  next();
};
module.exports = middleware;
