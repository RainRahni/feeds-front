function renderArticles(articles, feeds) {
    const articlesDiv = document.getElementById('articles');
    articlesDiv.innerHTML = '';
    articles.forEach(article => {
        const card = document.createElement('div');
        card.className = 'card';
        const imageContainer = document.createElement("div");
        imageContainer.className = "img-container";
        let color = getColorForFeedId(article.feedId, feeds);
        card.style.backgroundColor = color;
        const img = document.createElement('img');
        img.src = article.imageUrl ? article.imageUrl : "assets/No-image.png";
        img.onclick = async function() {
            await openModal(article);
        };
        imageContainer.appendChild(img);

        const container = document.createElement('div');
        container.className = 'container';
        if (article.title) {
            const title = document.createElement('h4');
            title.className = "article-title";
            title.appendChild(document.createTextNode(article.title));
            title.onclick = async function() {
                await openModal(article);
            };
            container.appendChild(title);
        }
        if (article.description) {
            const description = document.createElement('p');
            description.className = "article-desc";
            description.appendChild(document.createTextNode(article.description));
            description.onclick = async function() {
                await openModal(article);
            };
            container.appendChild(description);
        }
        if (article.categories.length > 0) {
            const buttonDialog = document.createElement("button");
            buttonDialog.className = "categoriesButton";
            buttonDialog.style.backgroundColor = color;
            buttonDialog.innerHTML = '<img src="../assets/to-do-list.png" alt="Open Categories"/>';
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
async function openModal(article) {
    const overlay = document.createElement('div');
    overlay.className = 'dialog-overlay';
    document.body.appendChild(overlay);

    const modal = document.createElement('div');
    modal.className = 'modal-content';

    const modalBody = document.createElement('div');
    modalBody.className = 'modal-body';

    const date = document.createElement('h2');
    date.textContent = "Published on: " + article.publishedDate.split(" ")[0];
    modalBody.appendChild(date);

    try {
        const articleContent = await fetchArticleContent(article.link);
        const content = document.createElement('div');
        content.innerHTML = articleContent;
        modalBody.appendChild(content);
    } catch (error) {
        const errorMsg = document.createElement('p');
        errorMsg.textContent = `Failed to load article content: ${error.message}`;
        modalBody.appendChild(errorMsg);
    }

    const closeButton = document.createElement('button');
    closeButton.className = 'close-button';
    closeButton.innerHTML = 'Close';
    closeButton.onclick = function () {
        overlay.style.display = 'none';
        modal.remove();
    };

    window.onclick = function (event) {
        if (event.target === overlay) {
            overlay.style.display = 'none';
            modal.remove();
        }
    };
    modal.appendChild(modalBody);
    overlay.appendChild(modal);
    modal.appendChild(closeButton);
    overlay.style.display = 'flex';
}
function renderFeeds(feeds) {
    const tbody = document.getElementById('feedsTableBody');
    tbody.innerHTML = '';
    feeds.forEach(feed => {
        const row = document.createElement('tr');
        const titleCell = document.createElement('td');
        titleCell.textContent = feed.title;
        row.appendChild(titleCell);

        const linkCell = document.createElement('td');
        linkCell.textContent = feed.link;
        row.appendChild(linkCell);

        const colorCell = document.createElement('td');
        colorCell.style.backgroundColor = feed.hexColor;
        row.appendChild(colorCell);
        tbody.appendChild(row);

        const editButton = document.createElement("button");
        editButton.innerText = "Edit";
        editButton.className = "feed-edit-btn";
        editButton.onclick = function() {
            showEditDialog(feed, feeds);
        }
        row.appendChild(editButton);

        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";
        deleteButton.className = "feed-del-btn"
        deleteButton.onclick = async function() {
            await deleteFeed(feed.id);
            tbody.removeChild(row);
        }
        row.appendChild(deleteButton);
    });
}
function showEditDialog(feed, feeds) {
    const overlay = document.createElement('div');
    overlay.className = 'dialog-overlay';
    document.body.appendChild(overlay);

    const dialog = document.createElement('div');
    dialog.className = 'dialog-visible edit-dialog';

    const titleLabel = document.createElement('label');
    titleLabel.textContent = 'Title:';
    const titleInput = document.createElement('input');
    titleInput.className = "edit-input";
    titleInput.type = 'text';
    titleInput.value = feed.title;

    const linkLabel = document.createElement('label');
    linkLabel.textContent = 'Link:';
    const linkInput = document.createElement('input');
    linkInput.className = "edit-input";
    linkInput.type = 'text';
    linkInput.value = feed.link;


    const saveButton = document.createElement('button');
    saveButton.textContent = 'Save';
    saveButton.className = "save-btn";
    saveButton.onclick = async function() {
        const updatedFeed = {
            title: titleInput.value,
            link: linkInput.value
        }
        feed.title = titleInput.value;
        feed.link = linkInput.value;
        renderFeeds(feeds);
        await updateFeed(updatedFeed, feed.id);
        closeDialog();
    };

    const cancelButton = document.createElement('button');
    cancelButton.textContent = 'Cancel';
    cancelButton.className = "cancel-btn"
    cancelButton.onclick = function() {
        closeDialog();
    };

    dialog.appendChild(titleLabel);
    dialog.appendChild(titleInput);
    dialog.appendChild(linkLabel);
    dialog.appendChild(linkInput);
    dialog.appendChild(saveButton);
    dialog.appendChild(cancelButton);
    document.body.appendChild(dialog);

    function closeDialog() {
        document.body.removeChild(dialog);
        document.body.removeChild(overlay);
    }
}
function showAddDialog() {
    const overlay = document.createElement('div');
    overlay.className = 'dialog-overlay';
    document.body.appendChild(overlay);

    const dialog = document.createElement('div');
    dialog.className = 'dialog-visible edit-dialog';
    const linkLabel = document.createElement('label');
    linkLabel.textContent = 'Link:';
    const linkInput = document.createElement('input');
    linkInput.className = "edit-input";
    linkInput.type = 'text';


    const saveButton = document.createElement('button');
    saveButton.textContent = 'Save';
    saveButton.className = "save-btn";
    saveButton.onclick = async function () {
        const newFeed = {
            link: linkInput.value
        }
        await createFeed(newFeed);
        closeDialog();
    };

    const cancelButton = document.createElement('button');
    cancelButton.textContent = 'Cancel';
    cancelButton.className = "cancel-btn"
    cancelButton.onclick = function() {
        closeDialog();
    };

    dialog.appendChild(linkLabel);
    dialog.appendChild(linkInput);
    dialog.appendChild(saveButton);
    dialog.appendChild(cancelButton);
    document.body.appendChild(dialog);

    function closeDialog() {
        document.body.removeChild(dialog);
        document.body.removeChild(overlay);
    }
}