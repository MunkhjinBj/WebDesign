export default class Travels {
  constructor(travelObj) {
    this.id = travelObj.id;
    this.image = travelObj.image;
    this.title = travelObj.title;
    this.type = travelObj.type;
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

export async function travelLoader() {
  const result = await fetch("./travels.json");
  const data = await result.json();
  return data.travels;
}

export async function applyFiltersFromURL() {
  const params = new URLSearchParams(document.location.search);
  const type = params.get("type");

  let travels = await travelLoader();

  if (type) {
    travels = travels.filter((travel) => travel.type === type);
  }

  return travels;
}
