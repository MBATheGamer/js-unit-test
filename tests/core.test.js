import { describe, expect } from "vitest";

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
