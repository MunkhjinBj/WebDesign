let cartItems = [];

export default class Cart {
  constructor(cartObj) {
    this.id = cartObj.id;
    this.title = cartObj.title;
    this.startDate = cartObj.startDate;
    this.finishDate = cartObj.finishDate;
    this.price = cartObj.price;
  }

  render() {
    return `
      <article>
        <h4>${this.title}</h4>
        <p>${this.startDate}</p>
        <p>${this.price}<p>
        <button onclick="removeFromCart(${this.id})">Устгах</button>
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

  // Update the cart item count
  const cartCount = document.getElementById("cart-count");
  cartCount.textContent = cartItems.length; // Update the cart count

  cartContainer.innerHTML = "";
  cartItems.forEach((item) => {
    const cartItem = new Cart(item);
    cartContainer.insertAdjacentHTML("beforeend", cartItem.render());
  });
}

// window.addToCart = addToCart;
// window.removeFromCart = removeFromCart;

// let cartItems = [];

// export default class Cart {
//   constructor(cartObj) {
//     this.id = cartObj.id;
//     this.title = cartObj.title;
//   }

//   render() {
//     return `
//       <article>
//         <h4>${this.title}</h4>
//         <button onclick="removeFromCart(${this.id})">Remove</button>
//       </article>
//     `;
//   }
// }

// export async function addToCart(id) {
//   const result = await fetch("./travels.json");
//   const data = await result.json();

//   const travelItem = data.travels.find((item) => item.id === id);

//   if (travelItem) {
//     let cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
//     const exists = cartItems.some((item) => item.id === id);
//     if (!exists) {
//       cartItems.push({ id: travelItem.id, title: travelItem.title });
//       localStorage.setItem("cartItems", JSON.stringify(cartItems));
//       renderCart(); // This will update the cart count and the cart items
//     } else {
//       alert("Энэ аялал аль хэдийн таны сагсанд байна.");
//     }
//   }
// }

// export function removeFromCart(id) {
//   let cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
//   cartItems = cartItems.filter((item) => item.id !== id);
//   localStorage.setItem("cartItems", JSON.stringify(cartItems));
//   renderCart(); // This will update the cart count and the cart items
// }

// export function renderCart() {
//   const cartContainer = document.getElementById("cart-items");
//   const cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];

//   // Update the cart item count
//   const cartCount = document.getElementById("cart-count");
//   cartCount.textContent = cartItems.length; // Update the cart count

//   cartContainer.innerHTML = "";
//   cartItems.forEach((item) => {
//     const cartItem = new Cart(item);
//     cartContainer.insertAdjacentHTML("beforeend", cartItem.render());
//   });
// }

// // Initialize cart count on page load
// document.addEventListener("DOMContentLoaded", () => {
//   renderCart(); // Ensure the cart count is set when the page loads
// });

// window.addToCart = addToCart;
// window.removeFromCart = removeFromCart;

// document.getElementById("clear-filters").addEventListener("click", () => {
//   // Uncheck all filters
//   document.querySelectorAll(".filter-group input").forEach(input => input.checked = false);

//   // Reload all travels without filters
//   window.location.search = ""; // This clears the URL filters
//   travelLoader().then(travels => {
//     document.getElementById("travel-grid").innerHTML = travels.map((t) => new Travels(t).render()).join("");
//   });
// });
