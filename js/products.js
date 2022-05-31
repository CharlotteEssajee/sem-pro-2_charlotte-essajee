import { getExistingProducts } from "./utils/productFunctions.js";
import { baseUrl } from "./data/api.js";
import { createMenu } from "./components/createMenu.js";
import { doFetch } from "./data/doFetch.js";
import formatPrice from "./components/formatPrice.js";
import addToCart from "./components/addToCart.js";

const productUrl = baseUrl + "/products";
createMenu();

let mainProducts = [];
const productContainer = document.querySelector(".product-container");
const cartProduct = getExistingProducts();
const search = document.querySelector(".search");

// search filter function
search.onkeyup = function (event) {
  const searchValue = event.target.value.trim().toLowerCase();
  const filteredProducts = mainProducts.filter(function (product) {
    if (product.title.toLowerCase().includes(searchValue)) {
      return true;
    }
    if (product.description.toLowerCase().includes(searchValue)) {
      return true;
    }
  });
  generateHtml(filteredProducts);
};

export function generateHtml(product) {
  productContainer.innerHTML = "";
  product.forEach((product) => {
    // create cards
    productContainer.innerHTML += `
    <div class="col-12 col-md-6 col-lg-4">
    <div class="card">
        <div class="card-body">
            <div class="product">
              <a href="detail.html?id=${product.id}">  
              <img src="${
                baseUrl + product.image.url
              }" class="card-img-top" alt="${product.name}">
                <h3>${product.title}</h3>
                <p class="card-author">${formatPrice(product.price)},-</p>
                <p style="display:none">${product.description}</p>
              </a>
              <button class="btn btn-primary add-to-cart" type="button" data-id="${
                product.id
              }" data-title="${product.title}" data-price="${
      product.price
    }" data-src="${product.image.url}">
                Add to cart
              </button>
            </div>
        </div>
      </div>
      </div>`;
  });

  const productButtons = document.querySelectorAll("button.add-to-cart");

  // click event for i element
  productButtons.forEach((button) => {
    button.addEventListener("click", addToCart);
  });
}

async function init() {
  console.log("init called");
  mainProducts = await doFetch(productUrl);
  generateHtml(mainProducts);
}

init();
