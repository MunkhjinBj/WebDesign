document.addEventListener("DOMContentLoaded", async () => {
    const cartItemsContainer = document.getElementById('cart-items');
    const numberOfTravelersInput = document.getElementById('number_of_travelers');
    const travelGrid = document.getElementById('travel-grid');
  
    // Get travel ID from localStorage
    const travelId = localStorage.getItem('selectedTravelId');
  
    // Fetch travel information
    let travelInfo = {};
    try {
      const response = await fetch(`/api/travels/${travelId}`);
      if (response.ok) {
        travelInfo = await response.json();
      } else {
        console.error('Failed to fetch travel information');
      }
    } catch (error) {
      console.error('Error fetching travel information:', error);
    }
  
    // Display travel information using TravelItem component
    travelGrid.innerHTML = `
      <travel-item
        data-id="${travelInfo.id}"
        data-title="${travelInfo.title}"
        data-image="${travelInfo.image}"
        data-location="${travelInfo.location}"
        data-days="${travelInfo.days}"
        data-price="${travelInfo.price}">
      </travel-item>
    `;
  
    // Fetch cart items from localStorage
    let cartItems = [];
    try {
      cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    } catch (error) {
      console.error('Error parsing cart items from localStorage:', error);
      cartItems = [];
    }
  
    // Display cart items
    cartItemsContainer.innerHTML = cartItems.map(item => `
      <div class="cart-item">
        <p>${item.title} - ${item.price}₮</p>
      </div>
    `).join('');
  
    // Handle booking form submission
    document.getElementById('booking-form').addEventListener('submit', async function(event) {
      event.preventDefault();
      const formData = new FormData(this);
      const data = Object.fromEntries(formData.entries());
  
      // Calculate total price based on cart items and number of travelers
      const numberOfTravelers = parseInt(numberOfTravelersInput.value, 10);
      const totalPrice = cartItems.reduce((total, item) => total + item.price, 0) * numberOfTravelers;
      data.total_price = totalPrice;
  
      // Add travel_id and date to the data
      if (cartItems.length > 0) {
        data.travel_id = cartItems[0].id; // Assuming all items in the cart are for the same travel
        data.date = new Date().toISOString().split('T')[0]; // Use current date
      }
  
      try {
        const response = await fetch('/api/bookings', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(data)
        });
  
        if (response.status === 201) {
          document.getElementById('booking-message').textContent = 'Booking successful!';
          // Clear cart after successful booking
          localStorage.removeItem('cartItems');
          localStorage.removeItem('data-total-price');
  
          // Dispatch custom event to reset cart count
          const bookingSuccessfulEvent = new CustomEvent('bookingSuccessful', {
            bubbles: true,
            composed: true,
          });
          document.dispatchEvent(bookingSuccessfulEvent);
        } else {
          const result = await response.json();
          document.getElementById('booking-message').textContent = result.message || 'An error occurred while booking.';
        }
      } catch (error) {
        console.error('Error:', error);
        document.getElementById('booking-message').textContent = 'An error occurred while booking.';
      }
    });
  
    function updateCartDisplay() {
      // Update cart items display
      cartItemsContainer.innerHTML = "<p>Сагс хоосон байна</p>";
    }
  });