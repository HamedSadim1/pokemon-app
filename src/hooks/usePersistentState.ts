import { useCallback, useEffect, useState } from "react";
import {
  readStorage,
  writeStorage,
  type StorageAdapter,
} from "@/utils";

export const usePersistentState = <T>(
  key: string,
  fallback: T,
  validate: (value: unknown) => value is T,
  adapter?: StorageAdapter,
  fallbackFromRaw?: (rawValue: string | null) => T,
) => {
  const [value, setValue] = useState<T>(() =>
    readStorage(key, fallback, validate, adapter, fallbackFromRaw),
  );

  const updateValue = useCallback(
    (nextValue: T | ((previous: T) => T)) => {
      setValue(nextValue);
    },
    [],
  );

  useEffect(() => {
    writeStorage(key, value, adapter);
  }, [adapter, key, value]);

  return [value, updateValue] as const;
};
