const { sign } = require("jsonwebtoken");

const createToken = (user) => {
  const accessToken = sign(
    { username: user.username, password: user.password },
      process.env.TOKEN_TEXT,
    {
      // in seconds 600s = 10 min
      expiresIn: 600,
    }
  );

  return accessToken;
};

module.exports = { createToken };
