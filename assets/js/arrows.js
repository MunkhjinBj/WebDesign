const galleryWrapper = document.querySelector('.gallery-wrapper');
const images = document.querySelectorAll('.gallery-wrapper img');
const leftArrow = document.querySelector('.arrow.left');
const rightArrow = document.querySelector('.arrow.right');

let currentIndex = 0; // The index of the currently visible image
const imageWidth = images[0].offsetWidth + 10; // Image width + margin
const totalImages = images.length;
let isDragging = false;
let startX = 0; // Mouse X position at the start of drag
let currentTranslate = 0; // Current translation of the gallery
let prevTranslate = 0; // Previous translation before dragging started

// Function to update the gallery position
function updateGallery(index) {
  currentTranslate = -index * imageWidth;
  galleryWrapper.style.transition = "transform 0.3s ease"; // Smooth transition for snapping
  galleryWrapper.style.transform = `translateX(${currentTranslate}px)`;
  prevTranslate = currentTranslate; // Update previous translate value
}

// Event listeners for the arrow buttons
leftArrow.addEventListener('click', () => {
  if (currentIndex > 0) {
    currentIndex--;
    updateGallery(currentIndex);
  }
});

rightArrow.addEventListener('click', () => {
  if (currentIndex < totalImages - 1) {
    currentIndex++;
    updateGallery(currentIndex);
  }
});

// Dragging functionality
galleryWrapper.addEventListener('mousedown', (e) => {
  isDragging = true;
  startX = e.clientX; // Record starting position of the drag
  galleryWrapper.style.cursor = "grabbing";
  galleryWrapper.style.transition = "none"; // Disable transition during drag
});

galleryWrapper.addEventListener('mousemove', (e) => {
  if (!isDragging) return;
  const currentX = e.clientX;
  const deltaX = currentX - startX; // Difference between current and starting X positions
  currentTranslate = prevTranslate + deltaX;

  // Clamp the translation within bounds
  const maxTranslate = 0; // Stop at the first image
  const minTranslate = -(totalImages - 1) * imageWidth; // Stop at the last image
  if (currentTranslate > maxTranslate) currentTranslate = maxTranslate;
  if (currentTranslate < minTranslate) currentTranslate = minTranslate;

  galleryWrapper.style.transform = `translateX(${currentTranslate}px)`;
});

galleryWrapper.addEventListener('mouseup', stopDragging);
galleryWrapper.addEventListener('mouseleave', stopDragging);

function stopDragging() {
  if (!isDragging) return;
  isDragging = false;
  galleryWrapper.style.cursor = "grab";

  // Snap to the nearest image
  currentIndex = Math.round(-currentTranslate / imageWidth);

  // Ensure index stays within bounds
  if (currentIndex < 0) currentIndex = 0;
  if (currentIndex >= totalImages) currentIndex = totalImages - 1;

  updateGallery(currentIndex); // Snap to the calculated index
}
