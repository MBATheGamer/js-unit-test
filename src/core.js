// Exercise: Writing good assertions
export function getCoupons() {
  return [
    { code: "SAVE20NOW", discount: 0.2 },
    { code: "DISCOUNT50OFF", discount: 0.5 },
  ];
}

// Lesson: Positive and negative testing
export function calculateDiscount(price, discountCode) {
  if (typeof price !== "number" || price <= 0) {
    return "Invalid price";
  }

  if (typeof discountCode !== "string") {
    return "Invalid discount code";
  }

  let discount = 0;
  if (discountCode === "SAVE10") {
    discount = 0.1;
  } else if (discountCode === "SAVE20") {
    discount = 0.2;
  }

  return price - price * discount;
}

// Exercise: Positive and negative testing
export function validateUserInput(username, age) {
  let errors = [];

  if (
    typeof username !== "string" ||
    username.length < 3 ||
    username.length > 255
  ) {
    errors.push("Invalid username");
  }

  if (typeof age !== "number" || age < 18 || age > 100) {
    errors.push("Invalid age");
  }

  return errors.length === 0 ? "Validation successful" : errors.join(", ");
}

// Lesson: Boundary testing
export function isPriceInRange(price, min, max) {
  return price >= min && price <= max;
}

// Exercise: Boundary testing
export function isValidUsername(username) {
  const minLength = 5;
  const maxLength = 15;

  if (!username) {
    return false;
  }

  return username.length >= minLength && username.length <= maxLength;
}

// Exercise: Boundary testing
export function canDrive(age, countryCode) {
  const legalDrivingAge = {
    US: 16,
    UK: 17,
  };

  if (!legalDrivingAge[countryCode]) {
    return "Invalid country code";
  }

  return age >= legalDrivingAge[countryCode];
}
