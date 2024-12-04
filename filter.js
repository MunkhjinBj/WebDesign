export default class Travels {
  constructor(travelObj) {
    this.id = travelObj.id;
    this.image = travelObj.image;
    this.title = travelObj.title;
    this.type = travelObj.type;
    this.days = travelObj.date;
    this.age = travelObj.ageGroup;
  }

  render() {
    return `
      <article>
        <img src="${this.image}" alt="${this.title}">
        <h3>${this.title}</h3>
        <p>${this.type}</p>
        <button onclick="addToCart(${this.id})">Add to Cart</button>
      </article>
    `;
  }
}

export async function loadDestinations() {
  const result = await fetch("./travels.json");
  const data = await result.json();
  const destinationTypes = [
    ...new Set(data.travels.map((travel) => travel.type)),
  ];
  return destinationTypes; // Return types of destinations
}

export async function travelLoader() {
  const result = await fetch("./travels.json");
  const data = await result.json();
  return data.travels;
}

// Apply filters based on checked boxes when the Apply Filters button is clicked
// export async function applyFiltersFromURL() {
//   // Get selected filter values
//   const selectedTypes = Array.from(
//     document.querySelectorAll(".filter-types:checked")
//   ).map((input) => input.value);
//   const selectedDays = Array.from(
//     document.querySelectorAll(".filter-days:checked")
//   ).map((input) => input.value);

//   let travels = await travelLoader();

//   if (selectedTypes.length > 0) {
//     travels = travels.filter((travel) => selectedTypes.includes(travel.type));
//   }

//   if (selectedDays.length > 0) {
//     const dayRanges = {
//       "1-3": [1, 3],
//       "4-6": [4, 6],
//       "7+": [7, Infinity],
//     };

//     travels = travels.filter((travel) => {
//       for (let range of selectedDays) {
//         const [min, max] = dayRanges[range];
//         if (travel.date >= min && travel.date <= max) return true;
//       }
//       return false;
//     });
//   }

//   return travels;
// }
export async function applyFiltersFromURL() {
  const params = new URLSearchParams(document.location.search);

  // Extract filters from URL parameters
  const urlType = params.get("type"); // e.g., `type=beach`
  const urlDays = params.get("days"); // e.g., `days=1-3`
  const urlSeason = params.get("season");
  const urlAge = params.get("ageGroup");

  if (urlType || urlDays || urlSeason || urlAge) {
    travels = travels.filter((travel) => travel.type === type);
  }
  // Get selected filter values from DOM
  const selectedTypes = Array.from(
    document.querySelectorAll(".filter-types:checked")
  ).map((input) => input.value);

  const selectedDays = Array.from(
    document.querySelectorAll(".filter-days:checked")
  ).map((input) => input.value);

  const selectedSeason = Array.from(
    document.querySelectorAll(".filter-season:checked")
  ).map((input) => input.value);

  const selectedAge = Array.from(
    document.querySelectorAll(".filter-ageGroup:checked")
  ).map((input) => input.value);

  // Combine URL parameters and selected filters
  const filterTypes =
    selectedTypes.length > 0 ? selectedTypes : urlType ? [urlType] : [];
  const filterDays =
    selectedDays.length > 0 ? selectedDays : urlDays ? [urlDays] : [];
  const filterSeason =
    selectedSeason.length > 0 ? selectedSeason : urlSeason ? [urlSeason] : [];
  const filterAge =
    selectedAge.length > 0 ? selectedAge : urlAge ? [urlAge] : [];
  // Load all travel data
  let travels = await travelLoader();

  // Filter by type (if applicable)
  if (filterTypes.length > 0) {
    travels = travels.filter((travel) => filterTypes.includes(travel.type));
  }

  // Filter by day ranges (if applicable)
  if (filterDays.length > 0) {
    const dayRanges = {
      "1-3": [1, 3],
      "4-6": [4, 6],
      "7+": [7, Infinity],
    };

    travels = travels.filter((travel) => {
      for (let range of filterDays) {
        const [min, max] = dayRanges[range];
        if (travel.days >= min && travel.days <= max) {
          return true;
        }
      }
      return false;
    });
  }
  if (filterSeason.length > 0) {
    travels = travels.filter((travel) => filterSeason.includes(travel.season));
  }
  return travels;

  if (filterAge.length > 0) {
    travels = travels.filter((travel) => filterAge.includes(travel.age));
  }
  return travels;
}

