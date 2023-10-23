'use strict';
const body = document.body;
const btnOpenNavBar = document.querySelector('.btn-logo');
const btnCloseNavBar = document.querySelector('.btn-close');
const nav = document.querySelector('.primary-navigation');
const overlay = document.querySelector('.overlay');
const cart = document.querySelector('.cart');
const cartHover = document.querySelector('.cart-hover');
const productImgs = document.querySelector('.product-imgs');
const sliderButtons = document.querySelector('.leftandright');
const addToCart = document.querySelector('.addToCart');
const cartValue = document.querySelector('.cart-value');
const btnPlus = document.querySelector('.btn-plus');
const btnMinus = document.querySelector('.btn-minus');
const productThumbnails = document.querySelector('.product-thumbnails');
const productOverview = document.querySelector('.product-overview');
const avatar = document.querySelector('.avatar');
const overviewThumbnails = document.querySelector('.overview-thumbnails');
const overviewButton = document.querySelector('.overview-button');

//Functions
// Display
const displayItem = function (item) {
  cart.style.opacity = item;
};
const displayButtons = function (item) {
  item.style.opacity = this;
};

const cartDisplay = function (html) {
  cart.innerHTML = '';
  cart.insertAdjacentHTML('afterbegin', html);
};
// Navigation function
const navigationHandler = function (t, cl, o = 0) {
  nav.style.transform = `translateX(${t}px)`;
  sliderButtons.style.opacity = o;
  overlay.classList.toggle(`${cl}`);
};

// add/remove overview
const toggleOverview = function () {
  overlay.classList.toggle('hidden');
  productOverview.classList.toggle('hidden');
};

// Navigation slide
btnOpenNavBar.addEventListener('click', function (e) {
  navigationHandler(0, 'hidden');
});
btnCloseNavBar.addEventListener('click', function (e) {
  navigationHandler(-200, 'hidden');
});

// Overlay click hidden
overlay.addEventListener('click', function () {
  nav.style.transform = 'translateX(-200px)';

  toggleOverview();
});
sliderButtons.addEventListener(
  'mouseover',
  displayButtons.bind(1, sliderButtons)
);
sliderButtons.addEventListener(
  'mouseleave',
  displayButtons.bind(0, sliderButtons)
);

let sum = 0;

// Adding cart item dynamically
addToCart.addEventListener('click', function (e) {
  const clicked = e.target.closest('.btn-buy');

  if (!clicked) return;

  const html = `
  <p>Cart</p>
      <div class="cart-insert">
        <img
          src="./images/image-product-1-thumbnail.jpg"
          alt=""
          width="50px"
          height="50px"
          class="product-profile"
        />
        <div class="cart-buyout">
          <p>Fall Limited Edition Sneakers</p>
          <p>$125.00 x ${
            +cartValue.value === 0 ? '' : +cartValue.value
          } <span>${+cartValue.value === 0 ? '' : '$'}${
    +cartValue.value * 125.0 === 0 ? '1 $125.00' : +cartValue.value * 125.0
  }</span></p>
        </div>
        <button class="trashcan">
          <img src="./images/icon-delete.svg" alt="" class="trashcan"/>
        </button>
      </div>
       <button class="cart-button">Checkout</button>`;

  cartValue.value = 0;
  sum = 0;
  cartDisplay(html);
});
cart.addEventListener('click', function (e) {
  console.log(e.target);

  if (!e.target.classList.contains('trashcan')) return;

  const html = `
      
  <p>Cart</p>
     
  <p class="empty-cart">Your Cart is empty.</p>`;

  cartDisplay(html);
});

// Increment/decrement on the cart
btnPlus.addEventListener('click', function () {
  sum++;
  cartValue.value = sum;
});

btnMinus.addEventListener('click', function () {
  if (sum === 0) return;
  sum--;
  cartValue.value = sum;
});

// Implementing slider component

const slider = document.querySelectorAll('.slider-image');
const overviewslider = document.querySelectorAll('.overview-images2');
const maxSlider = slider.length;
const maxSlider2 = overviewslider.length;
const btnLeft = document.querySelector('.btn-left');
const btnRight = document.querySelector('.btn-right');
const btnLeftOV = document.querySelector('.btn-overview-left');
const btnRightOV = document.querySelector('.btn-overview-right');

let currentSlide = 0;
let currentSlide2 = 0;

const goToSlide = function (item, slide) {
  item.forEach(
    (el, i) => (el.style.transform = `translateX(${100 * (i - slide)}%)`)
  );
};

goToSlide(slider, 0);
goToSlide(overviewslider, 0);

const nextSlide = function () {
  if (currentSlide === maxSlider - 1) {
    currentSlide = 0;
  } else {
    currentSlide++;
  }
  goToSlide(slider, currentSlide);
};

const prevSlide = function () {
  if (currentSlide === 0) {
    currentSlide = maxSlider - 1;
  } else {
    currentSlide--;
  }
  goToSlide(slider, currentSlide);
};
btnRight.addEventListener('click', nextSlide);

btnLeft.addEventListener('click', prevSlide);

productThumbnails.addEventListener('click', function (e) {
  const targetNumber = e.target.getAttribute('data-version-number');
  goToSlide(slider, targetNumber);
  currentSlide = +targetNumber;
});

productImgs.addEventListener('click', function (e) {
  let screenWidth = window.matchMedia('(min-width: 800px)');
  if (screenWidth.matches) toggleOverview();
  const targetNumber = e.target.getAttribute('data-version-number');
  currentSlide2 = +targetNumber;
  console.log(currentSlide2);
  goToSlide(overviewslider, targetNumber);
});

btnRightOV.addEventListener('click', function () {
  if (currentSlide2 === maxSlider2 - 1) {
    currentSlide2 = 0;
  } else {
    currentSlide2++;
  }

  goToSlide(overviewslider, currentSlide2);
});
btnLeftOV.addEventListener('click', function () {
  if (currentSlide2 === 0) {
    currentSlide2 = maxSlider - 1;
  } else {
    currentSlide2--;
  }
  goToSlide(overviewslider, currentSlide2);
});

avatar.addEventListener('click', function (e) {
  const clicked = e.target.closest('.cart-hover');

  if (!clicked) return;

  if (clicked) cart.classList.toggle('hidden');
  sliderButtons.classList.toggle('hidden');
});

overviewThumbnails.addEventListener('click', function (e) {
  const targetNumber = e.target.getAttribute('data-version-number');

  goToSlide(overviewslider, targetNumber);
});

overviewButton.addEventListener('click', function () {
  toggleOverview();
});
