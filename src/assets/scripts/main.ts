declare let Handlebars: any;

const NEWS_PER_ROW = 4;

let searchBar = (<HTMLInputElement>document.getElementsByClassName('search-bar')[0])

let apiKey = 'e5980334e1834407b04fb0813a77ce08';

let url = 'http://newsapi.org/v2/everything?' +
    'q=Microsoft&' +
    'sortBy=popularity&' +
    `apiKey=${apiKey}`;

let req = new Request(url);

const templateSource = document.getElementById('news-container').innerHTML;
const template = Handlebars.compile(templateSource);

async function fetchNews() {
    let response = await fetch(req);
    let news = response.json();
    return news;
}

function displayNews() {
    fetchNews().then(fetched_news => {
        console.log(fetched_news['articles'].length)
        let raw_news = fetched_news['articles'].length <= 20 ? fetched_news['articles']: fetched_news['articles'].slice(0, 20);

        let news = raw_news.map(e => {
            return {
                urlToImage: e['urlToImage'],
                title: e['title'],
                description: e['description'],
                url: e['url'],
            }
        });

        let rows = [];

        for (let i = 0, j = news.length; i < j; i += NEWS_PER_ROW) {
            rows.push(
                {
                    news: news.slice(i, i + NEWS_PER_ROW)
                }
            );
        }

        console.log(news);
        document.getElementById('news-container').innerHTML = template({
            rows: rows
        });
    });
}

function search() {
    url = 'http://newsapi.org/v2/everything?'
        + `q=${searchBar.value}`
        + '&sortBy=popularity'
        + `&apiKey=${apiKey}`;
    console.log(`Searching... ${searchBar.value}`);
    req = new Request(url);

    displayNews();

}

searchBar.addEventListener("keyup", function (event) {
    if (event.key === 'Enter') {
        event.preventDefault();
        search();
    }
});

displayNews();