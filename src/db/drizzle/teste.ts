import { eq } from 'drizzle-orm';
import { drizzleDb } from '.';
import { postsTable } from './schemas';

(async () => {
  // const posts = await drizzleDb.select().from(postsTable);
  // console.log(posts);
  await drizzleDb
    .update(postsTable)
    .set({ title: 'Teste alterando titulo' })
    .where(eq(postsTable.slug, 'dicas-para-manter-a-saude-mental-em-dia'));
})();
