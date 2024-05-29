const jwt = require("jsonwebtoken");

function generateToken(user) {
  const payload = {
    id: user.id,
    email: user.email,
  };

  const secret = process.env.JWT_SECRET;
  const options = { expiresIn: "1h" };

  return jwt.sign(payload, secret, options);
}

function verifyToken(token) {
  try {
    return jwt.verify(token, process.env.JWT_SECRET);
  } catch (err) {
    console.error(err);
    return null;
  }
}

module.exports = { generateToken, verifyToken };
