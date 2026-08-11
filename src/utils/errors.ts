import axios from "axios";
import { ERROR_CONFIG } from "../config";
import { isRecord } from "./validation";

export const isRequestCancellation = (error: unknown): boolean => {
  if (axios.isCancel(error)) return true;
  return (
    isRecord(error) &&
    "name" in error &&
    (ERROR_CONFIG.cancellationNames as readonly string[]).includes(
      (error as { name?: unknown }).name as string,
    )
  );
};

export const getErrorMessage = (error: unknown): string => {
  if (!error) return "";
  if (error instanceof Error) return error.message;
  if (isRecord(error) && typeof error.message === "string") return error.message;
  return ERROR_CONFIG.defaultMessage;
};
