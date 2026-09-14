import { PostModel } from '@/models/post/post-model';
import { PostRepository } from './post-repository';
import { drizzleDb } from '@/db/drizzle';
import AsyncDelay from '@/helpers/async-delay';

export class DrizzlePostRepository implements PostRepository {
  async findAll(): Promise<PostModel[]> {
    await AsyncDelay(SIMULATE_WAIT_IN_MS);
    const posts = await drizzleDb.query.posts.findMany({
      orderBy: (posts, { desc }) => desc(posts.createdAt),
    });

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

    return posts;
  }

  async findBySlug(slug: string): Promise<PostModel> {
    const post = await drizzleDb.query.posts.findFirst({
      where: (post, { eq }) => eq(post.slug, slug),
    });

    if (!post) throw new Error('post não encontrado');

    return post;
  }
}
