import "./components/TravelList.js";
import Travels, {
  travelLoader,
  applyFiltersFromURL,
  renderFilters,
} from "./modules/filter.js";

import Cart, { renderCart, addToCart, removeFromCart } from "./modules/cart.js";

document.addEventListener("DOMContentLoaded", async () => {
  const travelGrid = document.getElementById("travel-grid");

  await renderFilters();

  // Шүүлтүүрээс үл хамааран аяллын мэдээллийг харуулах
  const travels = await travelLoader();
  travelGrid.innerHTML = travels
    .map(
      (t) =>
        `<travel-list 
               data-id="${t.id}" 
               data-title="${t.title}" 
               data-image="${t.image}" 
               data-location="${t.location}" 
               data-days="${t.day}" 
               data-price="${t.price}">
          </travel-list>`
    )
    .join("");
  // travelGrid.innerHTML = travels.map((t) => new Travels(t).render()).join("");

  // Шүүлтүүрүүдийг сонгож аялуудыг шинэчлэх
  document.querySelectorAll(".filter-group label").forEach((label) => {
    label.addEventListener("click", async () => {
      const updatedTravels = await applyFiltersFromURL();
      travelGrid.innerHTML = updatedTravels
        .map(
          (t) =>
            `<travel-list 
               data-id="${t.id}" 
               data-title="${t.title}" 
               data-image="${t.image}" 
               data-location="${t.location}" 
               data-days="${t.day}" 
               data-price="${t.price}">
             </travel-list>`
        )
        .join("");
    });
  });
  // document.querySelectorAll(".filter-group label").forEach((label) => {
  //   label.addEventListener("click", async () => {
  //     const updatedTravels = await applyFiltersFromURL();
  //     travelGrid.innerHTML = updatedTravels
  //       .map((t) => new Travels(t).render())
  //       .join("");
  //   });
  // });

  // Сагсанд нэмэх
  document.addEventListener("click", (event) => {
    if (event.target.tagName === "TRAVEL-LIST") {
      const id = parseInt(event.target.getAttribute("data-id"), 10);
      addToCart(id);
    }
  });
  // document.addEventListener("click", (event) => {
  //   if (event.target.classList.contains("add-to-cart")) {
  //     const article = event.target.closest("article");
  //     const id = parseInt(article.dataset.id, 10);
  //     addToCart(id);
  //   }
  // });

  //Сагснаас хасах
  document.addEventListener("click", (event) => {
    if (event.target.classList.contains("remove-from-cart")) {
      const id = event.target.getAttribute("data-id");
      removeFromCart(id);
    }
  });

  // Шүүлтүүрийг цэвэрлэх товчлуур
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

  // Шүүлтүүрийг нээх/хаах товчлуурын үйлдэл(mobile дээр)
  const filterToggle = document.getElementById("filter-toggle");
  const filters = document.getElementsByClassName("filters")[0];

  filterToggle.addEventListener("click", () => {
    filters.classList.toggle("active");

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
