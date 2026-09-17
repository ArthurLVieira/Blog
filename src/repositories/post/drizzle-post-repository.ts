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

    return posts.map(post => ({
      ...post,
    }));
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

  async findAllExceptLatest(): Promise<PostModel[]> {
    const posts = await drizzleDb.query.posts.findMany({
      where: (posts, { eq }) => eq(posts.published, true),
      orderBy: (posts, { desc }) => desc(posts.createdAt),
      limit: -1,
      offset: 1,
    });
    if (!posts) throw new Error('post não encontrado');
    return posts;
  }
}
