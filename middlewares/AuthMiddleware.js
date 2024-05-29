const { verifyToken } = require('../utils/jwt');

function authenticateUser(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader   && authHeader.split(' ')[1];

   if (verifyToken(token)!=null) {
     console.log("verifyToken true",verifyToken);
     res.send("You are authenticated");
     next(); 
     
   } else {
     res.status(401).send("You are not authenticated");
     console.log("verifyToken else",verifyToken(token));
  }
    next(); 
 
}
module.exports = authenticateUser;