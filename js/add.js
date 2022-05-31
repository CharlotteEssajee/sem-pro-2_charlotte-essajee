import displayMessage from "./components/displayMessage.js";
import { createMenu } from "./components/createMenu.js";
import { getToken } from "./utils/storage.js";
import { baseUrl } from "./data/api.js";

const token = getToken();

if (!token) {
  location.href = "/";
}

createMenu();

const form = document.querySelector("form");
const title = document.querySelector("#title");
const price = document.querySelector("#price");
const image = document.querySelector("#image");
const featured = document.querySelector("#featured");
const description = document.querySelector("#description");
const message = document.querySelector(".message-container");

form.addEventListener("submit", submitForm);

function submitForm(event) {
  event.preventDefault();

  message.innerHTML = "";

  const titleValue = title.value.trim();
  const priceValue = price.value.trim();
  const descriptionValue = description.value.trim();
  // grab the files array from our "image" query selector
  const imageValue = image.files;

  var featuredValue = false;
  if (featured.checked) {
    featuredValue = true;
  }

  // values of the different inputs must be more than one letter.
  if (
    titleValue.length === 0 ||
    priceValue.length === 0 ||
    descriptionValue.length === 0 ||
    // check the length of our image array, making sure there's at least 1
    imageValue.length === 0
  ) {
    return displayMessage(
      "warning",
      "New values must be at least 1 character for each input",
      ".message-container"
    );
  }

  addProduct(
    titleValue,
    priceValue,
    descriptionValue,
    imageValue,
    featuredValue
  );
}

async function addProduct(title, price, description, image, featured) {
  const url = baseUrl + "/products";
  // new products with images requires to be sent with FormData, let's initialize an instance of it
  const formData = new FormData();

  // removing "image" property from our original data variable
  // tip: any matching prop+values can always be shortened to only 1. For example { title: title, price: price } becomes { title, price }
  const data = JSON.stringify({ title, price, description, featured });

  // the images we are uploading needs to be prefixed with "files". Anything after that has to be unique for each image.
  // since we're uploading a single image, this can be hard-coded like this:
  formData.append("files.image", image[0]);
  // let's also append our stringified data to the FormData we're POSTing
  formData.append("data", data);

  const options = {
    method: "POST",
    // replace "data" with "formData" which is the name of our initialized FormData.
    body: formData,
    headers: {
      // removing the "Content-Type" header to let it inherit the header automatically.
      Authorization: `Bearer ${token}`,
    },
  };

  try {
    const response = await fetch(url, options);
    const json = await response.json();

    // success message
    if (json.created_at) {
      displayMessage("success", "Product created", ".message-container");
      form.reset();
    }

    // error message
    if (json.error) {
      displayMessage("error", json.message, ".message-container");
    }

    console.log(json);
  } catch (error) {
    console.log(error);
    displayMessage("error", "An error occured", ".message-container");
  }
}