export async function renderFilters() {
  const filterTypesContainer = document.querySelector(".filter-group.types");
  const filterDaysContainer = document.querySelector(".filter-group.days");
  const filterPriceContainer = document.querySelector(".filter-group.price");
  const filterSeasonContainer = document.querySelector(".filter-group.season");
  const filterAgeGroupContainer = document.querySelector(".filter-group.age");

  const destinationTypes = await loadDestinations();

  // Render types filter dynamically
  filterTypesContainer.insertAdjacentHTML(
    "beforeend",
    destinationTypes
      .map((type) => {
        return `
      <label>
        <input type="checkbox" value="${type}" class="filter-types" /> ${type}
      </label>
    `;
      })
      .join("")
  );

  // Render days filter dynamically (example: filter for 1-3 days, 4-6 days, etc.)
  filterDaysContainer.insertAdjacentHTML(
    "beforeend",
    `
    <label><input type="checkbox" value="1-3" class="filter-days" /> 1-3 хоног</label>
    <label><input type="checkbox" value="4-6" class="filter-days" /> 4-6 хоног</label>
    <label><input type="checkbox" value="7+" class="filter-days" /> 7+ хоног</label>
    `
  );

  filterSeasonContainer.insertAdjacentHTML(
    "beforeend",
    `
    <label><input type="checkbox" value="Зун" class="filter-season" /> Зун</label>
    <label><input type="checkbox" value="Намар" class="filter-season" /> Намар</label>
    <label><input type="checkbox" value="Өвөл" class="filter-season" /> Өвөл</label>
    <label><input type="checkbox" value="Хавар" class="filter-season" /> Хавар</label>
    `
  );
  filterAgeGroupContainer.insertAdjacentHTML(
    "beforeend",
    `
    <label><input type="checkbox" value="Гэр бүл" class="filter-ageGroup" /> Гэр бүл</label>
    <label><input type="checkbox" value="Тамирчид" class="filter-ageGroup" />  Тамирчид</label>
    <label><input type="checkbox" value="Том хүн" class="filter-ageGroup" /> Том хүн</label>
    `
  );

  filterPriceContainer.insertAdjacentHTML(
    "beforeend",
    `
    <div class="slider-container">
      <input type="range" id="min-price" min="8135" max="1955800" value="8135" step="100" oninput="updatePrice()">
    </div>
    <div class="price-display">
      <span id="min-price-display">100,000₮</span>
      <span id="max-price-display">2,955,800 ₮</span>
    </div>
  `
  );
}

function updatePrice() {
  const minPrice = document.getElementById("min-price");
  const maxPrice = document.getElementById("max-price");
  const minPriceDisplay = document.getElementById("min-price-display");
  const maxPriceDisplay = document.getElementById("max-price-display");

  // Update the displayed prices
  minPriceDisplay.textContent = `${parseInt(
    minPrice.value
  ).toLocaleString()} ₮`;
  maxPriceDisplay.textContent = `${parseInt(
    maxPrice.value
  ).toLocaleString()} ₮`;

  // Prevent sliders from crossing over
  if (parseInt(minPrice.value) >= parseInt(maxPrice.value)) {
    minPrice.value = maxPrice.value - 100;
  }
}

// export async function applyFiltersFromURL() {
//   const params = new URLSearchParams(document.location.search);
//   const type = params.get("type");
//   let travels = await travelLoader();
//   if (type) {
//     travels = travels.filter((travel) => travel.type === type);
//   }
//   return travels;
// }
