/* Custom Cursor */
function moveCustomCursor(e) {
  var customCursor = document.querySelector(".custom-cursor");
  if (!customCursor) return; 
  customCursor.style.left = e.pageX + "px";
  customCursor.style.top = e.pageY + "px";
}

  function playGunshot() {
    var gunshot = document.getElementById("gunshot");
    gunshot.play();
  }
document.querySelectorAll(".nav-link").forEach((link) => {
  link.addEventListener("click", (e) => {
    e.preventDefault();
    const audio = document.getElementById("gunshot");
    audio.play();
    audio.addEventListener("ended", () => {
      window.location.href = e.target.href;
    });
  });
});



document.addEventListener("mousemove", moveCustomCursor);

// JavaScript
function setCarouselHeight() {
  const carousel = document.querySelector(".carousel");
  if (!carousel) return; 
  const activeSlide = carousel.querySelector("[data-active] img");
  if (!activeSlide) return; 
  carousel.style.height = activeSlide.offsetHeight + "px";
}

window.addEventListener("resize", setCarouselHeight);

const carouselButtons = document.querySelectorAll(".carousel-button"); 
carouselButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const offset = button.dataset.carouselButton === "next" ? 1 : -1;
    const slides = button.closest("[data-carousel]").querySelector("[data-slides]");

    const activeSlide = slides.querySelector("[data-active]");
    let newIndex = [...slides.children].indexOf(activeSlide) + offset;
    if (newIndex < 0) newIndex = slides.children.length - 1;
    if (newIndex >= slides.children.length) newIndex = 0;

    slides.children[newIndex].dataset.active = true;
    delete activeSlide.dataset.active;
    setCarouselHeight();
  });
});

document.addEventListener("DOMContentLoaded", () => {
  setCarouselHeight();
});

/* Add to cart Producten Merch.html */
document.addEventListener("DOMContentLoaded", () => {
  const cartCounter = document.querySelector('[data-cart-counter]');
  const cartPopup = document.querySelector('[data-cart-popup]');
  const cartItems = document.querySelector('[data-cart-items]');
  const checkoutButton = document.querySelector('[data-checkout]');
  const addToCartButtons = document.querySelectorAll('.add-to-cart');

  let cart = [];

  function updateCartCounter() {
    if (!cartCounter) return; 
    cartCounter.textContent = cart.length;
  }

  function updateCartPopup() {
    if (!cartItems) return; 
    cartItems.innerHTML = '';

    cart.forEach((item, index) => {
      const li = document.createElement('li');
      li.textContent = `${item.name} (Item ${index + 1})`;
      cartItems.appendChild(li);
    });
  }

  addToCartButtons.forEach((button, index) => {
    button.addEventListener("click", () => {
      const product = {
        name: button.getAttribute('data-product'),
        price: parseFloat(button.getAttribute('data-price')),
      };
      cart.push(product);
      updateCartCounter();
      updateCartPopup();
    });
  });

  if (cartCounter && cartPopup) {
    cartCounter.parentElement.addEventListener("click", () => {
      cartPopup.style.display = cartPopup.style.display === "block" ? "none" : "block";
    });
  }

  if (checkoutButton) {
    checkoutButton.addEventListener('click', () => {
      if (cart.length > 0) {
        alert(`You have successfully checked out ${cart.length} item(s)!`);
        cart = [];
        updateCartCounter();
        updateCartPopup();
        if (cartPopup) {
          cartPopup.style.display = 'none';
        }
      } else {
        alert('Uw Winkelwagen Is Op Dit Moment Leeg!');
      }
    });
  }

  updateCartCounter();
  updateCartPopup();
});
