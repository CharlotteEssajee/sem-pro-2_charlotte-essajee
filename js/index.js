import { baseUrl } from "./data/api.js";
import { createMenu } from "./components/createMenu.js";
import { doFetch } from "./data/doFetch.js";
import formatPrice from "./components/formatPrice.js";
import addToCart from "./components/addToCart.js";

const productUrl = baseUrl + "/products";
const heroUrl = baseUrl + "/home";
createMenu();

let mainProducts = [];
let mainHero = [];
const productContainer = document.querySelector(".product-container");
const heroContainer = document.querySelector(".hero-cover");

// get hero image
function getHeader(home) {
  heroContainer.innerHTML += `<div class="hero">
    <img src="${
      baseUrl + home.hero_banner.formats.medium.url
    }" class="hero-img" alt="${home.title}">
  </div>`;
}

export function generateHtml(product) {
  productContainer.innerHTML = "";
  product.forEach((product) => {
    // create cards

    console.log(product);

    if (product.featured === true) {
      productContainer.innerHTML += `
            <div class="col-12 col-md-6 col-lg-4">
                <div class="card">
                    <img src="${
                      baseUrl + product.image.url
                    }" class="card-img-top" alt="${product.title}">
                    <div class="card-body">
                        <div class="product">
                        <a href="detail.html?id=${product.id}">
                            <h3 class="card-title">${product.title}</h3>
                            <p class="card-author">${formatPrice(
                              product.price
                            )},-</p>
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
            </div>
            `;
    }
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
  mainHero = await doFetch(heroUrl);
  generateHtml(mainProducts);
  getHeader(mainHero);
  console.log(mainProducts);
}

init();
