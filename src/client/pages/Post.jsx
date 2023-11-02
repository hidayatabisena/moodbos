import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useQuery } from '@wasp/queries';
import { useAction } from '@wasp/actions';
import getPost from '@wasp/queries/getPost';
import updatePost from '@wasp/actions/updatePost';
import deletePost from '@wasp/actions/deletePost';

export function PostPage() {
  const { postId } = useParams();

  const { data: post, isLoading, error } = useQuery(getPost, { postId });
  const updatePostFn = useAction(updatePost);
  const deletePostFn = useAction(deletePost);

  if (isLoading) return 'Loading...';
  if (error) return 'Error: ' + error;

  const handleUpdatePost = ({ title, content, type }) => {
    updatePostFn({ id: postId, title, content, type });
  };

  const handleDeletePost = () => {
    deletePostFn({ id: postId });
  };

  return (
    <div className='p-4'>
      <h1 className='text-xl font-bold mb-4'>{post.title}</h1>
      <p className='mb-4'>{post.content}</p>
      <p className='text-gray-500 text-sm mb-4'>Type: {post.type}</p>

      <button
        onClick={handleUpdatePost}
        className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2'
      >
        Update
      </button>
      <button
        onClick={handleDeletePost}
        className='bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded'
      >
        Delete
      </button>
    </div>
  );
}