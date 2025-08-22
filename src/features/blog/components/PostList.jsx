import React from 'react';

// This component is now simpler. It just renders the list.
const PostList = React.memo(function PostList({ posts, selectedPostId, onSelectPost, onPrefetchPost }) {
    return (
        <div className="space-y-2">
            {posts?.map((post) => (
                <div
                    key={post.id}
                    onClick={() => onSelectPost(post.id)}
                    onMouseEnter={() => onPrefetchPost(post.id)}
                    className={`p-4 rounded-lg cursor-pointer transition-colors ${
                        selectedPostId === post.id ? 'bg-cyan-800' : 'bg-gray-800 hover:bg-gray-700'
                    }`}
                >
                    <h2 className="font-bold">{post.title}</h2>
                </div>
            ))}
        </div>
    );
});

export default PostList;