import { timeAgo } from "~/utils/time";
import { describe, it, expect } from "vitest";

describe("timeAgo", () => {
  it('should return "0 seconds ago" for a date that is now', () => {
    const now = new Date();
    const result = timeAgo(now);
    expect(result).toBe("0 seconds ago");
  });

  it('should return "1 second ago" for a date that is 1 second ago', () => {
    const now = new Date();
    const oneSecondAgo = new Date(now.getTime() - 1000);
    const result = timeAgo(oneSecondAgo);
    expect(result).toBe("1 second ago");
  });

  it('should return "2 seconds ago" for a date that is 2 seconds ago', () => {
    const now = new Date();
    const twoSecondsAgo = new Date(now.getTime() - 2000);
    const result = timeAgo(twoSecondsAgo);
    expect(result).toBe("2 seconds ago");
  });

  it('should return "1 minute ago" for a date that is 1 minute ago', () => {
    const now = new Date();
    const oneMinuteAgo = new Date(now.getTime() - 60 * 1000);
    const result = timeAgo(oneMinuteAgo);
    expect(result).toBe("1 minute ago");
  });

  it('should return "2 minutes ago" for a date that is 2 minutes ago', () => {
    const now = new Date();
    const twoMinutesAgo = new Date(now.getTime() - 2 * 60 * 1000);
    const result = timeAgo(twoMinutesAgo);
    expect(result).toBe("2 minutes ago");
  });

  it('should return "1 hour ago" for a date that is 1 hour ago', () => {
    const now = new Date();
    const oneHourAgo = new Date(now.getTime() - 60 * 60 * 1000);
    const result = timeAgo(oneHourAgo);
    expect(result).toBe("1 hour ago");
  });

  it('should return "2 hours ago" for a date that is 2 hours ago', () => {
    const now = new Date();
    const twoHoursAgo = new Date(now.getTime() - 2 * 60 * 60 * 1000);
    const result = timeAgo(twoHoursAgo);
    expect(result).toBe("2 hours ago");
  });

  it('should return "1 day ago" for a date that is 1 day ago', () => {
    const now = new Date();
    const oneDayAgo = new Date(now.getTime() - 24 * 60 * 60 * 1000);
    const result = timeAgo(oneDayAgo);
    expect(result).toBe("1 day ago");
  });

  it('should return "2 days ago" for a date that is 2 days ago', () => {
    const now = new Date();
    const twoDaysAgo = new Date(now.getTime() - 2 * 24 * 60 * 60 * 1000);
    const result = timeAgo(twoDaysAgo);
    expect(result).toBe("2 days ago");
  });
});
