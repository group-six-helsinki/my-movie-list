const jwt = require("jsonwebtoken");
const SECRET = 'hayyooo'

function generateToken(payload) {
  return jwt.sign(payload, SECRET);
}

module.exports = {
  generateToken,
};
