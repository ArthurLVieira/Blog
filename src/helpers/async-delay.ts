import { log } from './log-colors';

export default async function AsyncDelay(
  milliseconds: number = 0,
  verbose: boolean = false,
) {
  if (milliseconds <= 0) return;

  if (verbose) log(`Delay for ${milliseconds / 1000}s`);

  await new Promise(resolve => setTimeout(resolve, milliseconds));
}
