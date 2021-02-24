const fetch = require("node-fetch");

module.exports = function (res, url) {
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
