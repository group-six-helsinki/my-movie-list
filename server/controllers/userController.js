const { User } = require("../models");
const { generateToken } = require("../helpers/jwt");
const { compare } = require("../helpers/bcrypt");
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

  static login(req, res, next) {
    const { email, password } = req.body;
    User.findOne({ where: { email } })
      .then((user) => {
        const compared = compare(password, user.password);
        if (!user || !compared) {
          throw {
            message: "Wrong password or email",
            status: 401,
            name: "login error",
          };
        }
        const access_token = generateToken({
          id: user.id,
          email: user.email,
        });
        res.status(200).json({
          access_token,
        });
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  }

  static loginGoogle(req, res, next) {}
}

module.exports = ControllerUser;
