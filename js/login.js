import { saveToken, saveUser } from "./utils/storage.js";
import { baseUrl } from "./data/api.js";
import { createMenu } from "./components/createMenu.js";
import displayMessage from "./components/displayMessage.js";

const form = document.querySelector("form");
const username = document.querySelector("#username");
const password = document.querySelector("#password");
const message = document.querySelector(".message-container");

// call/add navbar.
createMenu();

form.addEventListener("submit", submitForm);

function submitForm(event) {
  event.preventDefault();

  message.innerHTML = "";

  const usernameValue = username.value.trim();
  const passwordValue = password.value.trim();

  // display warning message if username or password length = 0.
  if (usernameValue.length === 0 || passwordValue.length === 0) {
    return displayMessage("warning", "Invalid values", ".message-container");
  }

  doLogin(usernameValue, passwordValue);
}

async function doLogin(username, password) {
  // url required to login.
  const url = baseUrl + "/auth/local";

  const data = JSON.stringify({ identifier: username, password: password });

  const options = {
    method: "POST",
    body: data,
    headers: {
      "Content-Type": "application/json",
    },
  };

  try {
    const response = await fetch(url, options);
    const json = await response.json();

    if (json.user) {
      saveToken(json.jwt);
      saveUser(json.user);

      // if user has successfully logged in redirect to index.
      location.href = "/";
    }

    // if login fails, display warning message.
    if (json.error) {
      displayMessage("warning", "Invalid login details", ".message-container");
    }
  } catch (error) {}
}
