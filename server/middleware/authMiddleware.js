const jwt = require("jsonwebtoken");

const requireAuth = (req, res, next) => {
  const token = req.cookies.jwt;

  // check json web token exists and is verified
  if (token) {
    jwt.verify(token, "mediconnect sneaky secret", (err, decodedToken) => {
      if (err) {
        console.log(err.message);
        res.status(400).send("Token not valid");
      } else {
        console.log(decodedToken);
        next();
      }
    });
  } else {
    res.status(400).send("Token not valid");
  }
};

module.exports = { requireAuth };
