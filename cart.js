document.addEventListener("DOMContentLoaded", () => {
  const travels = [
    {
      id: 1,
      title: "Хөвсгөл нуур",
      image: "./images/Khuvsgul lake.jpg",
      type: "Захиалгаар",
      startDate: "2024-06-24",
      finishDate: "2024-06-26",
      date: "2",
      status: "",
    },
    {
      id: 2,
      title: "Хонгорын элс",
      image: "./images/Gobi desert.jpg",
      type: "Явган аялал",
      startDate: "2024-06-04",
      finishDate: "2024-06-08",
      date: "4",
      status: "",
    },
    {
      id: 3,
      title: "Нуурын аялал",
      image: "https://picsum.photos/300",
      type: "Усан аялал",
      startDate: "2024-06-24",
      finishDate: "2024-06-26",
      date: "5",
      status: "",
    },
    {
      id: 4,
      title: "Ёлын ам",
      image: "./images/Orkhon valley.jpg",
      type: "Усан аялал",
      startDate: "2024-07-12",
      finishDate: "2024-07-14",
      date: "2",
      status: "",
    },
    {
      id: 5,
      title: "Ёлын ам",
      image: "./images/Orkhon valley.jpg",
      type: "Усан аялал",
      startDate: "2024-07-12",
      finishDate: "2024-07-14",
      date: "2",
      status: "",
    },
    {
      id: 6,
      title: "Ёлын ам",
      image: "./images/Orkhon valley.jpg",
      type: "Усан аялал",
      startDate: "2024-07-12",
      finishDate: "2024-07-14",
      date: "2",
      status: "",
    },
    // Add more travel objects as needed
  ];

  const travelContainer = document.querySelector(".travel-grid");
  const cartContainer = document.querySelector(".cart-items");
  const cart = JSON.parse(localStorage.getItem("cart")) || [];

  function renderTravels() {
    travelContainer.innerHTML = "";
    travels.forEach((travel) => {
      const travelItem = document.createElement("article");
      travelItem.classList.add("travel-item");

      travelItem.innerHTML = `
          <img src="${travel.image}" alt="${travel.title}">
          <h3>${travel.title}</h3>
          <p>${travel.type}</p>
          <button onclick="addToCart(${travel.id})">Add to Cart</button>
        `;
      travelContainer.appendChild(travelItem);
    });
  }

  window.addToCart = function (id) {
    const travel = travels.find((t) => t.id === id);
    if (cart.some((item) => item.id === id)) {
      alert("This travel is already in the cart.");
      return;
    }
    cart.push(travel);
    localStorage.setItem("cart", JSON.stringify(cart)); // Local Storage руу хадгалах
    renderCart();
  };

  function renderCart() {
    cartContainer.innerHTML = "";
    cart.forEach((item) => {
      const cartItem = document.createElement("div");
      cartItem.classList.add("cart-item");

      cartItem.innerHTML = `
          <h4>${item.title}</h4>
          <button onclick="removeFromCart(${item.id})">Remove</button>
        `;
      cartContainer.appendChild(cartItem);
    });
  }

  window.removeFromCart = function (id) {
    const index = cart.findIndex((item) => item.id === id);
    if (index !== -1) {
      cart.splice(index, 1);
      localStorage.setItem("cart", JSON.stringify(cart)); // Local Storage-д шинэчлэлт хийх
      renderCart();
    }
  };

  // Initialize the travel items on page load
  renderTravels();
  renderCart();
});
