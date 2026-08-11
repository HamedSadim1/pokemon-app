export const readStorage = <T>(
  key: string,
  fallback: T,
  validate: (value: unknown) => value is T,
): T => {
  try {
    const saved = window.localStorage.getItem(key);
    if (!saved) return fallback;

    const parsed: unknown = JSON.parse(saved);
    return validate(parsed) ? parsed : fallback;
  } catch {
    return fallback;
  }
};

export const writeStorage = <T>(key: string, value: T): void => {
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // Storage is optional; the in-memory state remains the source of truth.
  }
};
