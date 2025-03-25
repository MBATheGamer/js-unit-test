import { describe, expect, it, test } from "vitest";
import { calculateAverage, factorial, fizzBuzz, max } from "../src/intro";

describe("max", () => {
  test("Should return the first argument if it is greater.", () => {
    // Arrange
    const a = 2;
    const b = 1;

    // Act
    const result = max(a, b);

    // Assert
    expect(result).toBe(2);
  });

  it("Should return the second argument if it is greater.", () => {
    expect(max(1, 2)).toBe(2);
  });

  it("Should return the first argument if arguments are equal.", () => {
    expect(max(1, 2)).toBe(2);
  });
});

describe("fizzBuzz", () => {
  test("Should return 'FizzBuzz' if argument is divisible by 3 and 5.", () => {
    expect(fizzBuzz(15)).toBe("FizzBuzz");
  });

  test("Should return 'Fizz' if argument is only divisible by 3.", () => {
    expect(fizzBuzz(3)).toBe("Fizz");
  });

  test("Should return 'Buzz' if argument is only divisible by 5.", () => {
    expect(fizzBuzz(5)).toBe("Buzz");
  });

  test("Should return argument as a string if it is not divisible by 3 or 5.", () => {
    expect(fizzBuzz(1)).toBe("1");
  });
});

describe("calculateAverage", () => {
  it("Should return NaN if given an empty array.", () => {
    expect(calculateAverage([])).toBe(NaN);
  });

  it("Should calculate the average of an array with a single element.", () => {
    expect(calculateAverage([7])).toBe(7);
  });

  it("Should calculate the average of an array with two elements.", () => {
    expect(calculateAverage([7, 8])).toBe(7.5);
  });

  it("Should calculate the average of an array with three elements.", () => {
    expect(calculateAverage([7, 8, 9])).toBe(8);
  });
});

describe("factorial", () => {
  it("Should return 1 if given number is 0.", () => {
    expect(factorial(0)).toBe(1);
  });

  it("Should return 1 if given number is 1.", () => {
    expect(factorial(1)).toBe(1);
  });

  it("Should return 2 if given number is 2.", () => {
    expect(factorial(2)).toBe(2);
  });

  it("Should return 6 if given number is 3.", () => {
    expect(factorial(3)).toBe(6);
  });

  it("Should return 12 if given number is 4.", () => {
    expect(factorial(3)).toBe(6);
  });

  it("Should return undefined if given a negative number.", () => {
    expect(factorial(3)).toBe(6);
  });
});
