import {
  addToCart as addToCartModule,
  removeFromCart as removeFromCartModule,
  getCartItems,
  getTotalPrice,
  toggle,
} from "/modules/cart.js";
export default class CartComp extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });

    const template = document.createElement("template");
    template.innerHTML = `
    <style>  
        :host(:state(open)) {
          background-color: lightgreen;
        }
        :host(:state(closed)) {
          background-color: lightcoral;
        }
        .cart {
            position: absolute;
            right: 20px;
            top: 74px;
            width: 320px;
            background: #fff;
            padding: 15px;
            border-radius: 8px;
            border: 1px solid #ddd;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
            display: none;
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
          <slot name="cart-items"><p></p></slot>
        </div>
        <h4>Нийт: <slot name="total-price"></slot></h4>
      </div>
      `;
    this.shadowRoot.appendChild(template.content.cloneNode(true));
  }

  static get observedAttributes() {
    return ["data-total-price"];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (name === "data-total-price") {
      const totalPriceElement = this.shadowRoot.querySelector("#total-price");
      totalPriceElement.textContent = newValue;
      this.render();
    }
  }

  connectedCallback() {
    this.shadowRoot.addEventListener("click", (event) => {
      if (event.target.classList.contains("remove-from-cart")) {
        const id = parseInt(event.target.getAttribute("data-id"), 10);
        this.removeFromCart(id);
      }
    });
    const slot = this.shadowRoot.querySelector('slot[name="items"]');
    if (slot) {
      slot.addEventListener("slotchange", () => {
        this.render(); // Slot doto
      });
    }
    this.render();
  }

  disconnectedCallback() {
    this.shadowRoot.removeEventListener("click", this.handleButtonClick);
  }

  addToCart(item) {
    addToCartModule(item);
    this.updateTotalPrice();
    this.render();
  }

  removeFromCart(id) {
    removeFromCartModule(id);
    this.updateTotalPrice();
    this.render();
  }

  updateTotalPrice() {
    const cartItems = getCartItems();
    const totalPrice = cartItems
      .reduce((sum, item) => sum + parseFloat(item.price), 0)
      .toLocaleString();
    // Нийт үнийг атрибут болгон хадгалах
    localStorage.setItem("data-total-price", totalPrice);
  }

  render() {
    const cartItems = getCartItems();
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

    const slotCartItems = this.shadowRoot.querySelector(
      'slot[name="cart-items"]'
    );
    slotCartItems.innerHTML = cartItemsHTML || "<p>Сагс хоосон байна</p>";

    const slotTotalPrice = this.shadowRoot.querySelector(
      'slot[name="total-price"]'
    );
    slotTotalPrice.innerHTML = localStorage.getItem("data-total-price") || "0₮";
  }
  toggle() {
    const cart = this.shadowRoot.querySelector("#cart");
    const isVisible = cart.style.display === "block";
    cart.style.display = isVisible ? "none" : "block";
  }
}
customElements.define("cart-comp", CartComp);
