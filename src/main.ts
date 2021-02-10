declare let Handlebars: any;

let url = 'http://newsapi.org/v2/everything?' +
    'q=Microsoft&' +
    'sortBy=popularity&' +
    'apiKey=e5980334e1834407b04fb0813a77ce08';

let req = new Request(url);

const templateSource = document.getElementById('news-container').innerHTML;
const template = Handlebars.compile(templateSource);

async function fetchNews() {
    let response = await fetch(req);
    let news = response.json();
    return news;
}

fetchNews().then(fetched_news => {
    let raw_news = fetched_news['articles'].slice(0, 4);

    let news = raw_news.map(e => {
        return {
            urlToImage: e['urlToImage'],
            title: e['title'],
            description: e['description'],
            url: e['url'],
        }
    })
    console.log(news);
    document.getElementById('news-container').innerHTML = template({
        news: news
    });
});



