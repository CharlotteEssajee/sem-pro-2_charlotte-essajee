import { baseUrl } from "./data/api.js";
import { createMenu } from "./components/createMenu.js";
import { getToken } from "./utils/storage.js";
import deleteButton from "./components/products/deleteButton.js";
import displayMessage from "./components/displayMessage.js";

const token = getToken();

if (!token) {
  location.href = "/";
}

createMenu();

const queryString = document.location.search;
const params = new URLSearchParams(queryString);
const id = params.get("id");

if (!id) {
  document.location.href = "/";
}

// url to access detail page
const productUrl = baseUrl + "/products/" + id;

const form = document.querySelector("form");
const title = document.querySelector("#title");
const price = document.querySelector("#price");
const image = document.querySelector("#image");
const featured = document.querySelector("#featured");
const idInput = document.querySelector("#id");
const description = document.querySelector("#description");
const message = document.querySelector(".message-container");
const loading = document.querySelector(".loading");

(async function () {
  try {
    const response = await fetch(productUrl);
    const product = await response.json();

    title.value = product.title;
    price.value = product.price;
    description.value = product.description;
    idInput.value = product.id;

    if (product.featured) {
      featured.checked = true;
    }

    deleteButton(product.id);

    console.log(product);
  } catch (error) {
    console.log(error);
  } finally {
    loading.style.display = "none";
    form.style.display = "block";
  }
})();

form.addEventListener("submit", submitForm);

async function submitForm(e) {
  e.preventDefault();

  const response = await fetch(productUrl);
  const product = await response.json();

  message.innerHTML = "";

  const titleValue = title.value.trim();
  const priceValue = price.value.trim();
  const descriptionValue = description.value.trim();
  const featuredValue = featured.checked;
  var imageValue = product.image;

  if (image.files.length !== 0) {
    var imageValue = image.files;
  }

  // values of the different inputs must be more than one letter.
  if (
    titleValue.length === 0 ||
    priceValue.length === 0 ||
    descriptionValue.length === 0
  ) {
    return displayMessage(
      "warning",
      "New values must be at least 1 character for each input",
      ".message-container"
    );
  }

  updateProduct(
    titleValue,
    priceValue,
    descriptionValue,
    featuredValue,
    imageValue
  );
}

async function updateProduct(title, price, description, featured, image) {
  const url = baseUrl + "/products/" + id;
  const formData = new FormData();

  const data = JSON.stringify({
    id,
    title,
    price,
    description,
    featured,
    image,
  });

  formData.append("files.image", image[0]);
  formData.append("data", data);

  const options = {
    method: "PUT",
    body: formData,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  try {
    const response = await fetch(url, options);
    const json = await response.json();
    console.log(json);

    // success message
    if (json.updated_at) {
      displayMessage("success", "Product updated", ".message-container");
    }

    // error message
    if (json.error) {
      displayMessage("error", json.message, ".message-container");
    }
  } catch (error) {
    console.log(error);
  }
}
