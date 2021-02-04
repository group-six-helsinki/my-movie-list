const { User } = require("../models");
class ControllerUser {
  static register(req, res, next) {
    const { email, password } = req.body;
    User.create({ email, password })
      .then((user) => {
        console.log(user);
        res.status(201).json({
          id: user.id,
          email: user.email,
          message: "Sukses create account",
        });
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  }

  static login(req, res, next) {}

  static loginGoogle(req, res, next) {}
}

module.exports = ControllerUser;
