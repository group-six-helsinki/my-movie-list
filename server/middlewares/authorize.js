const { User } = require("../models");

const authorize = function (req, res, next) {
  const userId = req.decoded.id;
  User.findByPk(userId)
    .then((user) => {
      if (!user) {
        throw { message: "Data not found", status: 404, name: "Custom" };
      }
      if (user) {
        next();
      } else {
        throw { message: "Not authorized", status: 400, name: "Custom" };
      }
    })
    .catch((err) => {
      next(err);
    });
};
module.exports = authorize;
