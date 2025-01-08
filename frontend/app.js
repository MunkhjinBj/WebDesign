import "../components/TravelItem.js";
import "../components/CartComp.js";
import "../components/CartIcon.js";
import Travels, {
  travelLoader,
  applyFiltersFromURL,
  renderFilters,
  renderTravels,
} from "../modules/filter.js";
import addToCart from "../modules/cart.js";

document.addEventListener("DOMContentLoaded", async () => {
  // dark/kight-mode
  initializeTheme();

  // Cart
  initializeCart();
  const travelGrid = document.getElementById("travel-grid");

  await renderFilters();

  const filteredTravels = await applyFiltersFromURL();
  renderTravels(filteredTravels);

  // Checkbox сонгох үед URL шинэчлэх
  setupFilterListeners();

  document
    .getElementById("clear-filters")
    .addEventListener("click", async () => {
      clearFilters();
      const travels = await travelLoader();
      renderTravels(travels);
    });

  // Шүүлтүүрийг нээх/хаах товчлуурын үйлдэл (мобайл дээр)
  setupMobileFilterToggle();

  // Сагсанд нэмэх
  //eniig addToCart ashiglah gej baigaa shuu
  travelGrid.addEventListener("addToCart", (event) => {
    const travelItem = {
      id: event.detail.id,
      title: event.detail.title,
      price: event.detail.price,
      image: event.detail.image,
      days: event.detail.days,
    };

    const cartElement = document.querySelector("cart-comp");
    if (cartElement) {
      cartElement.addToCart(travelItem);
      cartElement.style.display = "block";
    }
  });
});

function initializeTheme() {
  const savedTheme = localStorage.getItem("theme") || "light";
  if (savedTheme === "dark") {
    document.body.classList.toggle("dark-mode");
  }
  document.getElementById("toggle-theme").addEventListener("click", () => {
    const isDark = document.body.classList.toggle("dark-mode");
    localStorage.setItem("theme", isDark ? "dark" : "light");
  });
}

function initializeCart() {
  document.addEventListener("showCard", () => {
    const cartComp = document.querySelector("cart-comp");
    if (cartComp) {
      cartComp.toggle();
    }
  });
}

// Checkbox сонгох үед URL шинэчлэх ба DOM шинэчлэх
function setupFilterListeners() {
  const filters = document.querySelectorAll(".filter-group input");

  filters.forEach((input) => {
    input.addEventListener("change", async () => {
      const filterKey = input.dataset.filter;
      const filterValue = input.checked ? input.value : null;

      updateURLParams(filterKey, filterValue);
      const filteredTravels = await applyFiltersFromURL();
      renderTravels(filteredTravels);
    });
  });
}

// URL-д шүүлтүүрийг нэмэх/устгах
function updateURLParams(filterKey, filterValue) {
  const params = new URLSearchParams(window.location.search);

  if (filterValue) {
    params.set(filterKey, filterValue);
  } else {
    params.delete(filterKey);
  }

  const newURL = `${window.location.pathname}?${params}`;
  window.history.replaceState({}, "", newURL);
}

function clearFilters() {
  document.querySelectorAll(".filter-group input").forEach((input) => {
    input.checked = false;
  });

  window.location.search = "";
}

function setupMobileFilterToggle() {
  const filters = document.querySelector(".filters");
  const searchBar = document.querySelector(".search-bar");

  document
    .getElementById("filter-toggle-search")
    .addEventListener("click", () => {
      if (filters.style.display === "block") {
        filters.style.display = "none";
      } else {
        filters.style.display = "block";
        searchBar.style.display = "none";
      }
    });

  document
    .getElementById("filter-toggle-filter")
    .addEventListener("click", () => {
      if (filters.style.display === "block") {
        filters.style.display = "none";
        searchBar.style.display = "flex";
      } else {
        filters.style.display = "block";
      }
    });
}
