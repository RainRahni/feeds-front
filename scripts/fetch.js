async function fetchArticles() {
    const response = await fetch(`${FETCH_API_URL}/article/all`);
    if (!response.ok) {
        throw new Error('Network error!');
    }
    return response.json();
}

async function fetchFeeds() {
    const response = await fetch(`${FETCH_API_URL}/feed`);
    if (!response.ok) {
        throw new Error('Network error!');
    }
    return response.json();
}

async function fetchDropdownContent() {
    const response = await fetch(`${FETCH_API_URL}/category`);
    if (!response.ok) {
        throw new Error('Network error!');
    }
    return response.json();
}
async function fetchArticleContent(link){
    const encodedLink = encodeURIComponent(link);
    const response = await fetch(`${FETCH_API_URL}/article/content?link=${encodedLink}`)
    if (!response.ok) {
        throw new Error("Network error!");
    }
    return response.text();
}