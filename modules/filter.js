export default class Travels {
  constructor(travelObj) {
    this.id = travelObj.id;
    this.image = travelObj.image;
    this.title = travelObj.title;
    this.type = travelObj.type;
    this.days = travelObj.day;
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
//             <button class="add-to-cart">Сагслах</button>
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
  const result = await fetch("./travels.json");
  const data = await result.json();
  return data.travels;
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
  const result = await fetch("./travels.json");
  const data = await result.json();
  const destinationTypes = [
    ...new Set(data.travels.map((travel) => travel.type)),
  ];
  return destinationTypes;
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
      <input type="range" id="min-price" min="8135" max="1955800" value="8135" step="100" oninput="updatePrice()">
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

  travelsContainer.innerHTML = travelsData
    .map((travel) => {
      return `
        <travel-item
          data-id="${travel.id}"
          data-image="${travel.image}"
          data-title="${travel.title}"
          data-type="${travel.type}"
          data-days="${travel.day}"
          data-price="${travel.price}"
          data-season="${travel.season}"
          data-location="${travel.location}">
        </travel-item>
      `;
    })
    .join("");
}
