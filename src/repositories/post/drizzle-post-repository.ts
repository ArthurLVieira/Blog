import { PostModel } from '@/models/post/post-model';
import { PostRepository } from './post-repository';
import { drizzleDb } from '@/db/drizzle';
import { postsTable } from '@/db/drizzle/schemas';
import { eq } from 'drizzle-orm';

export class DrizzlePostRepository implements PostRepository {
  async findAll(): Promise<PostModel[]> {
    const posts = await drizzleDb.query.posts.findMany({
      orderBy: (posts, { desc }) => desc(posts.createdAt),
    });

    if (!posts) throw new Error('Post não encontrado.');

    return posts;
  }

  async findById(id: string): Promise<PostModel> {
    const post = await drizzleDb.query.posts.findFirst({
      where: (posts, { eq }) => eq(posts.id, id),
      orderBy: (posts, { desc }) => desc(posts.createdAt),
    });

    if (!post) throw new Error('Post não encontrado.');

    return post;
  }

  async findByPublished(publised: boolean): Promise<PostModel[]> {
    const posts = await drizzleDb.query.posts.findMany({
      where: (posts, { eq }) => eq(posts.published, publised),
      orderBy: (posts, { desc }) => desc(posts.createdAt),
    });

    return posts;
  }

  async findBySlugPublished(slug: string): Promise<PostModel> {
    const posts = await drizzleDb.query.posts.findFirst({
      where: (posts, { eq, and }) =>
        and(eq(posts.published, true), eq(posts.slug, slug)),
      orderBy: (posts, { desc }) => desc(posts.createdAt),
    });

    if (!posts) {
      throw new Error(`Post não encontrado: ${slug}`);
    }

    return posts;
  }

  async findBySlug(slug: string): Promise<PostModel> {
    const post = await drizzleDb.query.posts.findFirst({
      where: (post, { eq }) => eq(post.slug, slug),
    });

    if (!post) throw new Error('post não encontrado');

    return post;
  }

  async deleteById(id: string): Promise<void> {
    await this.findById(id);
    await drizzleDb.delete(postsTable).where(eq(postsTable.id, id));
  }

  async findByLastCreatedAt(): Promise<PostModel> {
    const post = await drizzleDb.query.posts.findFirst({
      orderBy: (posts, { desc }) => desc(posts.createdAt),
    });

    if (!post) throw new Error('post não encontrado');

    return post;
  }

  async insert(post: PostModel): Promise<PostModel> {
    const postExists = await drizzleDb.query.posts.findFirst({
      where: (posts, { or, eq }) =>
        or(eq(posts.id, post.id), eq(posts.slug, post.slug)),
      columns: { id: true },
    });

    if (!!postExists) {
      throw new Error('Post com ID ou Slug já existe na base da dados');
    }

    await drizzleDb.insert(postsTable).values(post);

    return post;
  }

  async delete(id: string): Promise<PostModel> {
    const postExists = await drizzleDb.query.posts.findFirst({
      where: (currentPost, { eq }) => eq(currentPost.id, id),
    });

    if (!postExists) {
      throw new Error('Post não existe !');
    }

    await drizzleDb.delete(postsTable).where(eq(postsTable.id, id));

    return postExists;
  }

  async update(
    id: string,
    newPostData: Omit<PostModel, 'id' | 'slug' | 'createdAt' | 'updatedAt'>,
  ): Promise<PostModel> {
    const oldPost = await drizzleDb.query.posts.findFirst({
      where: (currentPost, { eq }) => eq(currentPost.id, id),
    });

    if (!oldPost) {
      throw new Error('Post não existe !');
    }

    const now = new Date().toISOString();

    const postData = {
      author: newPostData.author,
      content: newPostData.content,
      coverImageUrl: newPostData.coverImageUrl,
      excerpt: newPostData.excerpt,
      published: newPostData.published,
      title: newPostData.title,
      updatedAt: now,
    };

    await drizzleDb
      .update(postsTable)
      .set(postData)
      .where(eq(postsTable.id, id));

    return {
      ...oldPost,
      ...postData,
    };
  }
}
