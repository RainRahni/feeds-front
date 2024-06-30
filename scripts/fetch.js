async function fetchArticles() {
    const response = await fetch(`${FETCH_API_URL}/article`);
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
