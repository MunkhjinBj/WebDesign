const template = document.createElement("template");
template.innerHTML = `
  <style>
    article {
        width: 220px;
        height: 350px;
        background: #fff;
        margin-bottom: 1.1rem;
        text-align: center;
        cursor: pointer;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        overflow: hidden;
        transition: transform 0.3s, box-shadow 0.3s;
        position: relative;
    }

    article:hover img {
        transform: scale(1.1);
        border-radius: 16px;
        transform-origin: center;
    }

    article img {
        width: 220px;
        height: 220px;
        border-radius: 16px;
        object-fit: cover;
        transition: transform 0.3s ease-in-out;
    }
    article:hover {
        border-radius: 16px; /* Optional: Rounded corners for the article */
        box-shadow: 0 6px 10px rgba(0, 0, 0, 0.15); /* Optional: Shadow effect */
    }
    article h3 {
        text-align: left;
        font-size: 14px;
        color: #333;
        font-weight: 550;
        border-bottom: 1px solid black;
        padding-bottom: 3px;
        margin: 0 10px;
    }

    article p {
        color: #666;
        font-size: 10px;
        margin: 5px 0;
    }
    article button {
        background-color: var(--primary-hover-color);
        color: #fff;
        border: none;
        padding: 5px 10px;
        right: -50px;
        border-radius: 12px;
        cursor: pointer;
        font-size: 12px;
        font-weight: 500;
        transition: background-color 0.3s ease;
    }

    article button:hover {
        background-color: var(--primary-hover-color);
    }

    .info {
        padding: 0 1rem;
    }
    .info ul {
        text-align: left;
        list-style: none;
        // margin: 5px 10px 8px 10px; 
        display: flex;
        align-items: center;
        }
    .info ul li {
        font-size: 12px;
        font-weight: 300;
    }
    .info ul li h2 {
        font-size: 14px;
        font-weight: 550;
    }
    .location {
        display: flex;
        justify-content: space-between;
        padding: 5px 5px 0 5px;
        margin: 0;
    }
    .location li:first-child::before {
        content: "";
        background-image: url("./images/ym2/loc.png");
        background-size: contain;
        background-repeat: no-repeat;
        vertical-align: middle;
        width: 18px;
        height: 18px;
        display: inline-block;
        margin-right: 3px;
    }
    .addCart {
        display: flex;
        justify-content: space-between;
        padding: 0 5px ;
        margin:0;
    } 
  </style>
  <article>
    <img src="" alt="" />
    <div class="info">
      <h3></h3>
      <ul class="location">
        <li></li>
        <li></li>
      </ul>
      <ul class="addCart">
        <li>
          <button class="add-to-cart">Сагслах</button>
        </li>
        <li>
          <h2></h2>
        </li>
      </ul>
    </div>
  </article>
`;

export default class TravelItem extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }
  connectedCallback() {
    const id = this.getAttribute("data-id");
    const title = this.getAttribute("data-title");
    const image = this.getAttribute("data-image");
    const location = this.getAttribute("data-location");
    const days = this.getAttribute("data-days");
    const price = this.getAttribute("data-price");

    this.shadowRoot.appendChild(template.content.cloneNode(true));
    this.shadowRoot.querySelector("article").setAttribute("data-id", id);
    this.shadowRoot.querySelector("img").src = image;
    this.shadowRoot.querySelector("h3").textContent = title;
    this.shadowRoot.querySelector(".location li:first-child").textContent =
      location;
    this.shadowRoot.querySelector(
      ".location li:last-child"
    ).textContent = `${days} хоног`;
    this.shadowRoot.querySelector(".addCart h2").textContent = `${price}₮`;

    this.shadowRoot
      .querySelector(".add-to-cart")
      .addEventListener("click", () => {
        const addToCartEvent = new CustomEvent("addToCart", {
          detail: { id, title, price },
          bubbles: true,
          composed: true,
        });
        this.dispatchEvent(addToCartEvent);
      });
  }
}

customElements.define("travel-item", TravelItem);
