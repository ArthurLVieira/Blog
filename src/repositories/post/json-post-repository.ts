import { PostModel } from '@/models/post/post-model';
import { PostRepository } from './post-repository';
import { resolve } from 'path';
import { readFile } from 'fs/promises';

const ROOT_DIR = process.cwd();
const JSON_POSTS_FILE_PATH = resolve(
  ROOT_DIR,
  'src',
  'db',
  'seed',
  'posts.json',
);

export class JsonPostRepository {
  private readFromDisk = async (): Promise<PostModel[]> => {
    const jsonContent = await readFile(JSON_POSTS_FILE_PATH, 'utf-8');
    const parsedJson = JSON.parse(jsonContent);
    const { posts } = parsedJson;
    return posts;
  };

  findAll = async (): Promise<PostModel[]> => {
    const posts = await this.readFromDisk();
    return posts;
  };

  async findById(id: string): Promise<PostModel> {
    const posts = await this.findAll();
    const post = posts.filter(post => post.id === id);
    if (!post) throw new Error(`ID: ${id}, not found.`);

    return post[0];
  }

  findByPublished = async (publised: boolean): Promise<PostModel[]> => {
    const posts = await this.findAll();
    const postsPublished = posts.filter(posts => posts.published === publised);

    if (!postsPublished) throw new Error(`Published: ${publised}, not found.`);

    return postsPublished;
  };

  findBySlug = async (slug: string): Promise<PostModel> => {
    const posts = await this.findAll();
    const post = posts.filter(post => post.slug == slug);

    if (!post) throw new Error(`Slug: ${slug}, not found.`);

    return post[0];
  };

  findBySlugPublished = async (slug: string): Promise<PostModel> => {
    const posts = await this.findAll();
    const post = posts.filter(
      post => post.slug === slug && post.published === true,
    );

    if (!post) throw new Error(`Slug: ${slug}, not found.`);

    return post[0];
  };

  async deleteById(id: string): Promise<void> {}
}
