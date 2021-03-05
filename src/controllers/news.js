const fetch = require("node-fetch");
const { APIKEY } = require("../../constants");

module.exports = function (res, subject) {
  let url =
    "http://newsapi.org/v2/everything?" +
    `q=${subject}&` +
    "sortBy=popularity&" +
    `apiKey=${APIKEY}`;
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
      res.status(err.status).end(err.message);
    });
};
