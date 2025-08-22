import React from 'react';

const AddCommentForm = React.memo(function AddCommentForm({ postId, onAddComment, isAddingComment, error }) {
    const handleSubmit = (e) => {
        e.preventDefault();
        const comment = e.target.elements.comment.value;
        if (comment) {
            onAddComment({ postId, comment });
            e.target.reset();
        }
    };

    return (
        <form onSubmit={handleSubmit} className="bg-gray-800 p-4 rounded-lg">
      <textarea
          name="comment"
          placeholder="Add a comment..."
          className="w-full bg-gray-700 rounded p-2 mb-2 text-white"
          rows="2"
      ></textarea>
            <button
                type="submit"
                disabled={isAddingComment}
                className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-2 rounded disabled:opacity-50"
            >
                {isAddingComment ? 'Posting...' : 'Post Comment'}
            </button>
            {error && <p className="text-red-400 mt-2">{error.message}</p>}
        </form>
    );
});

export default AddCommentForm;