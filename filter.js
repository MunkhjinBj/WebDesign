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
