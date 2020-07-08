const express = require("express");
const router = express.Router();

const BookController = require("../controllers/BookController");
const {authentication, authorization} = require('../middlewares/auth')

router.use(authentication);

router.get("/", BookController.getAll);
router.post("/", BookController.addBook);
router.put("/:id", authorization, BookController.editBook);

module.exports = router;
