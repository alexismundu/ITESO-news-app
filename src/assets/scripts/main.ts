declare let Handlebars: any;

const NEWS_PER_ROW = 4;

let searchBar = (<HTMLInputElement>document.getElementsByClassName('search-bar')[0])

let apiKey = 'e5980334e1834407b04fb0813a77ce08';

let url = 'http://newsapi.org/v2/everything?' +
    'q=Microsoft&' +
    'sortBy=popularity&' +
    `apiKey=${apiKey}`;


const templateSource = document.getElementById('news-container').innerHTML;
const template = Handlebars.compile(templateSource);

function refreshNews(){
    fetchNews()
    .then(fetched_news => {
        displayNews(fetched_news);
    })
    .catch(err => console.log(err));
}

function fetchNews() {
    return fetch(url)
        .then(response => response.json())
        .catch(err => console.log(err));
}

function displayNews(fetched_news) {
    
    let rows = formatFetchedNewsIntoRows(fetched_news);

    document.getElementById('news-container').innerHTML = template({
        rows: rows
    });
}

function formatFetchedNewsIntoRows(fetched_news){
    let raw_news = fetched_news['articles'].length <= 20 ? fetched_news['articles'] : fetched_news['articles'].slice(0, 20);

    let news = mapNewsData(raw_news);

    let rows = [];

    for (let i = 0, j = news.length; i < j; i += NEWS_PER_ROW) {
        rows.push(
            {
                news: news.slice(i, i + NEWS_PER_ROW)
            }
        );
    }
    return rows
}

function mapNewsData(raw_news) {
    return raw_news.map(e => {
        return {
            urlToImage: e['urlToImage'],
            title: e['title'],
            description: e['description'],
            url: e['url'],
        }
    });
}

function search() {
    url = 'http://newsapi.org/v2/everything?'
        + `q=${searchBar.value}`
        + '&sortBy=popularity'
        + `&apiKey=${apiKey}`;
    console.log(`Searching... ${searchBar.value}`);

    refreshNews();

}

searchBar.addEventListener("keyup", function (event) {
    if (event.key === 'Enter') {
        event.preventDefault();
        search();
    }
});

refreshNews();