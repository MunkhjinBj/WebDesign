import Travels, { travelLoader, applyFiltersFromURL } from "./filter.js";
import Cart, { renderCart } from "./cart.js";

document.addEventListener("DOMContentLoaded", async () => {
  const travelGrid = document.getElementById("travel-grid");
  const travels = await applyFiltersFromURL();

  travelGrid.insertAdjacentHTML(
    "beforeend",
    travels.map((t) => new Travels(t).render()).join("")
  );

  renderCart();
});
