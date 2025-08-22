import { useMutation, useQueryClient } from '@tanstack/react-query';
import { postComment } from '../api/postsApi.js';

export function useAddComment() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: postComment,
        // Optimistic Update Logic
        onMutate: async (newComment) => {
            await queryClient.cancelQueries({ queryKey: ['comments', newComment.postId] });
            const previousComments = queryClient.getQueryData(['comments', newComment.postId]);
            queryClient.setQueryData(['comments', newComment.postId], (old) => [
                ...(old || []),
                { ...newComment, id: Date.now(), name: 'You (Optimistic)', body: newComment.comment }
            ]);
            return { previousComments };
        },
        onError: (err, newComment, context) => {
            queryClient.setQueryData(['comments', newComment.postId], context.previousComments);
        },
        onSettled: (data, error, variables) => {
            queryClient.invalidateQueries({ queryKey: ['comments', variables.postId] });
        },
    });
}