import { PostModel } from '@/models/post/post-model';

export interface PostRepository {
  findAll(): Promise<PostModel[]>;
  findById(id: string): Promise<PostModel>;
  findByPublished(publised: boolean): Promise<PostModel[]>;
  findBySlugPublished(slug: string): Promise<PostModel>;
  findBySlug(slug: string): Promise<PostModel>;
  deleteById(id: string): Promise<void>;
  findByLastCreatedAt(): Promise<PostModel>;
  insert(post: PostModel): Promise<PostModel>;
  delete(id: string): Promise<PostModel>;
  update(
    id: string,
    newPostData: Omit<PostModel, 'id' | 'slug' | 'createdAt' | 'updatedAt'>,
  ): Promise<PostModel>;
}
