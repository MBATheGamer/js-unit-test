import { describe, expect, it } from "vitest";
import { getCoupons } from "../src/core";

describe("test suite", () => {
  it("test case: string", () => {
    const result = "The requested file was not found.";

    // Loose (too general)
    expect(result).toBeDefined();

    // Tight (too specific)
    // May cause errors
    expect(result).toBe("The requested file was not found.");

    // Better assertion
    expect(result).toMatch(/not found/i);
  });

  it("test case: array", () => {
    const result = [1, 2, 3];

    // Loose (too general)
    expect(result).toBeDefined();

    // Tight (too specific)
    // May cause errors
    expect(result).toEqual([1, 2, 3]);
    // or
    expect(result).toHaveLength(3);

    // Better assertion
    expect(result).toEqual(expect.arrayContaining([1, 2, 3]));
    // or
    expect(result.length).toBeGreaterThan(0);
  });

  it("test case: object", () => {
    const result = { name: "MBATheGamer" };

    // Loose (too general)
    expect(result).toBeDefined();

    // Tight (too specific)
    // May cause errors
    expect(result).toEqual({ name: "MBATheGamer" });

    // Better assertion
    expect(result).toMatchObject({ name: "MBATheGamer" });
    // or
    expect(result).toHaveProperty("name");
    // or
    expect(typeof result.name).toBe("string");
  });
});

describe("getCoupons", () => {
  it("Should return an array of coupons.", () => {
    const coupons = getCoupons();

    expect(Array.isArray(coupons)).toBe(true);

    expect(coupons.length).toBeGreaterThan(0);
  });

  it("Should return an array with valid coupon codes.", () => {
    const coupons = getCoupons();

    coupons.forEach(coupon => {
      expect(coupon).toHaveProperty("code");
      expect(typeof coupon.code).toBe("string");
      expect(coupon.code).toBeTruthy();
    });
  });

  it("Should return an array with valid discounts.", () => {
    const coupons = getCoupons();

    coupons.forEach(coupon => {
      expect(coupon).toHaveProperty("discount");
      expect(typeof coupon.discount).toBe("number");
      expect(coupon.discount).toBeGreaterThan(0);
      expect(coupon.discount).toBeLessThan(1);
    });
  });
});
