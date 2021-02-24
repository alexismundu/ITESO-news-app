var NEWS_PER_ROW = 4;
var searchBar = (document.getElementsByClassName("search-bar")[0]);
var endpoint = "/news";
var defaultUrl = endpoint + "/Microsoft";
var templateSource = document.getElementById("news-container").innerHTML;
var template = Handlebars.compile(templateSource);
function refreshNews() {
    fetchNews()
        .then(function (fetched_news) {
        displayNews(fetched_news);
    })["catch"](function (err) { return console.log(err); });
}
function fetchNews() {
    var url = searchBar.value.length ? endpoint + "/" + searchBar.value : defaultUrl;
    return fetch(url)
        .then(function (response) {
        if (response.status === 200) {
            return response.json();
        }
        else {
            throw "Error fetching news, status " + response.status;
        }
    })["catch"](function (err) { return err; });
}
function displayNews(fetched_news) {
    var rows = formatFetchedNewsIntoRows(fetched_news);
    document.getElementById("news-container").innerHTML = template({
        rows: rows
    });
}
function formatFetchedNewsIntoRows(fetched_news) {
    var raw_news = fetched_news["articles"].length <= 20
        ? fetched_news["articles"]
        : fetched_news["articles"].slice(0, 20);
    var news = mapNewsData(raw_news);
    var rows = [];
    for (var i = 0, j = news.length; i < j; i += NEWS_PER_ROW) {
        rows.push({
            news: news.slice(i, i + NEWS_PER_ROW)
        });
    }
    return rows;
}
function mapNewsData(raw_news) {
    return raw_news.map(function (e) {
        return {
            urlToImage: e["urlToImage"],
            title: e["title"],
            description: e["description"],
            url: e["url"]
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
