import displayMessage from "./components/displayMessage.js";
import { createMenu } from "./components/createMenu.js";
import { baseUrl } from "./data/api.js";
import formatPrice from "./components/formatPrice.js";
import addToCart from "./components/addToCart.js";
import { getUsername } from "./utils/storage.js";

createMenu();

const queryString = document.location.search;
const params = new URLSearchParams(queryString);
const id = params.get("id");
const username = getUsername();

if (!id) {
    document.location.href = "/";
}

// url for product details.
const productUrl = baseUrl + "/products/" + id;

// create HTML.
(async function () {
    try {
        const response = await fetch(productUrl);
        const details = await response.json();

        const container = document.querySelector(".detail-container");

        var editButton = "";

        if (username) {
            editButton = `<button class="btn btn-primary edit-btn" type="button" onclick="location.href='edit.html?id=${details.id}'">Edit product</button>`;
        };

        container.innerHTML = ` 
      <div class="product-detail">
        <div class="detail-image">
        <img src="${baseUrl + details.image.url}" class="card-img-top" alt="${
            details.name
        }">
        </div>
        <div class="product-text">
          <h1 class="detail-title">${details.title}</h1>
          <p>${formatPrice(details.price)},-</p>
          <p class="subtitle">${details.description}</p>
          <button class="btn btn-primary add-to-cart" type="button" data-id="${
            details.id
          }" data-title="${details.title}" data-price="${
            details.price
        }" data-src="${details.image.url}">
            Add to cart
          </button>
          ${editButton}
        </div>
      </div>
      `;

        const productButtons = document.querySelectorAll("button.add-to-cart");

        // click event for i element
        productButtons.forEach((button) => {
            button.addEventListener("click", addToCart);
        });
    } catch (error) {
        displayMessage("error", error, ".detail-container");
    }
})();

async function changeTitle() {
    try {
        const responsePost = await fetch(productUrl);
        const details = await responsePost.json();

        document.querySelector("title").innerHTML =
            details.title + " | Shoeshop";
    } catch (error) {
        console.log("error", error);
    }
}

async function changeMeta() {
    try {
        const responsePost = await fetch(productUrl);
        const details = await responsePost.json();

        var description = details.description;
        var length = 150;
        var seo_description = description.substring(0, length);

        document
            .querySelector('meta[name="description"]')
            .setAttribute("content", seo_description + "...");
    } catch (error) {
        console.log("error", error);
    }
}

changeTitle();
changeMeta();
