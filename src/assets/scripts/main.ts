declare let Handlebars: any;

const NEWS_PER_ROW = 4;

let searchBar = <HTMLInputElement>(
  document.getElementsByClassName("search-bar")[0]
);

let endpoint = "/news";
let defaultUrl = endpoint + "/Microsoft";

const templateSource = document.getElementById("news-container").innerHTML;
const template = Handlebars.compile(templateSource);

function refreshNews() {
  fetchNews()
    .then((fetched_news) => {
      displayNews(fetched_news);
    })
    .catch((err) => console.log(err));
}

function fetchNews() {
  let url = searchBar.value.length  ? `${endpoint}/${searchBar.value}` : defaultUrl;
  console.log("fetching news...", url)
  return fetch(url)
    .then((response) => {
      if (response.status === 200) {
        return response.json();
      } else {
        throw "Error fetching news, status " + response.status;
      }
    })
    .catch((err) => err);
}

function displayNews(fetched_news) {
  let rows = formatFetchedNewsIntoRows(fetched_news);

  document.getElementById("news-container").innerHTML = template({
    rows: rows,
  });
}

function formatFetchedNewsIntoRows(fetched_news) {
  let raw_news =
    fetched_news["articles"].length <= 20
      ? fetched_news["articles"]
      : fetched_news["articles"].slice(0, 20);

  let news = mapNewsData(raw_news);

  let rows = [];

  for (let i = 0, j = news.length; i < j; i += NEWS_PER_ROW) {
    rows.push({
      news: news.slice(i, i + NEWS_PER_ROW),
    });
  }
  return rows;
}

function mapNewsData(raw_news) {
  return raw_news.map((e) => {
    return {
      urlToImage: e["urlToImage"],
      title: e["title"],
      description: e["description"],
      url: e["url"],
    };
  });
}

function search() {
  refreshNews();
}

searchBar.addEventListener("keyup", function (event) {
  if (event.key === "Enter") {
    event.preventDefault();
    search();
  }
});

refreshNews();
