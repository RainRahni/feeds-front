//var feeds = getAllFeeds();

window.onload = async function() {
    articles  = await fetchArticles();
    console.log(articles)
    var articlesDiv = document.getElementById('articles');

    articles.forEach(function(article) {
        const card = document.createElement('div');
        card.className = 'card';
        //card.style.backgroundColor = getColorForFeedId(article.feedId);

        if (article.imageUrl) {
            const img = document.createElement('img');
            img.src = article.imageUrl;
            card.appendChild(img);
        }

        const container = document.createElement('div');
        container.className = 'container';

        const title = document.createElement('h4');
        const titleText = document.createTextNode(article.title);
        title.appendChild(titleText);
        container.appendChild(title);

        if (article.description) {
            var description = document.createElement('p');
            var descriptionText = document.createTextNode(article.description);
            description.className="articleDesc";
            description.appendChild(descriptionText);
            container.appendChild(description);
        }
        card.appendChild(container);
        articlesDiv.appendChild(card);
    });
}

function getColorForFeedId(feedId) {
    return feedId % 2 === 0 ? 'lightblue' : 'lightgreen';
}
function fetchArticles() {
    return fetch(`${FETCH_API_URL}/article`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network error!');
            }
            return response.json();
        })
        .catch(error => {
            console.error('Operation failed!', error);
        });
}
