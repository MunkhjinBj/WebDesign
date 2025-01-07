import "../components/TravelItem.js";
("");
import "../components/CartComp.js";
import "../components/CartIcon.js";
import Travels, {
  travelLoader,
  applyFiltersFromURL,
  renderFilters,
  renderTravels,
} from "../modules/filter.js";

// import Cart, { addToCart, removeFromCart } from "./modules/cart.js";

document.addEventListener("DOMContentLoaded", async () => {
  //dark-mode
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme === "dark") {
    document.body.classList.toggle("dark-mode");
  }
  document.getElementById("toggle-theme").addEventListener("click", () => {
    const isDark = document.body.classList.toggle("dark-mode");

    localStorage.setItem("theme", isDark ? "dark" : "light");
  });

  //state
  document.addEventListener("showCard", () => {
    const cartComp = document.querySelector("cart-comp");
    if (cartComp) {
      cartComp.toggle();
    }
  });

  const travelGrid = document.getElementById("travel-grid");

  await renderFilters();
  await renderTravels();

  // Шүүлтүүрээс үл хамааран аяллын мэдээллийг харуулах
  const travels = await travelLoader();
  travelGrid.innerHTML = travels
    .map(
      (t) =>
        `<travel-item
               data-id="${t.id}" 
               data-title="${t.title}" 
               data-image="${t.image}" 
               data-location="${t.location}" 
               data-days="${t.days}" 
               data-price="${t.price}">
          </travel-item>`
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
            `<travel-item
               data-id="${t.id}" 
               data-title="${t.title}" 
               data-image="${t.image}" 
               data-location="${t.location}" 
               data-days="${t.day}" 
               data-price="${t.price}">
             </travel-item>`
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
  //eniig addToCart ashiglah gej baigaa shuu
  travelGrid.addEventListener("addToCart", (event) => {
    const travelItem = {
      id: event.detail.id,
      title: event.detail.title,
      price: event.detail.price,
    };

    const cartElement = document.querySelector("cart-comp");
    if (cartElement) {
      cartElement.addToCart(travelItem);
      cartElement.style.display = "block";
    }
  });

  // document.addEventListener("click", (event) => {
  //   if (event.target.classList.contains("add-to-cart")) {
  //     const article = event.target.closest("article");
  //     const id = parseInt(article.dataset.id, 10);
  //     addToCart(id);
  //   }
  // });

  // Шүүлтүүрийг цэвэрлэх товчлуур
  document
    .getElementById("clear-filters")
    .addEventListener("click", async () => {
      document.querySelectorAll(".filter-group input").forEach((input) => {
        input.checked = false;
      });

      window.location.search = "";
      const travels = await travelLoader();
      travelGrid.innerHTML = travels
        .map(
          (t) =>
            `<travel-item
             data-id="${t.id}" 
             data-title="${t.title}" 
             data-image="${t.image}" 
             data-location="${t.location}" 
             data-days="${t.day}" 
             data-price="${t.price}">
           </travel-item>`
        )
        .join("");
    });

  // Шүүлтүүрийг нээх/хаах товчлуурын үйлдэл(mobile дээр)
  // document
  //   .getElementById("filter-toggle")
  //   .addEventListener("click", function () {
  //     const filters = document.querySelector(".filters");
  //     filters.classList.toggle("active");
  //   });

  // document
  //   .querySelector(".filters .close-btn")
  //   .addEventListener("click", function () {
  //     const filters = document.querySelector(".filters");
  //     filters.classList.remove("active");
  //   });

  document
    .getElementById("clear-filters")
    .addEventListener("click", function () {
      document
        .querySelectorAll(".filters input[type='range']")
        .forEach((input) => {
          input.value = input.min;
        });
    });

  const filters = document.querySelector(".filters");
  const search_bar = document.querySelector(".search-bar");
  document
    .getElementById("filter-toggle-search")
    .addEventListener("click", function () {
      if (filters.style.display === "block") {
        filters.style.display = "none";
      } else {
        filters.style.display = "block";
        search_bar.style.display = "none";
      }
    });

  document
    .getElementById("filter-toggle-filter")
    .addEventListener("click", function () {
      if (filters.style.display === "block") {
        filters.style.display = "none";
        search_bar.style.display = "flex";
      } else {
        filters.style.display = "block";
      }
    });
});
