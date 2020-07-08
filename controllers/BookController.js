const { Book } = require("../models");

class BookController {
  // ====== GET ALL BOOK
  // ROUTE GET localhost:3000/books
  // Response: [ books ]
  static async getAll(req, res, next) {
    try {
      const books = await Book.findAll();
      return res.status(200).json(books);
    } catch (err) {
      next(err);
    }
  }

  // ====== ADD a BOOK
  // ROUTE POST localhost:3000/books
  // Request Body: title, author
  // Response: { book }
  static async addBook(req, res, next) {
    try {
      const userId = req.userData.id; // {id, email}

      const params = {
        title: req.body.title,
        author: req.body.author,
        UserId: userId,
      };

      const newBook = await Book.create(params);
      return res.status(201).json(newBook);
    } catch (err) {
      next(err);
    }
  }

  // ===== Edit a Book
  // ROUTE PUT localhost:3000/books/:id
  // Request Body: title, author
  // Response: { book }
  static async editBook(req, res, next) {
    const idBook = req.params.id;

    const params = {
      title: req.body.title,
      author: req.body.author,
    };

    try {
      const results = await Book.update(params, { where: { id: idBook } });

      if (results[0] === 1) {
        res
          .status(200)
          .json({ message: `Book with id ${idBook} successfully updated` });
      } else {
        throw {
          name: "ValidationError",
          message: "Book not found",
          statusCode: 404,
        };
      }
    } catch (err) {
      next(err);
    }
  }
}

module.exports = BookController;
