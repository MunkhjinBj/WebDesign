import {
  addToCart as addToCartModule,
  removeFromCart as removeFromCartModule,
  getCartItems,
  getTotalPrice,
} from "/modules/cart.js";

export default class CartComp extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.render = this.render.bind(this);
  }

  connectedCallback() {
    this.shadowRoot.addEventListener("click", (event) => {
      if (event.target.classList.contains("remove-from-cart")) {
        const id = parseInt(event.target.getAttribute("data-id"), 10);
        console.log(id);
        this.removeFromCart(id);
      }
      this.render();
    });
  }

  addToCart(item) {
    addToCartModule(item);
    this.render();
  }

  removeFromCart(id) {
    removeFromCartModule(id); // Логикийг модулиас дуудах
    this.render();
  }

  disconnectedCallback() {
    this.shadowRoot.removeEventListener("click", this.handleButtonClick);
  }

  render() {
    const cartItems = getCartItems();
    const totalPrice = getTotalPrice();
    const cartItemsHTML = cartItems
      .map(
        (item) => `
        <article data-id="${item.id}">
          <h5>${item.title}</h5>
          <p>${item.price}₮</p>
          <button class="remove-from-cart" data-id="${item.id}">Устгах</button>
        </article>
      `
      )
      .join("");
    this.shadowRoot.innerHTML = `
    <style>  
        .cart {
            position: absolute;
            right: 0;
            width: 320px;
            background: #fff;
            padding: 15px;
            border-radius: 8px;
            border: 1px solid #ddd;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
            display: block;
            z-index: 1000;
            transition: opacity 0.3s ease, transform 0.3s ease;
            transform: translateY(-10px);
            opacity: 1;
        }         
        #cart {
            width: 320px;
            padding: 20px;
            border: 1px solid #eee;
            border-radius: 12px;
            background-color: #fff;
            box-shadow: 0 6px 12px rgba(0, 0, 0, 0.1);
            font-family: "Arial", sans-serif;
        }         
        #cart h3 {
            font-size: 1.8em;
            font-weight: bold;
            margin-bottom: 15px;
            text-align: center;
            color: #333;
        }         
        #cart-items {
            margin-bottom: 15px;
        }         
        #cart-items article {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 10px 15px;
            margin-bottom: 10px;
            border: 1px solid #ddd;
            border-radius: 8px;
            background-color: #f8f8f8;
            transition: background-color 0.3s ease;
        }
        #cart-items article h5 {
            font-size: 12px;
            color: #555;
            margin: 0;
            flex: 2;
        }         
        #cart-items article p {
            font-size: 12px;
            font-weight: bold;
            color: #333;
            margin: 0;
            flex: 1;
            padding-right: 3px;
            text-align: right;
        }         
        #cart h4 {
            font-size: 1.2em;
            text-align: right;
            color: #333;
            margin-top: 10px;
        }         
        button.remove-from-cart {
            padding: 5px 10px;
            font-size: 0.9em;
            color: #fff;
            background-color: #e74c3c;
            border: none;
            border-radius: 4px;
            cursor: pointer;
            transition: background-color 0.3s ease;
        }
        button.remove-from-cart:hover {
            background-color: #c0392b;
        }
    </style>
     <div id="cart" class="cart">
        <h3>Сагс</h3>
        <div id="cart-items">
            ${cartItemsHTML || "<p>Сагс хоосон байна</p>"}
        </div>
        <h4>Нийт: ${getTotalPrice()}₮</h4>
     </div>
    `;
  }
}
customElements.define("cart-comp", CartComp);
