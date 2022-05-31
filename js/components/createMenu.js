import { getUsername } from "../utils/storage.js";
import logoutButton from "./logoutButton.js";

// create navbar.
export function createMenu() {
  const { pathname } = document.location;

  const container = document.querySelector(".nav-container");

  const username = getUsername();

  // auth link
  let authLink = `
  <li class="nav-item">
  <a href="login.html" class=" nav-link ${
    pathname === "/login.html" ? "active" : ""
  }">Login</a>  
  </li>`;

  // if user is logged in, display add.html and log out btn.
  if (username) {
    authLink = `<li class="nav-item">
      <a href="/add.html" class=" nav-link ${
        pathname === "/add.html" ? "active" : ""
      }">Add products</a>
      </li>
    <li class="nav-item"><a class="nav-link" id="logout">Logout ${username}</a></li>`;
  }

  // creating navbar
  container.innerHTML = `
  <nav class="navbar navbar-expand-md navbar-dark bg-dark">
  <div class="container-fluid">
    <a class="navbar-brand" href="index.html"><img src="images/Shoeshop_logo.png" alt="Shoeshop logo" class="logo"/></a>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo02" aria-controls="navbarTogglerDemo02" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarTogglerDemo02">
      <ul class="navbar-nav ms-auto">
      <li class="nav-item active">
      <a href="/" class=" nav-link ${
        pathname === "/" || pathname === "/index.html" ? "active" : ""
      }">Home</a>
      </li>
      <li class="nav-item">
      <a href="/products.html" class=" nav-link ${
        pathname === "/products.html" ? "active" : ""
      }">Products</a>
      </li>
      <li class="nav-item">
      <a href="/cart.html" class=" nav-link ${
        pathname === "/cart.html" ? "active" : ""
      }">Cart</a>
      </li>
      <li class="nav-item">
      ${authLink}
      </li>
      </ul>
    </div>
  </div>
</nav>`;

  logoutButton();
}
