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
): T => {
  try {
    const saved = getStorage(adapter).getItem(key);
    if (!saved) return fallback;

    const parsed: unknown = JSON.parse(saved);
    return validate(parsed) ? parsed : fallback;
  } catch {
    return fallback;
  }
};

export const writeStorage = <T>(
  key: string,
  value: T,
  adapter?: StorageAdapter,
): boolean => {
  try {
    getStorage(adapter).setItem(key, JSON.stringify(value));
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
