import { useState } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { fetchPosts, fetchCommentsByPostId } from './api/postsApi';
import { useAddComment } from './hooks/useComments';
import PostList from './components/PostList';
import CommentList from './components/CommentList';

function ComplexQueryPage() {
    const [selectedPostId, setSelectedPostId] = useState(null);
    const queryClient = useQueryClient();

    // --- Queries & Mutations are unchanged ---
    const { data: posts, isLoading: postsLoading } = useQuery({ queryKey: ['posts'], queryFn: fetchPosts });
    const { data: comments, isLoading: commentsLoading } = useQuery({ queryKey: ['comments', selectedPostId], queryFn: () => fetchCommentsByPostId(selectedPostId), enabled: !!selectedPostId });
    const { mutate: addComment, isPending: isAddingComment, error: addCommentError } = useAddComment();

    const handlePrefetchPost = (postId) => { queryClient.prefetchQuery({ queryKey: ['comments', postId], queryFn: () => fetchCommentsByPostId(postId) }) };

    return (
        // ▼▼▼ FIX #3: This layout now works because its parent has a defined height ▼▼▼
        // flex flex-col: The page itself is a vertical flex container.
        // h-full: It will stretch to the full height of the <main> element.
        <div className="flex flex-col h-full">
            {/* This grid will contain our two scrolling columns */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 flex-grow min-h-0">

                {/* Left Column: Posts */}
                <div className="flex flex-col min-h-0">
                    <h1 className="text-3xl font-bold text-cyan-400 mb-4 shrink-0">Posts</h1>
                    <div className="overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-slate-700 scrollbar-track-transparent">
                        {postsLoading ? <p>Loading...</p> : <PostList posts={posts} selectedPostId={selectedPostId} onSelectPost={setSelectedPostId} onPrefetchPost={handlePrefetchPost} />}
                    </div>
                </div>

                {/* Right Column: Comments */}
                <div className="flex flex-col min-h-0">
                    <h1 className="text-3xl font-bold text-cyan-400 mb-4 shrink-0">Comments</h1>
                    <div className="overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-slate-700 scrollbar-track-transparent">
                        {!selectedPostId ? <p>Select a post...</p> :
                            commentsLoading ? <p>Loading...</p> :
                                <CommentList comments={comments} postId={selectedPostId} onAddComment={addComment} isAddingComment={isAddingComment} addCommentError={addCommentError} />}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ComplexQueryPage;