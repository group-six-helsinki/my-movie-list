const { User } = require("../models");
const { generateToken } = require("../helpers/jwt");
const { compare } = require("../helpers/bcrypt");
const { OAuth2Client } = require("google-auth-library");
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
            name: "LoginError",
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

  static loginGoogle(req, res, next) {
    const client = new OAuth2Client(process.env.GOOGLE_KEY);
    let email;
    client
      .verifyIdToken({
        idToken: req.body.googleToken,
        audience: process.env.GOOGLE_KEY,
      })
      .then((ticket) => {
        const paylod = ticket.getPayload();
        email = paylod.email;
        return User.findOne({ where: { email } });
      })
      .then((user) => {
        if (user) {
          const access_token = generateToken({
            id: user.id,
            email: user.email,
          });
          res.status(200).json({ access_token });
        } else {
          return User.create({
            email,
            password: process.env.PASSWORD_RANDOM,
          });
        }
      })
      .then((registered) => {
        const access_token = generateToken({
          id: registered.id,
          email: registered.email,
        });
        res.status(201).json({ access_token });
      })
      .catch((err) => {
        res.status(400).json(err);
      });
  }
}

module.exports = ControllerUser;
