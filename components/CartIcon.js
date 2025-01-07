const template = document.createElement("template");
template.innerHTML = `
  <style>
    :host {
      display: block;
      position: relative;
      cursor: pointer;
    }
    .cart-icon svg{
        display: flex;
        align-items: center;
        position: relative;
        font-size: 20px;
        cursor: pointer;
        color: var(--background-color);
        transition: color 0.3s ease;
    }


    .cart-count {
        position: absolute;
        top: -8px;
        right: -10px;
        background-color: #ff6666;
        color: white;
        font-size: 10px;
        padding: 2.7px 8px;
        border-radius: 50%;
        font-weight: bold;
    }

    .cart-container {
        position: relative;
        display: inline-block;
    }

    .cart-container:hover .cart,
    .cart-container:focus-within .cart {
        display: block;
        transform: translateY(0);
        opacity: 1;
    }
    :host([open]) .cart-items {
      display: block;
    }
  </style>
  <div class="cart-icon">
    <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#314D1C"><path d="M280-80q-33 0-56.5-23.5T200-160q0-33 23.5-56.5T280-240q33 0 56.5 23.5T360-160q0 33-23.5 56.5T280-80Zm400 0q-33 0-56.5-23.5T600-160q0-33 23.5-56.5T680-240q33 0 56.5 23.5T760-160q0 33-23.5 56.5T680-80ZM246-720l96 200h280l110-200H246Zm-38-80h590q23 0 35 20.5t1 41.5L692-482q-11 20-29.5 31T622-440H324l-44 80h480v80H280q-45 0-68-39.5t-2-78.5l54-98-144-304H40v-80h130l38 80Zm134 280h280-280Z"/></svg>
    <span class="cart-count" id="cart-count">0</span>
  </div>
`;

class CartIcon extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.shadowRoot.appendChild(template.content.cloneNode(true));
    this.cartCountElement = this.shadowRoot.getElementById("cart-count");
  }

  connectedCallback() {
    this.addEventListener("click", this.handleClick.bind(this));
    this.updateCartCount();
  }

  static get observedAttributes() {
    return ["cart-count"];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (name === "cart-count") {
      this.updateCartCount();
    }
  }

  handleClick() {
    const toggleEvent = new CustomEvent("showCard", {
      bubbles: true,
      composed: true,
    });
    this.dispatchEvent(toggleEvent);
  }

  updateCartCount() {
    const savedCount = localStorage.getItem("cartCount") || "0";
    this.cartCountElement.textContent = savedCount;
  }
}

customElements.define("cart-icon", CartIcon);
