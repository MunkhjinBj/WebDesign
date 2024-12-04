import Travels, {
  travelLoader,
  applyFiltersFromURL,
  renderFilters,
} from "./filter.js";
import Cart, { renderCart } from "./cart.js";

document.addEventListener("DOMContentLoaded", async () => {
  const travelGrid = document.getElementById("travel-grid");

  // Load and render filter options
  await renderFilters();

  // Render the initial travel grid with no filters (or based on URL filters)
  const travels = await applyFiltersFromURL();
  travelGrid.innerHTML = travels.map((t) => new Travels(t).render()).join("");

  // Apply Filters button logic
  document
    .getElementById("apply-filters")
    .addEventListener("click", async () => {
      const travels = await applyFiltersFromURL(); // Apply filters based on selected checkboxes
      travelGrid.innerHTML = travels
        .map((t) => new Travels(t).render())
        .join("");
    });

  // Add event listener for filter changes (if you want them to update live)
  document
    .querySelectorAll(
      ".filter-types, .filter-days, .filter-season, .filter-ageGroup"
    )
    .forEach((checkbox) => {
      checkbox.addEventListener("change", () => {
        // Optionally, you can add some live update logic here if needed
      });
    });

  // Clear Filters button logic
  document.getElementById("clear-filters").addEventListener("click", () => {
    // Uncheck all filters
    document
      .querySelectorAll(".filter-group input")
      .forEach((input) => (input.checked = false));

    // Reload all travels without filters
    window.location.search = ""; // This clears the URL filters
    travelLoader().then((travels) => {
      document.getElementById("travel-grid").innerHTML = travels
        .map((t) => new Travels(t).render())
        .join("");
    });
  });

  // Render the cart
  renderCart();
});
