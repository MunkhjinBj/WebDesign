export default class Travels {
  constructor(travelObj) {
    this.id = travelObj.id;
    this.image = travelObj.image;
    this.title = travelObj.title;
    this.type = travelObj.type;
    this.days = travelObj.date; // Assuming 'date' refers to travel days
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
  const result = await fetch("./destination.json");
  const data = await result.json();
  return data.destinationtype; // Return types of destinations
}

export async function travelLoader() {
  const result = await fetch("./travels.json");
  const data = await result.json();
  return data.travels;
}

export async function applyFiltersFromURL() {
  const params = new URLSearchParams(document.location.search);
  const type = params.get("type");
  const minDays = params.get("minDays");
  const maxDays = params.get("maxDays");

  let travels = await travelLoader();

  if (type) {
    travels = travels.filter((travel) => travel.type === type);
  }

  if (minDays) {
    travels = travels.filter((travel) => travel.date >= minDays);
  }

  if (maxDays) {
    travels = travels.filter((travel) => travel.date <= maxDays);
  }

  return travels;
}

export async function renderFilters() {
  const filterTypesContainer = document.querySelector(".filter-group.types");
  const filterDaysContainer = document.querySelector(".filter-group.days");

  const destinationTypes = await loadDestinations();

  // Render types filter dynamically
  destinationTypes.forEach((destination) => {
    filterTypesContainer.innerHTML += `
      <label><input type="checkbox" value="${destination.type}" class="filter-types" /> ${destination.type}</label>
    `;
  });

  // Render days filter dynamically (example: filter for 1-3 days, 4-6 days, etc.)
  filterDaysContainer.innerHTML = `
    <label><input type="checkbox" value="1-3" class="filter-days" /> 1-3 хоног</label>
    <label><input type="checkbox" value="4-6" class="filter-days" /> 4-6 хоног</label>
    <label><input type="checkbox" value="7+" class="filter-days" /> 7+ хоног</label>
  `;
}
