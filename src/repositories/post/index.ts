import { DrizzlePostRepository } from './drizzle-post-repository';
import { JsonPostRepository } from './json-post-repository';
import { PostRepository } from './post-repository';

export const postRespository: PostRepository = new DrizzlePostRepository();

// (async () => {
//   const postsPublished = await postRespository.findByPublished(false);
//   console.log(postsPublished);
// })();
