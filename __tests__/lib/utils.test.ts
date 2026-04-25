import {
  formatCurrency,
  formatStatusLabel,
  formatSubscriptionDateTime,
} from "@/lib/utils";

describe("formatCurrency", () => {
  it("formats a USD amount with $ symbol and two decimal places", () => {
    expect(formatCurrency(9.99)).toBe("$9.99");
  });

  it("formats a larger amount with correct grouping", () => {
    expect(formatCurrency(2489.48)).toBe("$2,489.48");
  });

  it("formats zero correctly", () => {
    expect(formatCurrency(0)).toBe("$0.00");
  });

  it("formats an amount with .00 decimals explicitly", () => {
    expect(formatCurrency(20.0)).toBe("$20.00");
  });

  it("uses USD as default currency when no currency is provided", () => {
    expect(formatCurrency(5.99)).toBe("$5.99");
  });

  it("formats with an explicit USD currency argument", () => {
    expect(formatCurrency(12.0, "USD")).toBe("$12.00");
  });

  it("formats with EUR currency", () => {
    const result = formatCurrency(15.0, "EUR");
    expect(result).toContain("15.00");
    expect(result).toContain("€");
  });

  it("formats negative amounts correctly", () => {
    expect(formatCurrency(-5.5)).toBe("-$5.50");
  });

  it("rounds values to exactly 2 decimal places", () => {
    expect(formatCurrency(1.005)).toBe("$1.01");
  });

  it("falls back to toFixed(2) for an invalid currency code", () => {
    // Intl.NumberFormat will throw for an invalid currency, triggering the catch
    const result = formatCurrency(42.5, "INVALID_CURRENCY");
    expect(result).toBe("42.50");
  });

  it("formats large numbers with proper comma grouping", () => {
    expect(formatCurrency(1234567.89)).toBe("$1,234,567.89");
  });
});

describe("formatSubscriptionDateTime", () => {
  it("returns 'Not provided' when no value is passed", () => {
    expect(formatSubscriptionDateTime(undefined)).toBe("Not provided");
  });

  it("returns 'Not provided' when an empty string is passed", () => {
    expect(formatSubscriptionDateTime("")).toBe("Not provided");
  });

  it("formats a valid ISO date string as MM/DD/YYYY", () => {
    expect(formatSubscriptionDateTime("2026-03-20T10:00:00.000Z")).toBe(
      "03/20/2026",
    );
  });

  it("formats another valid ISO date string correctly", () => {
    expect(formatSubscriptionDateTime("2024-11-24T10:00:00.000Z")).toBe(
      "11/24/2024",
    );
  });

  it("formats a date with single-digit month and day", () => {
    expect(formatSubscriptionDateTime("2025-03-05T00:00:00.000Z")).toBe(
      "03/05/2025",
    );
  });

  it("returns 'Not provided' for an invalid date string", () => {
    expect(formatSubscriptionDateTime("not-a-date")).toBe("Not provided");
  });

  it("returns 'Not provided' for a nonsense string", () => {
    expect(formatSubscriptionDateTime("hello world")).toBe("Not provided");
  });

  it("handles a date string in YYYY-MM-DD format", () => {
    const result = formatSubscriptionDateTime("2026-04-02");
    expect(result).toBe("04/02/2026");
  });
});

describe("formatStatusLabel", () => {
  it("returns 'Unknown' when no value is passed", () => {
    expect(formatStatusLabel(undefined)).toBe("Unknown");
  });

  it("returns 'Unknown' when an empty string is passed", () => {
    expect(formatStatusLabel("")).toBe("Unknown");
  });

  it("capitalizes the first letter of 'active'", () => {
    expect(formatStatusLabel("active")).toBe("Active");
  });

  it("capitalizes the first letter of 'paused'", () => {
    expect(formatStatusLabel("paused")).toBe("Paused");
  });

  it("capitalizes the first letter of 'cancelled'", () => {
    expect(formatStatusLabel("cancelled")).toBe("Cancelled");
  });

  it("preserves an already-capitalized value", () => {
    expect(formatStatusLabel("Active")).toBe("Active");
  });

  it("capitalizes a single character string", () => {
    expect(formatStatusLabel("a")).toBe("A");
  });

  it("does not alter the rest of the string after the first character", () => {
    expect(formatStatusLabel("PENDING")).toBe("PENDING");
  });

  it("handles mixed-case input by only capitalizing the first character", () => {
    expect(formatStatusLabel("trialing")).toBe("Trialing");
  });
});