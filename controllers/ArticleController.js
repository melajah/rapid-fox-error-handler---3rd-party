const axios = require("axios");

class ArticleController {
  static getArticle(req, res, next) {
    // ng hit api nytimes
    // installl axios
    // import axios
    // menggunakan
    axios({
      method: "GET",
      url: `https://api.nytimes.com/svc/topstories/v2/arts.json?api-key=${process.env.APIKEY}`,
      // url: `https://api.nytimes.com/svc/topstories/v2/arts.json?api-key=20938282093901`,
    })
      .then((response) => {
        res.status(200).json(response.data);
      })
      .catch((err) => {
        next(err);
        // next(err);
      });
  }
}

module.exports = ArticleController;
