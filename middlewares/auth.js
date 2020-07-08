const jwt = require("jsonwebtoken");
const { User, Book } = require("../models");

// 1. cek bawa access token atau tidak
//
const authentication = async (req, res, next) => {
  const access_token = req.headers.access_token;
  try {
    if (!access_token) {
      throw {
        name: "ValidationError",
        statusCode: 401,
        message: "Token not found",
      };
    } else {
      console.log(process.env.SECRET);
      const userData = jwt.verify(access_token, process.env.SECRET);

      req.userData = userData; // disimpan ke request untuk proses setelahnya.
      // userData => {id, email}
      console.log(userData, "<<< User Data");

      const user = await User.findOne({ where: { email: userData.email } });

      if (user) {
        next();
      } else {
        throw {
          name: "ValidationError",
          statusCode: 401,
          message: "Please Login",
        };
      }
    }
  } catch (err) {
    console.log("masuk kesini ? <<<<<<<<<<", err);
    next(err);
  }
};

// cek apakah buku benar2 milik user yang sudah login?
// findOne book dan samakan userIdnya
// disini sudah dapat akses req.userData
const authorization = async (req, res, next) => {
  console.log("masuk ga ??");
  try {
    const idBook = req.params.id;
    const book = await Book.findOne({ where: { id: idBook } });

    if (book) {
      if (book.UserId === req.userData.id) {
        next();
      } else {
        throw {
          name: "ValidationError",
          statusCode: 403,
          message: "Forbidden Access",
        };
      }
    } else {
      throw {
        name: "ValidationError",
        statusCode: 404,
        message: "book not found",
      };
    }
  } catch (err) {
    next(err);
  }
};

module.exports = { authentication, authorization };
