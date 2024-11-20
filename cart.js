let cartItems = [];

export default class Cart {
  constructor(cartObj) {
    this.id = cartObj.id;
    this.title = cartObj.title;
  }

  render() {
    return `
      <article>
        <h4>${this.title}</h4>
        <button onclick="removeFromCart(${this.id})">Remove</button>
      </article>
    `;
  }
}

export async function addToCart(id) {
  const result = await fetch("./travels.json");
  const data = await result.json();

  const travelItem = data.travels.find((item) => item.id === id);

  if (travelItem) {
    let cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
    const exists = cartItems.some((item) => item.id === id);
    if (!exists) {
      cartItems.push({ id: travelItem.id, title: travelItem.title });
      localStorage.setItem("cartItems", JSON.stringify(cartItems));
      renderCart();
    } else {
      alert("Энэ аялал аль хэдийн таны сагсанд байна.");
    }
  }
}

export function removeFromCart(id) {
  let cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
  cartItems = cartItems.filter((item) => item.id !== id);
  localStorage.setItem("cartItems", JSON.stringify(cartItems));
  renderCart();
}

export function renderCart() {
  const cartContainer = document.getElementById("cart-items");
  const cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
  cartContainer.innerHTML = "";
  cartItems.forEach((item) => {
    const cartItem = new Cart(item);
    cartContainer.insertAdjacentHTML("beforeend", cartItem.render());
  });
}
export function filterTravels() {
  const filteredTravels = travels.filter(
    (travel) =>
      (!filters.days.length || filters.days.includes(travel.date)) &&
      (!filters.types.length || filters.types.includes(travel.type))
  );
  renderTravels(filteredTravels);
}

// Dynamic Filter Setup

// const daysContainer = document.querySelector(".filter-group days");
// date.forEach(({ id, name }) => {
//   daysContainer.innerHTML += `<label><input type="checkbox" value="${id}" /> ${name}</label>`;
// });

// const typesContainer = document.querySelector(".filter-group.types");
// destinationtype.forEach(({ type }) => {
//   typesContainer.innerHTML += `<label><input type="checkbox" value="${type}" /> ${type}</label>`;
// });

// document.querySelectorAll(".filter-group input").forEach((checkbox) => {
//   checkbox.addEventListener("change", (e) => {
//     const value = e.target.value;
//     const isChecked = e.target.checked;

//     if (e.target.closest(".days")) {
//       isChecked
//         ? filters.days.push(Number(value))
//         : filters.days.splice(filters.days.indexOf(Number(value)), 1);
//     }

//     if (e.target.closest(".types")) {
//       isChecked
//         ? filters.types.push(value)
//         : filters.types.splice(filters.types.indexOf(value), 1);
//     }

//     filterTravels();
//   });
// });

// // Clear Filters
// document.getElementById("clear-filters").addEventListener("click", () => {
//   filters.days = [];
//   filters.types = [];
//   document.querySelectorAll(".filter-group input").forEach((input) => {
//     input.checked = false;
//   });
//   renderTravels();
// });

window.addToCart = addToCart;
window.removeFromCart = removeFromCart;
