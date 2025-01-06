document.addEventListener("DOMContentLoaded", async () => {
    const cartItemsContainer = document.getElementById('cart-items');
    const numberOfTravelersInput = document.getElementById('number_of_travelers');
  
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
        } else {
          const result = await response.json();
          document.getElementById('booking-message').textContent = result.message || 'An error occurred while booking.';
        }
      } catch (error) {
        console.error('Error:', error);
        document.getElementById('booking-message').textContent = 'An error occurred while booking.';
      }
    });
  });