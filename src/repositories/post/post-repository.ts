import { PostModel } from '@/models/post/post-model';

export interface PostRepository {
  findAll(): Promise<PostModel[]>;
  findById(id: string): Promise<PostModel>;
  findByPublished(publised: boolean): Promise<PostModel[]>;
  findBySlug(slug: string): Promise<PostModel>;
}
