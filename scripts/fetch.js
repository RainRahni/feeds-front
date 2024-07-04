async function fetchArticles() {
    const response = await fetch(`${FETCH_API_URL}/article/all`);
    if (!response.ok) {
        let text = await response.text();
        alert(text);
    }
    return response.json();
}

async function fetchFeeds() {
    const response = await fetch(`${FETCH_API_URL}/feed`);
    if (!response.ok) {
        let text = await response.text();
        alert(text);
    }
    return response.json();
}

async function fetchDropdownContent() {
    const response = await fetch(`${FETCH_API_URL}/category`);
    if (!response.ok) {
        let text = await response.text();
        alert(text);
    }
    return response.json();
}
async function fetchArticleContent(link){
    const encodedLink = encodeURIComponent(link);
    const response = await fetch(`${FETCH_API_URL}/article/content?link=${encodedLink}`)
    if (!response.ok) {
        let text = await response.text();
        alert(text);
    }
    return response.text();
}
async function updateFeed(updatedFeed, feedId) {
    const response = await fetch(`${FETCH_API_URL}/feed/${feedId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedFeed)
    });
    if (!response.ok) {
        let text = await response.text();
        alert(text);
    }
}
async function deleteFeed(feedId) {
    const response = await fetch(`${FETCH_API_URL}/feed/${feedId}`, {
        method: "DELETE",
    })
    if (!response.ok) {
        let text = await response.text();
        alert(text);
    }
}
async function createFeed(feed) {
    const response = await fetch(`${FETCH_API_URL}/feed`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(feed)
    });
    if (!response.ok) {
        let text = await response.text();
        alert(text);
    } else {
        alert(OPERATION_SUCCESSFUL_MESSAGE);
    }
}