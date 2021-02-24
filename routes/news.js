const getNews = require("../src/controllers/news");
const { APIKEY } = require("../constants");

module.exports = function (app) {
  app.get("/news/:subject", (req, res) => {
    let subject = req.params.subject;
    let url =
      "http://newsapi.org/v2/everything?" +
      `q=${subject}&` +
      "sortBy=popularity&" +
      `apiKey=${APIKEY}`;

    getNews(res, url);
  });
};
