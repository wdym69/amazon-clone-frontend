// console.log("hello");

// save the data
// generate the html
// make it interactive
import { addToCart, cart, calculateCartQuantity } from "../data/cart.js";
console.log(cart);
import { products,loadProducts } from "../data/products.js";
import { formatCurrency } from "./utils/money.js";

loadProducts(renderProductsGrid);

function renderProductsGrid(){

  let productsHTML = '';
  products.forEach((product) => {
    productsHTML+= `
          <div class="product-container">
          <div class="product-image-container">
            <img class="product-image"
              src="${product.image}">
          </div>

          <div class="product-name limit-text-to-2-lines">
            ${product.name}
          </div>

          <div class="product-rating-container">
            <img class="product-rating-stars"
              src="images/ratings/rating-${product.rating.stars * 10}.png">
            <div class="product-rating-count link-primary">
              ${product.rating.count}
            </div>
          </div>

          <div class="product-price">
            $${formatCurrency(product.priceCents)}
          </div>

          <div class="product-quantity-container">
            <select class="js-quantity-selector-${product.id}">
              <option selected value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
              <option value="7">7</option>
              <option value="8">8</option>
              <option value="9">9</option>
              <option value="10">10</option>
            </select>
          </div>

          <div class="product-spacer"></div>

          <div class="added-to-cart js-added-to-cart-${product.id}">
            <img src="images/icons/checkmark.png">
            Added
          </div>

          <button class="add-to-cart-button button-primary js-add-to-cart" data-product-id="${product.id}">
            Add to Cart
          </button>
        </div>
    `; 
  });

  console.log(productsHTML) 
  document.querySelector('.js-products-grid').innerHTML = productsHTML

  function displayCartQuantity(){
    const cartQuantity = calculateCartQuantity();
    document.querySelector('.js-cart-quantity').innerHTML = cartQuantity;
  }

  // console.log(calculateCartQuantity());

  // function updateCartQuantity(productId){
  //   calculateCartQuantity();

  // }

  const addedTimeoutIds = {};
  function addedMessage(productId){
    const addedToCart = document.querySelector(`.js-added-to-cart-${productId}`);
    addedToCart.classList.add('added-to-cart-visible');
    const prevTimeout = addedTimeoutIds[productId];
    if(prevTimeout){
      clearTimeout(prevTimeout)
    }
    const timeoutId = setTimeout(()=>{
      addedToCart.classList.remove('added-to-cart-visible');
    },2000)
    addedTimeoutIds[productId] = timeoutId;
  }

  displayCartQuantity()
  document.querySelectorAll('.js-add-to-cart')
    .forEach((button) => {
      button.addEventListener('click', () => {
        const productId = button.dataset.productId;
        const quantity = Number(document.querySelector(`.js-quantity-selector-${productId}`).value);
        
        // quantity = Number(quantity);
        addToCart(productId,quantity);
        addedMessage(productId);
        displayCartQuantity(productId);
        document.querySelector(`.js-quantity-selector-${productId}`).value = '1';

        // console.log(cartQuantity);
        console.log(cart);
        // console.log(cartQuantity)


      })
    })
}