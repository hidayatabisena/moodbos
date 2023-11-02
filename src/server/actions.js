import HttpError from '@wasp/core/HttpError.js'

export const createPost = async ({ title, content, type }, context) => {
  if (!context.user) { throw new HttpError(401) };

  return context.entities.Post.create({
    data: {
      title,
      content,
      type,
      user: { connect: { id: context.user.id } }
    }
  });
}

export const updatePost = async (args, context) => {
  if (!context.user) { throw new HttpError(401) };

  const post = await context.entities.Post.findUnique({
    where: { id: args.id }
  });
  if (post.userId !== context.user.id) { throw new HttpError(403) };

  return context.entities.Post.update({
    where: { id: args.id },
    data: { title: args.title, content: args.content, type: args.type }
  });
}

export const deletePost = async (args, context) => {
  if (!context.user) { throw new HttpError(401) };

  await context.entities.Post.delete({
    where: { id: args.id }
  });
}