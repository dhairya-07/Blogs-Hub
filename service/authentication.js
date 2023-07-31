const jwt = require("jsonwebtoken");
const secret = "$uperman";

function createJwtToken(user) {
  const payload = {
    _id: user.id,
    email: user.email,
    role: user.role,
  };

  const token = jwt.sign(payload, secret);
  return token;
}

function validateToken(token) {
  const payload = jwt.verify(token, secret);
  return payload;
}

module.exports = { createJwtToken, validateToken };
