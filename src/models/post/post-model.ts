export type PostModel = {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  coverImageUrl: string;
  published: boolean | null;
  createdAt: string;
  updatedAt: string;
  author: string;
};
