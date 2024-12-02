import Travels, { travelLoader, applyFiltersFromURL, renderFilters } from "./filter.js";
import Cart, { renderCart } from "./cart.js";

document.addEventListener("DOMContentLoaded", async () => {
  const travelGrid = document.getElementById("travel-grid");
  const travels = await applyFiltersFromURL();

  // Render travel items
  travelGrid.innerHTML = travels.map((t) => new Travels(t).render()).join("");

  // Render filters
  await renderFilters();

  // Add event listener for filter changes
  document.querySelectorAll(".filter-types, .filter-days").forEach(checkbox => {
    checkbox.addEventListener("change", async () => {
      const travels = await applyFiltersFromURL();
      travelGrid.innerHTML = travels.map((t) => new Travels(t).render()).join("");
    });
  });

  // Render the cart
  renderCart();
});
