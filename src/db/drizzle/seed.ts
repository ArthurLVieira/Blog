import { JsonPostRepository } from '@/repositories/post/json-post-repository';
import { drizzleDb } from '.';
import { postsTable } from './schemas';

async function insertDate() {
  const jsonPostRepository = new JsonPostRepository();
  const posts = await jsonPostRepository.findAll();
  try {
    await drizzleDb.delete(postsTable);
    await drizzleDb.insert(postsTable).values(posts);
  } catch (e) {
    console.log(`error: ${e}`);
  }
}

async function findAll() {
  const posts = await drizzleDb.select().from(postsTable);

  console.log(posts);
}
findAll();
