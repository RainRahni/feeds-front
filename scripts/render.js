function renderArticles(articles, feeds) {
    const articlesDiv = document.getElementById('articles');
    articlesDiv.innerHTML = '';

    articles.forEach(article => {
        const card = document.createElement('div');
        card.className = 'card';
        const imageContainer = document.createElement("div");
        imageContainer.className = "img-container";
        card.style.backgroundColor = getColorForFeedId(article.feedId, feeds);
        const img = document.createElement('img');
        img.src = article.imageUrl ? article.imageUrl : "assets/No-image.png";
        imageContainer.appendChild(img);

        const container = document.createElement('div');
        container.className = 'container';
        if (article.title) {
            const title = document.createElement('h4');
            title.className = "article-title";
            title.appendChild(document.createTextNode(article.title));
            container.appendChild(title);
        }
        if (article.description) {
            const description = document.createElement('p');
            description.className = "article-desc";
            description.appendChild(document.createTextNode(article.description));
            container.appendChild(description);
        }
        if (article.categories.length > 0) {
            const buttonDialog = document.createElement("button");
            buttonDialog.className = "categoriesButton";
            buttonDialog.innerHTML = '<img src="../assets/No-Image.png" alt="Open Categories"/>';
            buttonDialog.onclick = function() {
                showCategoriesDialog(article.categories);
            };
            container.appendChild(buttonDialog);
        }
        card.appendChild(imageContainer);
        card.appendChild(container);
        articlesDiv.appendChild(card);
    });
}

function getColorForFeedId(feedId, feeds) {
    const correspondingFeed = feeds.find(feed => feed.id === feedId);
    return correspondingFeed.hexColor;
}
function createCategories(categories, categoryDialog) {
    categories.forEach(category => {
        const categoryElem = document.createElement("a");
        categoryElem.className = "category";
        categoryElem.href = category.link;
        categoryElem.target = "_blank";
        categoryElem.style.backgroundColor = category.hexColor;
        categoryElem.appendChild(document.createTextNode(category.name));
        categoryDialog.appendChild(categoryElem);
    });
}

function showCategoriesDialog(categories) {
    const overlay = document.createElement('div');
    overlay.className = 'dialog-overlay';
    document.body.appendChild(overlay);

    const categoriesDialog = document.createElement('div');
    categoriesDialog.className = 'dialog-visible';
    createCategories(categories, categoriesDialog);

    const closeButton = document.createElement('button');
    closeButton.className = "close-button";
    closeButton.textContent = 'Close';
    closeButton.onclick = function() {
        categoriesDialog.className = 'dialog-hidden';
        overlay.remove();
    };
    categoriesDialog.appendChild(closeButton);

    document.body.appendChild(categoriesDialog);
}