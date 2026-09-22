'use client';

import { useCallback, useSyncExternalStore } from 'react';

export function useSessionStorage<T>(key: string, initialValue: T) {
  const subscribe = useCallback((cb: () => void) => {
    window.addEventListener('storage', cb);
    return () => window.removeEventListener('storage', cb);
  }, []);

  const getSnapshot = useCallback(() => {
    return window.sessionStorage.getItem(key) ?? JSON.stringify(initialValue);
  }, [key, initialValue]);

  const getServerSnapshot = useCallback(
    () => JSON.stringify(initialValue),
    [initialValue],
  );

  const raw = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  const value = JSON.parse(raw) as T;

  const setValue = useCallback(
    (next: T) => {
      window.sessionStorage.setItem(key, JSON.stringify(next));
      // dispara evento para o useSyncExternalStore reagir
      window.dispatchEvent(new Event('storage'));
    },
    [key],
  );

  return [value, setValue] as const;
}
