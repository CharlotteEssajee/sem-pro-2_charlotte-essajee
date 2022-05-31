import { getExistingProducts } from "../utils/productFunctions.js";

export default function addToCart() {
  const id = this.dataset.id;
  const title = this.dataset.title;
  const price = this.dataset.price;
  const image = this.dataset.src;

  const currentProducts = getExistingProducts();

  const productExists = currentProducts.find(function (product) {
    return product.id === id;
  });

  if (productExists === undefined) {
    const product = { id, title, price, image };
    currentProducts.push(product);
    saveProducts(currentProducts);
  } else {
    alert("The product is already in the cart");
  }
}

// save products in localstorage
function saveProducts(products) {
  localStorage.setItem("cart", JSON.stringify(products));
}
