import { getExistingProducts } from "../utils/productFunctions.js";

export default function clearButton() {
    const clearProducts = document.querySelector("#clear");

    clearProducts.addEventListener("click", clearList);

    function clearList() {
        if (confirm("Are you sure that you want to clear the whole cart?")) {
            localStorage.removeItem("cart");
            getExistingProducts([]);
        } else {
            null;
        }
    }
}
