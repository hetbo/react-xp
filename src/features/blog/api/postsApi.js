const fakeLatency = () => new Promise(res => setTimeout(res, Math.random() * 700 + 300));

export const fetchPosts = async () => {
    await fakeLatency();
    const response = await fetch('https://jsonplaceholder.typicode.com/posts');
    if (!response.ok) throw new Error('Network response was not ok');
    return (await response.json()).slice(0, 5);
};

export const fetchCommentsByPostId = async (postId) => {
    if (!postId) return null;
    await fakeLatency();
    const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${postId}/comments`);
    if (!response.ok) throw new Error('Network response was not ok');
    return response.json();
};

export const postComment = async ({ postId, comment }) => {
    await fakeLatency();
    if (Math.random() > 0.8) throw new Error('Failed to post comment. Please try again.');
    const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${postId}/comments`, {
        method: 'POST',
        body: JSON.stringify({ postId, name: 'User', email: 'user@example.com', body: comment }),
        headers: { 'Content-type': 'application/json; charset=UTF-8' },
    });
    if (!response.ok) throw new Error('Network response was not ok');
    return response.json();
};