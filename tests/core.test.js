import { describe, expect, it } from "vitest";
import {
  calculateDiscount,
  canDrive,
  fetchData,
  getCoupons,
  isPriceInRange,
  isValidUsername,
  validateUserInput,
} from "../src/core";

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

describe("calculateDiscount", () => {
  it("Should return discounted price if given valid code.", () => {
    expect(calculateDiscount(10, "SAVE10")).toBe(9);
    expect(calculateDiscount(10, "SAVE20")).toBe(8);
  });

  it("Should handle non-numeric price.", () => {
    const result = calculateDiscount("10", "SAVE10");

    expect(result).toMatch(/invalid price/i);
  });

  it("Should handle negative price.", () => {
    const result = calculateDiscount(-10, "SAVE10");

    expect(result).toMatch(/invalid price/i);
  });

  it("Should handle non-string discount code.", () => {
    const result = calculateDiscount(10, 10);

    expect(result).toMatch(/invalid discount/i);
  });

  it("Should handle invalid discount code.", () => {
    const result = calculateDiscount(10, "INVALID");

    expect(result).toBe(10);
  });
});

describe("validateUserInput", () => {
  it("Should return success if given valid input.", () => {
    const valid = validateUserInput("MBATheGamer", 30);

    expect(valid).toMatch(/success/i);
  });

  it("Should return an error if username is not a string.", () => {
    const valid = validateUserInput(30, 30);

    expect(valid).toMatch(/invalid username/i);
  });

  it("Should return an error if username is less then 3 characters.", () => {
    const valid = validateUserInput("MB", 30);

    expect(valid).toMatch(/invalid username/i);
  });

  it("Should return an error if username is longer then 255 characters.", () => {
    const valid = validateUserInput("M".repeat(256), 30);

    expect(valid).toMatch(/invalid username/i);
  });

  it("Should return an error if age is not a number.", () => {
    const valid = validateUserInput("MBATheGamer", "30");

    expect(valid).toMatch(/invalid age/i);
  });

  it("Should return an error if age is less then 18.", () => {
    const valid = validateUserInput("MBATheGamer", 17);

    expect(valid).toMatch(/invalid age/i);
  });

  it("Should return an error if age is greater then 100.", () => {
    const valid = validateUserInput("MBATheGamer", 101);

    expect(valid).toMatch(/invalid age/i);
  });

  it("Should return an error if both username and age are invalid.", () => {
    const valid = validateUserInput("", 0);

    expect(valid).toMatch(/invalid username/i);
    expect(valid).toMatch(/invalid age/i);
  });
});

describe("isPriceInRange", () => {
  it("Should return false when the price is outside the range.", () => {
    expect(isPriceInRange(-1, 0, 100)).toBe(false);
    expect(isPriceInRange(101, 0, 100)).toBe(false);
  });

  it("Should return true when the price is equal to the min or to the max.", () => {
    expect(isPriceInRange(0, 0, 100)).toBe(true);
    expect(isPriceInRange(100, 0, 100)).toBe(true);
  });

  it("Should return true when the price is within the range.", () => {
    expect(isPriceInRange(50, 0, 100)).toBe(true);
  });
});

describe("isValidUsername", () => {
  const constraints = {
    min: 5,
    max: 15,
  };
  it("Should return false when username is too short.", () => {
    expect(isValidUsername("M".repeat(constraints.min - 1))).toBe(false);
  });

  it("Should return false when username is too long.", () => {
    expect(isValidUsername("M".repeat(constraints.max + 1))).toBe(false);
  });

  it("Should return true when the username is at the min or max length", () => {
    expect(isValidUsername("M".repeat(constraints.min))).toBe(true);
    expect(isValidUsername("M".repeat(constraints.max))).toBe(true);
  });

  it("Should return true when the username is within the length constraints.", () => {
    expect(isValidUsername("MBATheGamer")).toBe(true);
  });

  it("Should return false for invalid input types", () => {
    expect(isValidUsername(null)).toBe(false);
    expect(isValidUsername(undefined)).toBe(false);
    expect(isValidUsername(1)).toBe(false);
  });
});

describe("canDrive", () => {
  it("Should return an error for invalid country code.", () => {
    expect(canDrive(16, "UZ")).toMatch(/invalid/i);
  });

  it("Should return false for underage in the US.", () => {
    expect(canDrive(15, "US")).toBe(false);
  });

  it("Should return true for min age in the US.", () => {
    expect(canDrive(16, "US")).toBe(true);
  });

  it("Should return true for eligible in the US.", () => {
    expect(canDrive(17, "US")).toBe(true);
  });

  it("Should return false for underage in the UK.", () => {
    expect(canDrive(16, "UK")).toBe(false);
  });

  it("Should return true for min age in the UK.", () => {
    expect(canDrive(17, "UK")).toBe(true);
  });

  it("Should return true for eligible in the UK.", () => {
    expect(canDrive(18, "UK")).toBe(true);
  });
});

describe("canDrive with each", () => {
  it.each([
    { age: 15, country: "US", result: false },
    { age: 16, country: "US", result: true },
    { age: 17, country: "US", result: true },
    { age: 16, country: "UK", result: false },
    { age: 17, country: "UK", result: true },
    { age: 18, country: "UK", result: true },
  ])("Should return $result for $age, $country", ({ age, country, result }) => {
    expect(canDrive(age, country)).toBe(result);
  });

  it("Should return an error for invalid country code.", () => {
    expect(canDrive(16, "UZ")).toMatch(/invalid/i);
  });
});

describe("isPriceInRange with parameterized test", () => {
  it.each([
    {
      scenario: "the price is outside the range",
      price: -1,
      min: 0,
      max: 100,
      result: false,
    },
    {
      scenario: "the price is outside the range",
      price: 101,
      min: 0,
      max: 100,
      result: false,
    },
    {
      scenario: "the price is equal to the min",
      price: 0,
      min: 0,
      max: 100,
      result: true,
    },
    {
      scenario: "the price is equal to the max.",
      price: 100,
      min: 0,
      max: 100,
      result: true,
    },
    {
      scenario: "the price is within the range",
      price: 50,
      min: 0,
      max: 100,
      result: true,
    },
  ])("Should return $result when $scenario", ({ price, min, max, result }) => {
    expect(isPriceInRange(price, min, max)).toBe(result);
  });
});

describe("fetchData", () => {
  it("Should return a promise that will resolve to an array of numbers", () => {
    fetchData().then(result => {
      expect(Array.isArray(result)).toBe(true);
      expect(result.length).toBeGreaterThan(0);
    });
  });

  it("Should return a promise that will resolve to an array of numbers with async-await", async () => {
    const result = await fetchData();
    expect(Array.isArray(result)).toBe(true);
    expect(result.length).toBeGreaterThan(0);
  });
});
