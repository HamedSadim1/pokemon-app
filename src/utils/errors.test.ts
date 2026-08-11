import { describe, expect, it } from "vitest";
import axios from "axios";
import { getErrorMessage, isRequestCancellation } from "./errors";

describe("isRequestCancellation", () => {
  it("detects axios cancellations", () => {
    expect(isRequestCancellation(new axios.CanceledError("canceled"))).toBe(true);
  });

  it("detects abort and cancel errors", () => {
    expect(
      isRequestCancellation(new DOMException("aborted", "AbortError")),
    ).toBe(true);
    expect(isRequestCancellation({ name: "AbortError" })).toBe(true);
    expect(isRequestCancellation({ name: "CanceledError" })).toBe(true);
  });

  it("returns false for regular errors and other values", () => {
    expect(isRequestCancellation(new Error("temporary failure"))).toBe(false);
    expect(isRequestCancellation(null)).toBe(false);
    expect(isRequestCancellation("canceled")).toBe(false);
  });
});

describe("getErrorMessage", () => {
  it("extracts messages from errors and plain objects", () => {
    expect(getErrorMessage(new Error("boom"))).toBe("boom");
    expect(getErrorMessage({ message: "custom" })).toBe("custom");
  });

  it("returns an empty string for falsy values and a default otherwise", () => {
    expect(getErrorMessage(null)).toBe("");
    expect(getErrorMessage(undefined)).toBe("");
    expect(getErrorMessage(42)).toBe("Request failed");
    expect(getErrorMessage({ message: 42 })).toBe("Request failed");
  });
});
