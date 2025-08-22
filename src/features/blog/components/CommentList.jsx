import React from 'react';
import AddCommentForm from './AddCommentForm';

// This component is also simplified. The parent will handle its scrolling.
const CommentList = React.memo(function CommentList({ comments, postId, onAddComment, isAddingComment, addCommentError }) {
    return (
        <div className="space-y-4">
            <AddCommentForm
                postId={postId}
                onAddComment={onAddComment}
                isAddingComment={isAddingComment}
                error={addCommentError}
            />
            {comments?.map((comment) => (
                <div key={comment.id} className="bg-gray-800 p-3 rounded-lg">
                    <p className="text-sm text-gray-400">{comment.email}</p>
                    <p>{comment.body}</p>
                </div>
            ))}
        </div>
    );
});

export default CommentList;