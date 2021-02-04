const bcrypt = require("bcryptjs");

function hash(pass) {
  const salt = bcrypt.genSaltSync(10);
  return bcrypt.hashSync(pass, salt);
}

function compare(pass, passDb) {
  return bcrypt.compareSync(pass, passDb);
}

module.exports = {
  hash,
  compare,
};
