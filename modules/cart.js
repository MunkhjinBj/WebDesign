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

    const cartIcon = document.querySelector("cart-icon");

    if (cartIcon) {
      const cartCountElement = cartIcon.shadowRoot.querySelector("#cart-count");

      if (cartCountElement) {
        let currentCount = parseInt(cartCountElement.textContent || "0", 10);
        currentCount += 1;
        cartCountElement.textContent = currentCount;

        localStorage.setItem("cartCount", currentCount);
      }
    }

    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  } else {
    alert("Энэ аялал аль хэдийн таны сагсанд байна.");
  }
}

export function removeFromCart(id) {
  cartItems = cartItems.filter((item) => parseInt(item.id, 10) !== id);

  const cartIcon = document.querySelector("cart-icon");

  if (cartIcon) {
    const cartCountElement = cartIcon.shadowRoot.querySelector("#cart-count");

    if (cartCountElement) {
      let currentCount = parseInt(cartCountElement.textContent || "0", 10);

      if (currentCount > 0) {
        currentCount -= 1;
        cartCountElement.textContent = currentCount;

        localStorage.setItem("cartCount", currentCount);
      }
    }
  }

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
