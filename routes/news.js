const fetch = require("node-fetch");

module.exports = function (app) {
  app.get("/news/:subject", (req, res) => {
    let subject = req.params.subject;
    let apiKey = "e5980334e1834407b04fb0813a77ce08";
    let url =
      "http://newsapi.org/v2/everything?" +
      `q=${subject}&` +
      "sortBy=popularity&" +
      `apiKey=${apiKey}`;

    fetch(url)
      .then((fetchedNews) => {
        if (fetchedNews.status == 200) {
          return fetchedNews.text();
        } else {
          throw {
            status: fetchedNews.status,
            message: "Failed in fetching news",
          };
        }
      })
      .then((fetchedNewsString) => {
        res.end(fetchedNewsString);
      })
      .catch((err) => {
        console.log(err.status, err.message);
        res.status(err.status).end(err.message);
      });
  });
};
