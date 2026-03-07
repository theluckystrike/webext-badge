import { describe, it, expect, vi, beforeEach } from "vitest";
import {
  setBadgeText, getBadgeText, setBadgeColor, getBadgeColor,
  setBadgeTextColor, setBadge, clearBadge, showCount, showStatus,
  flashBadge, COLORS,
} from "./index";

const globalAny = globalThis as any;

beforeEach(() => {
  vi.clearAllMocks();
  vi.useFakeTimers();
  globalAny.chrome = {
    action: {
      setBadgeText: vi.fn().mockResolvedValue(undefined),
      getBadgeText: vi.fn().mockResolvedValue("5"),
      setBadgeBackgroundColor: vi.fn().mockResolvedValue(undefined),
      getBadgeBackgroundColor: vi.fn().mockResolvedValue("#F44336"),
      setBadgeTextColor: vi.fn().mockResolvedValue(undefined),
    },
  };
});

describe("webext-badge", () => {
  it("sets badge text", async () => {
    await setBadgeText("Hi");
    expect(globalAny.chrome.action.setBadgeText).toHaveBeenCalledWith({ text: "Hi" });
  });

  it("sets badge text for specific tab", async () => {
    await setBadgeText("Tab", 42);
    expect(globalAny.chrome.action.setBadgeText).toHaveBeenCalledWith({ text: "Tab", tabId: 42 });
  });

  it("gets badge text", async () => {
    const text = await getBadgeText();
    expect(text).toBe("5");
  });

  it("sets badge color with hex string", async () => {
    await setBadgeColor("#FF0000");
    expect(globalAny.chrome.action.setBadgeBackgroundColor).toHaveBeenCalledWith({ color: "#FF0000" });
  });

  it("sets badge color with named color", async () => {
    await setBadgeColor("red");
    expect(globalAny.chrome.action.setBadgeBackgroundColor).toHaveBeenCalledWith({ color: COLORS.red });
  });

  it("sets badge color with RGBA tuple", async () => {
    await setBadgeColor([255, 0, 0, 255]);
    expect(globalAny.chrome.action.setBadgeBackgroundColor).toHaveBeenCalledWith({ color: [255, 0, 0, 255] });
  });

  it("gets badge color", async () => {
    const color = await getBadgeColor();
    expect(color).toBe("#F44336");
  });

  it("sets badge text color", async () => {
    await setBadgeTextColor("white");
    expect(globalAny.chrome.action.setBadgeTextColor).toHaveBeenCalledWith({ color: COLORS.white });
  });

  it("sets text and color together", async () => {
    await setBadge("New", "blue");
    expect(globalAny.chrome.action.setBadgeText).toHaveBeenCalledWith({ text: "New" });
    expect(globalAny.chrome.action.setBadgeBackgroundColor).toHaveBeenCalledWith({ color: COLORS.blue });
  });

  it("clears badge", async () => {
    await clearBadge();
    expect(globalAny.chrome.action.setBadgeText).toHaveBeenCalledWith({ text: "" });
  });

  it("shows count with red badge", async () => {
    await showCount(5);
    expect(globalAny.chrome.action.setBadgeText).toHaveBeenCalledWith({ text: "5" });
    expect(globalAny.chrome.action.setBadgeBackgroundColor).toHaveBeenCalledWith({ color: COLORS.red });
  });

  it("shows 999+ for large counts", async () => {
    await showCount(1500);
    expect(globalAny.chrome.action.setBadgeText).toHaveBeenCalledWith({ text: "999+" });
  });

  it("clears badge for zero count", async () => {
    await showCount(0);
    expect(globalAny.chrome.action.setBadgeText).toHaveBeenCalledWith({ text: "" });
  });

  it("shows success status", async () => {
    await showStatus("success");
    expect(globalAny.chrome.action.setBadgeText).toHaveBeenCalledWith({ text: "OK" });
    expect(globalAny.chrome.action.setBadgeBackgroundColor).toHaveBeenCalledWith({ color: COLORS.green });
  });

  it("shows error status with custom text", async () => {
    await showStatus("error", "X");
    expect(globalAny.chrome.action.setBadgeText).toHaveBeenCalledWith({ text: "X" });
  });

  it("flashes badge and clears after duration", async () => {
    const promise = flashBadge("!", "orange", 2000);
    expect(globalAny.chrome.action.setBadgeText).toHaveBeenCalledWith({ text: "!" });
    await vi.advanceTimersByTimeAsync(2000);
    await promise;
    expect(globalAny.chrome.action.setBadgeText).toHaveBeenCalledWith({ text: "" });
  });

  it("exports correct color constants", () => {
    expect(COLORS.red).toBe("#F44336");
    expect(COLORS.green).toBe("#4CAF50");
    expect(COLORS.blue).toBe("#2196F3");
  });
});
