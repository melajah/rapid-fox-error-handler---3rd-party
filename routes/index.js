const express = require("express");
const router = express.Router();
const { authentication } = require("../middlewares/auth");
const BookRoutes = require("./BookRoutes");
const UserRoutes = require("./UserRoutes");

const ArticleController = require("../controllers/ArticleController");
router.get("/", (req, res) => {
  res.send("Welcome!");
});

router.get("/articles", authentication, ArticleController.getArticle);
router.use("/books", BookRoutes);
router.use("/", UserRoutes);

module.exports = router;
