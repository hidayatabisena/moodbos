import HttpError from '@wasp/core/HttpError.js'


export const getPosts = async (args, context) => {
  return context.entities.Post.findMany();
}

export const getPost = async ({ postId }, context) => {
  if (!context.user) { throw new HttpError(401) };

  const post = await context.entities.Post.findUnique({
    where: { id: postId },
    include: { user: true }
  });

  if (!post) { throw new HttpError(404, `Post with id ${postId} not found`) };

  if (post.user.id !== context.user.id) { throw new HttpError(400, `Post with id ${postId} does not belong to the authenticated user`) };

  return post;
}

export const getUserPosts = async ({ userId }, context) => {
  if (!context.user) { throw new HttpError(401) }

  const posts = await context.entities.Post.findMany({
    where: {
      user: { id: userId }
    }
  });

  return posts;
}