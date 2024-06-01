const { verifyToken } = require("../utils/jwt");
const Unauthenticated = require("../errors/unauthenticated");
function authenticateUser(req, res, next) {
  try {
    const authHeader = req.headers["authorization"];
    
    const token = authHeader && authHeader.split(" ")[1];

    if (verifyToken(token) != null) {
      console.log("{{JWT}}",token);
      console.log("verifyToken true", verifyToken);
      req.user = verifyToken(token);
      next();
    } else {
      console.log("verifyToken else", verifyToken(token));
      throw new Unauthenticated("You are not authenticated");
      
    }
  } catch (error) {
    console.error(error.message);
    return  res.status(error.statusCode).json({ message: error.message });
  }
}

module.exports = authenticateUser;
