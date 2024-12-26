import Travels, {
  travelLoader,
  applyFiltersFromURL,
  renderFilters,
} from "./modules/filter.js";

import Cart, { renderCart, addToCart } from "./modules/cart.js";

document.addEventListener("DOMContentLoaded", async () => {
  const travelGrid = document.getElementById("travel-grid");

  await renderFilters();
  const travels = await travelLoader();
  travelGrid.innerHTML = travels.map((t) => new Travels(t).render()).join("");

  document.querySelectorAll(".filter-group label").forEach((label) => {
    label.addEventListener("click", async () => {
      const updatedTravels = await applyFiltersFromURL();
      travelGrid.innerHTML = updatedTravels
        .map((t) => new Travels(t).render())
        .join("");
    });
  });

  document.addEventListener("click", (event) => {
    if (event.target.classList.contains("add-to-cart")) {
      const article = event.target.closest("article");
      const id = parseInt(article.dataset.id, 10);
      addToCart(id);
    }
  });

  document.getElementById("clear-filters").addEventListener("click", () => {
    document
      .querySelectorAll(".filter-group input")
      .forEach((input) => (input.checked = false));

    window.location.search = "";
    travelLoader().then((travels) => {
      document.getElementById("travel-grid").innerHTML = travels
        .map((t) => new Travels(t).render())
        .join("");
    });
  });

  // Toggle button functionality for filters
  const filterToggle = document.getElementById("burger-menu");
  const filters = document.querySelector("filters");

  filterToggle.addEventListener("click", () => {
    // Toggle 'active' class on the filters element
    filters.classList.toggle("active");

    // Optionally, update button text or styling
    if (filters.classList.contains("active")) {
      filterToggle.textContent = "✖ Шүүлтүүр хаах";
    } else {
      filterToggle.textContent = "☰ Шүүлтүүр";
    }
  });

  renderCart();
});

// import Travels, {
//   travelLoader,
//   applyFiltersFromURL,
//   renderFilters,
// } from "./filter.js";
// import Cart, { renderCart } from "./cart.js";

// document.addEventListener("DOMContentLoaded", async () => {
//   const travelGrid = document.getElementById("travel-grid");

//   // Load and render filter options
//   await renderFilters();

//   // Render the initial travel grid with no filters (or based on URL filters)
//   const travels = await applyFiltersFromURL();
//   travelGrid.innerHTML = travels.map((t) => new Travels(t).render()).join("");

//   // Clear Filters button logic
//   document.getElementById("clear-filters").addEventListener("click", () => {
//     // Uncheck all filters
//     document
//       .querySelectorAll(".filter-group input")
//       .forEach((input) => (input.checked = false));

//     // Reload all travels without filters
//     window.location.search = ""; // This clears the URL filters
//     travelLoader().then((travels) => {
//       document.getElementById("travel-grid").innerHTML = travels
//         .map((t) => new Travels(t).render())
//         .join("");
//     });
//   });

// Render the cart
//   renderCart();
// });
