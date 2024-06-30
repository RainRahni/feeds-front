window.onload = async function() {
    const articles = await fetchArticles();
    const feeds = await fetchFeeds();
    const dropdownContent = await fetchDropdownContent();
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
    renderArticles(articles, feeds);
    function filterArticles(category) {
        const filteredArticles = articles.filter(article =>
            article.categories.map(c => c.name).includes(category)
    );
        renderArticles(filteredArticles, feeds);
    }
};
