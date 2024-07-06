function debug(message) {
    const debugElement = document.getElementById('debug');
    debugElement.innerHTML += `<p>${message}</p>`;
}

async function initialize() {
    debug("Initializing...");
    const path = window.location.pathname;
    debug(`Current path: ${path}`);

    try {
        const [articles, feeds, dropdownContent] = await Promise.all([
            fetchArticles(),
            fetchFeeds(),
            fetchDropdownContent()
        ]);

        debug(`Fetched articles: ${JSON.stringify(articles)}`);
        debug(`Fetched feeds: ${JSON.stringify(feeds)}`);
        debug(`Fetched dropdown content: ${JSON.stringify(dropdownContent)}`);

        const dropdown = document.querySelector('.dropdown-content');
        const dropbtn = document.querySelector('.dropbtn');

        const noneOption = document.createElement('a');
        noneOption.textContent = 'None';
        noneOption.onclick = function() {
            dropbtn.textContent = 'Selected: None';
            renderArticles(articles, feeds);
        };
        dropdown.appendChild(noneOption);

        dropdownContent.forEach(item => {
            const link = document.createElement('a');
            link.textContent = item;
            link.onclick = function() {
                dropbtn.textContent = `Selected: ${item}`;
                filterArticles(item);
            };
            dropdown.appendChild(link);
        });

        if (path.includes('index.html')) {
            renderArticles(articles, feeds);
        } else if (path.includes('feedManagement.html')) {
            renderFeeds(feeds);
        }

        function filterArticles(category) {
            const filteredArticles = articles.filter(article =>
                article.categories.map(c => c.name).includes(category)
            );
            renderArticles(filteredArticles, feeds);
        }

    } catch (error) {
        debug(`Error loading content: ${error}`);
    }
}

document.addEventListener("DOMContentLoaded", initialize);
