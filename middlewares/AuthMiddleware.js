const { verifyToken } = require("../utils/jwt");

function authenticateUser(req, res, next) {
  const authHeader = req.headers["authorization"];
  if (!authHeader) {
    return res.status(401).send("Authorization header missing");
  }
  const token = authHeader && authHeader.split(" ")[1];

  if (verifyToken(token) != null) {
    console.log("verifyToken true", verifyToken);
    req.user = verifyToken(token);
    next();
  } else {
    res.status(401).send("You are not authenticated");
    console.log("verifyToken else", verifyToken(token));
  }
}
module.exports = authenticateUser;
