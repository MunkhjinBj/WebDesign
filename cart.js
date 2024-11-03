document.addEventListener("DOMContentLoaded", () => {
    const travels = [
      { id: 1, title: "Тайгын аялал", image: "https://picsum.photos/300", type: "Захиалгаар" },
      { id: 2, title: "Уулын аялал", image: "https://picsum.photos/300", type: "Явган аялал" },
      { id: 3, title: "Нуурын аялал", image: "https://picsum.photos/300", type: "Усан аялал" },
      { id: 4, title: "Majestic travel lol", image: "https://picsum.photos/300", type: "Усан аялал" },
      // Add more travel objects as needed
    ];
  
    const travelContainer = document.querySelector(".travel-grid");
    const cartContainer = document.querySelector(".cart-items");
    const cart = [];
  
    function renderTravels() {
      travelContainer.innerHTML = "";
      travels.forEach(travel => {
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
  
    window.addToCart = function(id) {
      const travel = travels.find(t => t.id === id);
      if (cart.some(item => item.id === id)) {
        alert("This travel is already in the cart.");
        return;
      }
      cart.push(travel);
      renderCart();
    };
  
    function renderCart() {
      cartContainer.innerHTML = "";
      cart.forEach(item => {
        const cartItem = document.createElement("div");
        cartItem.classList.add("cart-item");
  
        cartItem.innerHTML = `
          <h4>${item.title}</h4>
          <button onclick="removeFromCart(${item.id})">Remove</button>
        `;
        cartContainer.appendChild(cartItem);
      });
    }
  
    window.removeFromCart = function(id) {
      const index = cart.findIndex(item => item.id === id);
      if (index !== -1) {
        cart.splice(index, 1);
        renderCart();
      }
    };
  
    // Initialize the travel items on page load
    renderTravels();
  });
  