document.addEventListener("DOMContentLoaded", () => {
  const day = [
    { id: 1, name: 1 },
    { id: 2, name: 2 },
    { id: 4, name: 4 },
    { id: 5, name: 5 },
  ];

  const destinationtype = [
    { id: 1, type: "Адал явдалт" },
    { id: 2, type: "Тайван амралт" },
    { id: 3, type: "Соёлын аялал" },
    { id: 4, type: "Гэр бүлд зориулсан" },
    { id: 5, type: "Романтик" },
  ];

  const travels = [
    {
      id: 1,
      title: "Хөвсгөл нуурын аялал",
      image: "./images/Khuvsgul lake.jpg",
      type: "Адал явдалт",
      startDate: "2024-06-24",
      finishDate: "2024-06-26",
      date: 2,
      status: "Боломжтой",
    },
    {
      id: 2,
      title: "Говь гурван сайхан",
      image: "./images/Gobi desert.jpg",
      type: "Тайван амралт",
      startDate: "2024-07-10",
      finishDate: "2024-07-15",
      date: 5,
      status: "Дууссан",
    },
    {
      id: 3,
      title: "Тэрэлжийн аялал",
      image: "https://picsum.photos/300",
      type: "Гэр бүлд зориулсан",
      startDate: "2024-05-01",
      finishDate: "2024-05-03",
      date: 3,
      status: "Шинэ",
    },

    {
      id: 2,
      title: "Говь гурван сайхан",
      image: "https://picsum.photos/300",
      type: "Тайван амралт",
      startDate: "2024-07-10",
      finishDate: "2024-07-15",
      date: 5,
      status: "Дууссан",
    },
    {
      id: 4,
      title: "Орхоны хөндийн соёлын аялал",
      image: "https://picsum.photos/300",
      type: "Соёлын аялал",
      startDate: "2024-08-12",
      finishDate: "2024-08-14",
      date: 3,
      status: "Шинэ",
    },
    {
      id: 5,
      title: "Хустайн нурууны  аялал",
      image: "https://picsum.photos/300",
      type: "Романтик",
      startDate: "2024-09-01",
      finishDate: "2024-09-03",
      date: 3,
      status: "Боломжтой",
    },
  ];

  const travelContainer = document.querySelector(".travel-grid");
  const cartContainer = document.querySelector(".cart-items");
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  const filters = { days: [], types: [] };

  function renderTravels(travelsToRender = travels) {
    travelContainer.innerHTML = "";
    if (travelsToRender.length === 0) {
      travelContainer.innerHTML = "<p>Уучлаарай аялал олдсонгүй.</p>";
      return;
    }

    travelsToRender.forEach((travel) => {
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

  // Render Cart
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

  // Add to Cart
  window.addToCart = function (id) {
    const travel = travels.find((t) => t.id === id);
    if (cart.some((item) => item.id === id)) {
      alert("This travel is already in the cart.");
      return;
    }
    cart.push(travel);
    localStorage.setItem("cart", JSON.stringify(cart));
    renderCart();
  };

  // Remove from Cart
  window.removeFromCart = function (id) {
    const index = cart.findIndex((item) => item.id === id);
    if (index !== -1) {
      cart.splice(index, 1);
      localStorage.setItem("cart", JSON.stringify(cart));
      renderCart();
    }
  };

  // Filter Travels
  function filterTravels() {
    const filteredTravels = travels.filter(
      (travel) =>
        (!filters.days.length || filters.days.includes(travel.date)) &&
        (!filters.types.length || filters.types.includes(travel.type))
    );
    renderTravels(filteredTravels);
  }

  // Dynamic Filter Setup
  const daysContainer = document.querySelector(".filter-group.days");
  day.forEach(({ id, name }) => {
    daysContainer.innerHTML += `<label><input type="checkbox" value="${id}" /> ${name}</label>`;
  });

  const typesContainer = document.querySelector(".filter-group.types");
  destinationtype.forEach(({ type }) => {
    typesContainer.innerHTML += `<label><input type="checkbox" value="${type}" /> ${type}</label>`;
  });

  document.querySelectorAll(".filter-group input").forEach((checkbox) => {
    checkbox.addEventListener("change", (e) => {
      const value = e.target.value;
      const isChecked = e.target.checked;

      if (e.target.closest(".days")) {
        isChecked
          ? filters.days.push(Number(value))
          : filters.days.splice(filters.days.indexOf(Number(value)), 1);
      }

      if (e.target.closest(".types")) {
        isChecked
          ? filters.types.push(value)
          : filters.types.splice(filters.types.indexOf(value), 1);
      }

      filterTravels();
    });
  });

  // Clear Filters
  document.getElementById("clear-filters").addEventListener("click", () => {
    filters.days = [];
    filters.types = [];
    document.querySelectorAll(".filter-group input").forEach((input) => {
      input.checked = false;
    });
    renderTravels();
  });

  // Initial Rendering
  renderTravels();
  renderCart();
});
