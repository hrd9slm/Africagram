const { verifyToken } = require('../utils/jwt');

function authenticateUser(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader 

  if (token == null) return res.sendStatus(401); 
    verifyToken(token);
    req.user = user;
    next(); 
 
}
module.exports = authenticateUser;