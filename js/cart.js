import { getExistingProducts } from "./utils/productFunctions.js";
import { createMenu } from "./components/createMenu.js";
import clearButton from "./components/clearButton.js";
import { baseUrl } from "./data/api.js";
import formatPrice from "./components/formatPrice.js";

var cartProduct = getExistingProducts();
createMenu();
clearButton();

const productContainer = document.querySelector(".cart-content");
const cartTotal = document.querySelector(".cart-total");
// if there are no items in cart yet, display message
if (cartProduct.length === 0) {
  productContainer.innerHTML = "No products yet";
}
// create html of cart products
cartProduct.forEach((cart) => {
  productContainer.innerHTML += `
        <div class="card card-wrapper rounded-3 mb-4">
          <div class="card-body p-4">
            <div
              class="row d-flex justify-content-between align-items-center"
            >
              <div class="col-md-2 col-lg-2 col-xl-2">
                <img
                  src="${baseUrl + cart.image}"
                  class="img-fluid rounded-3 cart-img"
                  alt="${cart.name}"
                />
              </div>
              <div class="col-md-3 col-lg-3 col-xl-3">
                <p class="lead fw-normal mb-2">${cart.title}</p>
                <p><span class="text-muted">Size: </span>39</p>
              </div>
              <div class="col-md-3 col-lg-2 col-xl-2 offset-lg-1">
                <h5 class="mb-0">${formatPrice(cart.price)},-</h5>
              </div>
              <div class="col-md-1 col-lg-1 col-xl-1 text-end">
                <button class="remove-product" value="${
                  cart.id
                }"><i class="fas fa-trash fa-lg"></i></button>
              </div>
            </div>
          </div>
        </div>`;
});

document.querySelectorAll(".remove-product").forEach((item) => {
  item.addEventListener("click", removeProduct.bind(this, item.value));
});

function removeProduct(id) {
  cartProduct = cartProduct.filter((x) => {
    return x.id != id;
  });
  localStorage.setItem("cart", JSON.stringify(cartProduct));
  window.location.reload();
}

var total = 0;
cartProduct.forEach((item) => {
  var price = parseFloat(item.price);
  total = total + price;
});

if (total !== 0) {
  cartTotal.innerHTML += `
    <div>
    <span>Total: </span>
    <span>${formatPrice(total)},-</span>
    </div>
    `;
}
