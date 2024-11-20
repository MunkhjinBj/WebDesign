import Travels, { travelLoader } from "./filter.js";
import Cart, { renderCart } from "./cart.js";

document.addEventListener("DOMContentLoaded", async () => {
  const travelGrid = document.getElementById("travel-grid");
  travelGrid.insertAdjacentHTML(
    "beforeend",
    (await travelLoader()).map((t) => new Travels(t).render()).join("")
  );

  renderCart();
});
