export default class Travels {
  constructor(travelObj) {
    this.id = travelObj.id;
    this.image = travelObj.image;
    this.title = travelObj.title;
    this.type = travelObj.type;
    this.days = travelObj.days;
    this.price = travelObj.price;
    this.season = travelObj.season;
    this.location = travelObj.location;
  }
}
// render() {
//     return `
//     <article data-id="${this.id}">
//       <img src="${this.image}" alt="" />
//       <div class="info">
//         <h3>${this.title}</h3>
//         <ul class="location">
//           <li>${this.location}</li>
//           <li>${this.days} хоног</li>
//         </ul>
//         <ul class="addCart">
//           <li>
//             <button class="add-to-cart" aria-label="add to the cart">Сагслах</button>
//           </li>
//           <li>
//             <h2>${this.price}₮</h2>
//           </li>
//         </ul>
//       </div>
//     </article>
// `;
// }
//

export async function travelLoader() {
  try {
    const response = await fetch("/api/travels");

    if (!response.ok) {
      throw new Error(`Failed to fetch travels: ${response.statusText}`);
    }
    const data = await response.json();
    console.log("API Response:", data);

    if (!data || !Array.isArray(data.travels)) {
      throw new Error("Invalid data structure: 'travels' not found.");
    }
    return data.travels;
  } catch (error) {
    console.error("Error loading travels:", error.message);
<<<<<<< HEAD
    return [];
=======
    return []; // Return an empty array to prevent frontend crashes
>>>>>>> dc48c92 (webapi)
  }
}

export async function applyFiltersFromURL() {
  // Load all travel data first
  let travels = await travelLoader();
  const params = new URLSearchParams(document.location.search);

  // Extract filters from URL parameters
  const urlType = params.get("type");
  const urlDays = params.get("days");
  const urlSeason = params.get("season");
  const urlAge = params.get("ageGroup");

  // Get selected filter values from DOM
  const selectedTypes = getSelectedFilterValues("filter-types");
  const selectedDays = getSelectedFilterValues("filter-days");
  const selectedSeason = getSelectedFilterValues("filter-season");
  const selectedAge = getSelectedFilterValues("filter-ageGroup");

  // Combine URL parameters and selected filters
  const filterTypes =
    selectedTypes.length > 0 ? selectedTypes : urlType ? [urlType] : [];
  const filterDays =
    selectedDays.length > 0 ? selectedDays : urlDays ? [urlDays] : [];
  const filterSeason =
    selectedSeason.length > 0 ? selectedSeason : urlSeason ? [urlSeason] : [];
  const filterAge =
    selectedAge.length > 0 ? selectedAge : urlAge ? [urlAge] : [];

  // Apply filters
  if (filterTypes.length > 0) {
    travels = travels.filter((travel) => filterTypes.includes(travel.type));
  }
  if (filterDays.length > 0) {
    const dayRanges = {
      "1-3": [1, 3],
      "4-6": [4, 6],
      "7+": [7, Infinity],
    };

    travels = travels.filter((travel) => {
      return filterDays.some((range) => {
        const [min, max] = dayRanges[range];
        return travel.day >= min && travel.day <= max;
      });
    });
  }

  if (filterSeason.length > 0) {
    travels = travels.filter((travel) => filterSeason.includes(travel.season));
  }

  if (filterAge.length > 0) {
    travels = travels.filter((travel) => filterAge.includes(travel.ageGroup));
  }

  return travels;
}

function getSelectedFilterValues(className) {
  return Array.from(document.querySelectorAll(`.${className}:checked`)).map(
    (input) => input.value
  );
}

async function loadDestinations() {
  try {
    const response = await fetch("http://localhost:3000/api/destinations");
    if (!response.ok) {
      throw new Error(
        `Failed to fetch destination types: ${response.statusText}`
      );
    }
    const data = await response.json();
    return [...new Set(data.map((destination) => destination.type))];
  } catch (error) {
    console.error("Error loading destinations:", error);
    return [];
  }
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
      <input type="range" id="min-price"  aria-label = "Price range"min="8135" max="1955800" value="8135" step="100" oninput="updatePrice()">
    </div>
    <div class="price-display">
      <span id="min-price-display">100,000₮</span>
      <span id="max-price-display">2,955,800 ₮</span>
    </div>
  `
  );
}

export async function renderTravels(filteredTravels = null) {
  const travelsContainer = document.getElementById("travel-grid");

  const travelsData = filteredTravels || (await travelLoader());

  if (!Array.isArray(travelsData)) {
    console.error("renderTravels expected an array but got:", travelsData);
    travelsContainer.innerHTML = "<p>Error loading travel data.</p>";
    return;
  }

  travelsContainer.innerHTML = travelsData
    .map((travel) => {
      return `
        <travel-item
          data-id="${travel.id}"
          data-image="${travel.image}"
          data-title="${travel.title}"
          data-type="${travel.type}"
          data-days="${travel.days}"
          data-price="${travel.price}"
          data-season="${travel.season}"
          data-location="${travel.location}">
        </travel-item>
      `;
    })
    .join("");
}
