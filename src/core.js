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
