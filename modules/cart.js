export default class Cart {
  constructor(cartObj) {
    this.id = cartObj.id;
    this.title = cartObj.title;
    this.startDate = cartObj.startDate;
    this.finishDate = cartObj.finishDate;
    this.price = cartObj.price;
  }

  // render() {
  //   return `
  //     <article data-id="${this.id}">
  //       <h5>${this.title}</h5>
  //       <p>${this.price}₮</p>
  //       <button class="remove-from-cart" data-id="${this.id}">Устгах</button>
  //     </article>
  //   `;
  // }
}
let cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];

export function getCartItems() {
  return cartItems;
}
// Сагсанд нэмэх

export function addToCart(item) {
  const exists = cartItems.some((cartItem) => cartItem.id === item.id);
  if (!exists) {
    cartItems.push(item);
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  } else {
    alert("Энэ аялал аль хэдийн таны сагсанд байна.");
  }
}

export function removeFromCart(id) {
  console.log("gags");
  cartItems = cartItems.filter((item) => parseInt(item.id, 10) !== id);
  console.log(cartItems);
  localStorage.setItem("cartItems", JSON.stringify(cartItems));
}

export function getTotalPrice() {
  return cartItems
    .reduce((total, item) => total + parseFloat(item.price), 0)
    .toLocaleString();
}

// export function renderCart() {
//   const cartContainer = document.getElementById("cart-items");
//   const cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];

//   // Update the cart item count
//   const cartCount = document.getElementById("cart-count");
//   cartCount.textContent = cartItems.length;

//   cartContainer.innerHTML = "";
//   cartItems.forEach((item) => {
//     const cartItem = new Cart(item);
//     cartContainer.insertAdjacentHTML("beforeend", cartItem.render());
//     console.log(cartItem);
//   });
// }
