const { User } = require("../models");
const { compareSync } = require("../helpers/bcrypt");
const { encode } = require("../helpers/jwt");

class UserController {
  static async register(req, res, next) {
    const { email, password } = req.body;

    try {
      const newUser = await User.create({ email, password });

      return res.status(201).json({
        id: newUser.id,
        email: newUser.email,
      });
    } catch (err) {
      next(err);
    }
  }

  static async login(req, res, next) {
    const { email, password } = req.body;

    const errorMessage = {
      name: "ValidationError",
      statusCode: 400,
      message: "Invalid Email or Password",
    };

    try {
      const user = await User.findOne({ where: { email } });

      if (!user) {
        throw errorMessage;
      } else if (!compareSync(password, user.password)) {
        throw errorMessage;
      } else {
        const access_token = encode({
          id: user.id,
          email: user.email,
        });
        return res.status(200).json({ access_token });
      }
    } catch (err) {
      next(err);
    }
  }
}

module.exports = UserController;
