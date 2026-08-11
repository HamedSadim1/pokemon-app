export interface StorageAdapter {
  getItem: (key: string) => string | null;
  setItem: (key: string, value: string) => void;
}

const browserStorage: StorageAdapter = {
  getItem: (key) => window.localStorage.getItem(key),
  setItem: (key, value) => window.localStorage.setItem(key, value),
};

const getStorage = (adapter?: StorageAdapter): StorageAdapter =>
  adapter || browserStorage;

const rawFallbackReadCache = new WeakMap<StorageAdapter, Map<string, unknown>>();

export const readRawStorage = (
  key: string,
  fallback: string | null = null,
  adapter?: StorageAdapter,
): string | null => {
  try {
    return getStorage(adapter).getItem(key) ?? fallback;
  } catch {
    return fallback;
  }
};

export const readStorage = <T>(
  key: string,
  fallback: T,
  validate: (value: unknown) => value is T,
  adapter?: StorageAdapter,
  fallbackFromRaw?: (rawValue: string | null) => T,
): T => {
  const storage = getStorage(adapter);
  const cachedFallbackRead = fallbackFromRaw
    ? rawFallbackReadCache.get(storage)
    : undefined;

  if (cachedFallbackRead?.has(key)) {
    return cachedFallbackRead.get(key) as T;
  }

  let saved: string | null = null;
  const resolveFallback = () => fallbackFromRaw ? fallbackFromRaw(saved) : fallback;
  let value: T;
  let readSucceeded = false;

  try {
    saved = storage.getItem(key);
    readSucceeded = true;
    if (!saved) {
      value = resolveFallback();
    } else {
      const parsed: unknown = JSON.parse(saved);
      value = validate(parsed) ? parsed : resolveFallback();
    }
  } catch {
    value = readSucceeded ? resolveFallback() : fallback;
  }

  if (fallbackFromRaw && readSucceeded) {
    const cache = cachedFallbackRead || new Map<string, unknown>();
    cache.set(key, value);
    rawFallbackReadCache.set(storage, cache);
  }

  return value;
};

export const writeStorage = <T>(
  key: string,
  value: T,
  adapter?: StorageAdapter,
): boolean => {
  const storage = getStorage(adapter);

  try {
    storage.setItem(key, JSON.stringify(value));
    rawFallbackReadCache.get(storage)?.delete(key);
    return true;
  } catch {
    return false;
  }
};

export const createMemoryStorage = (
  initialValues: Record<string, string> = {},
): StorageAdapter & { values: Map<string, string> } => {
  const values = new Map(Object.entries(initialValues));

  return {
    values,
    getItem: (key) => values.get(key) ?? null,
    setItem: (key, value) => values.set(key, value),
  };
};
