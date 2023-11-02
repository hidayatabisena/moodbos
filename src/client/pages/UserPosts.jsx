import React from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from '@wasp/queries';
import getUserPosts from '@wasp/queries/getUserPosts';

export function UserPosts({ match }) {
  const { data: posts, isLoading, error } = useQuery(getUserPosts, { userId: match.params.userId });

  if (isLoading) return 'Loading...';
  if (error) return 'Error: ' + error;

  return (
    <div className='p-4'>
      {posts.map((post) => (
        <div
          key={post.id}
          className='bg-gray-100 p-4 mb-4 rounded-lg'
        >
          <div className='font-bold'>{post.title}</div>
          <div>{post.content}</div>
          <div className='mt-2'>
            <Link to={`/post/${post.id}`} className='text-blue-500 hover:underline'>Read More</Link>
          </div>
        </div>
      ))}
    </div>
  );
}