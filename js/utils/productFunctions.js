export function getExistingProducts() {
  const products = localStorage.getItem("cart");

  if (!products) {
    return [];
  } else {
    return JSON.parse(products);
  }
}
