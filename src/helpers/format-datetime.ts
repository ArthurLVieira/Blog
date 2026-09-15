'use cache';

import { format, formatDistanceToNow } from 'date-fns';
import { ptBR } from 'date-fns/locale';

export async function formatDateTime(rawDate: string) {
  const date = new Date(rawDate);

  return format(date, "dd/MM/yyyy 'ás' HH'h'mm", { locale: ptBR });
}

export async function formatRelativeDate(rawDate: string) {
  const date = new Date(rawDate);

  return formatDistanceToNow(date, { locale: ptBR, addSuffix: true });
}

export async function formatHour(timestamp: number) {
  return format(timestamp, 'HH:mm:ss', { locale: ptBR });
}
