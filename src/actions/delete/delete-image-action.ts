'use server';

import { IMAGE_SERVER_URL, IMAGE_UPLOAD_DIRECTORY } from '@/lib/constants';
import { unlink } from 'fs/promises';
import path, { basename, resolve, sep } from 'path';

type DeleteImageActionResult = { status?: boolean; message?: string };

const PUBLIC_UPLOAD_PATH = new URL(IMAGE_SERVER_URL).pathname.replace(
  /\/$/,
  '',
);

export async function deleteImageAction(
  url: string,
): Promise<DeleteImageActionResult> {
  if (!url || typeof url !== 'string') {
    return { message: 'URL inválida.' };
  }

  let pathname: string;
  try {
    pathname = new URL(url).pathname;
  } catch {
    return { status: false, message: 'URL inválida.' };
  }

  const prefix = `${PUBLIC_UPLOAD_PATH}`;

  if (!pathname.startsWith(prefix)) {
    return { status: false, message: 'URL não pertence ao diretório.' };
  }

  const fileName = basename(pathname.slice(prefix.length));

  if (!/^\d+\.[a-zA-Z0-9]+$/.test(fileName)) {
    return { status: false, message: 'Nome de arquivo inválido.' };
  }

  const uploadsFullPath = resolve(
    process.cwd(),
    'public',
    IMAGE_UPLOAD_DIRECTORY,
  );

  const fileFullPath = resolve(uploadsFullPath, fileName);

  if (!fileFullPath.startsWith(uploadsFullPath + sep)) {
    return { status: false, message: 'Caminho não permitido' };
  }

  try {
    await unlink(fileFullPath);
    return { status: true, message: 'imagem removida com sucesso.' };
  } catch (err) {
    if ((err as NodeJS.ErrnoException)?.code === 'ENOENT') {
      return { status: true };
    }
    console.error('Erro ao deletar imagem:', err);
    return { status: false, message: 'Não foi possível remover a imagem.' };
  }
}
