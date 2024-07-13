// save data
// generate html
// make interactive

import { cart, removeFromCart, calculateCartQuantity, updateCartQuantity, updateDeliveryOption } from "../../data/cart.js";
import { getProduct, products } from "../../data/products.js";
import { formatCurrency } from "../utils/money.js";
import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';
import { calculateDeliveryDate, deliveryOptions, getDeliveryOption } from "../../data/deliveryOptions.js";
import { renderPaymentSummary } from "./paymentSummary.js";
import { renderCheckoutHeader } from "./checkoutHeader.js";

// let date = dayjs().add(2, 'day');
// console.log(date)
// console.log(date.format('dddd, MMMM D'));
// console.log(isWeekend(date));

export function renderOrderSummary(){
  let cartHTML = '';
  cart.forEach((cartItem)=>{
    const productId = cartItem.productId;
    const matchingProduct = getProduct(productId)

    console.log(matchingProduct)
    const deliveryOptionId = cartItem.deliveryOptionId;
    const deliveryOption = getDeliveryOption(deliveryOptionId)
    const deliveryDateString = calculateDeliveryDate(deliveryOption)

    cartHTML += `
        <div class="cart-item-container js-cart-item-container-${matchingProduct.id}">
          <div class="delivery-date">
            Delivery date: ${deliveryDateString}
          </div>

          <div class="cart-item-details-grid">
            <img class="product-image"
              src="${matchingProduct.image}">

            <div class="cart-item-details">
              <div class="product-name">
                "${matchingProduct.name}"
              </div>
              <div class="product-price">
                "$${formatCurrency(matchingProduct.priceCents)}"
              </div>
              <div class="product-quantity">
                <span>
                  Quantity: <span class="quantity-label js-quantity-label js-quantity-label-${matchingProduct.id}">"${cartItem.quantity}"</span>
                </span>
                


                <span class="update-quantity-link link-primary js-update-quantity-link" data-product-id="${matchingProduct.id}">
                  Update
                </span>

                <input class="quantity-input js-quantity-input-${matchingProduct.id}">

                <span class="save-quantity-link link-primary js-save-quantity-link" data-product-id="${matchingProduct.id}">Save</span>



                <span class="delete-quantity-link link-primary js-delete-link" data-product-id="${matchingProduct.id}">
                  Delete
                </span>  
              </div>
            </div>

            <div class="delivery-options">
              <div class="delivery-options-title">
                Choose a delivery option:
              </div>
              ${deliveryOptionsHTML(matchingProduct,cartItem)}
            </div>
          </div>
        </div>`;
  });

  function deliveryOptionsHTML(matchingProduct,cartItem){
    let deliveryOptionHTML = '';
    deliveryOptions.forEach((deliveryOption) => {
      let priceString = '';
      // const today = dayjs();
      // const deliveryDate = today.add(deliveryOption.deliveryDays, 'days');
      // const deliveryDateString = deliveryDate.format('dddd, MMMM D');
      const deliveryDateString = calculateDeliveryDate(deliveryOption)
      const price = deliveryOption.priceCents;
      if(price === 0){
        priceString = 'FREE';
      } else {
        priceString = price
        priceString = `$${formatCurrency(price)}`;
      }
      // console.log(priceString)
      let isChecked;
      console.log(`This is cartitem:${cartItem}`)
      if(cartItem.deliveryOptionId === deliveryOption.id)
        isChecked = true;
      else 
      isChecked = false;
      deliveryOptionHTML+=
        `
        <div class="delivery-option js-delivery-option" data-product-id=${matchingProduct.id} data-delivery-option-id="${deliveryOption.id}">
          <input type="radio" ${isChecked ? 'checked':''}
            class="delivery-option-input"
            name="delivery-option-${matchingProduct.id}">
          <div>
            <div class="delivery-option-date">
              ${deliveryDateString}
            </div>
            <div class="delivery-option-price">
              ${priceString} - Shipping
            </div>
          </div>
        </div>
        `
        // console.log(deliveryOptionHTML);
        
        // document.querySelector('.delivery-option').innerHTML = deliveryOptionHTML

    });
    return deliveryOptionHTML;
  }

  document.querySelector('.js-order-summary').innerHTML = cartHTML; 
  document.querySelectorAll('.js-delete-link')
    .forEach((link)=>{
      link.addEventListener('click',()=>{
        const productId = link.dataset.productId;
        removeFromCart(productId);
        
        // const container = document.querySelector(`.js-cart-item-container-${productId}`);
        // container.remove();
        renderOrderSummary()
        renderCheckoutHeader()
        renderPaymentSummary()
        console.log(cart)
      })
    })

  document.querySelectorAll('.js-update-quantity-link')
    .forEach((link)=>{
      link.addEventListener('click',()=>{
        // console.log("hello")
        const productId = link.dataset.productId;
        const container = document.querySelector(`.js-cart-item-container-${productId}`);
        console.log("hello");
        container.classList.add('is-editing-quantity')
      })
    })

    

  document.querySelectorAll('.js-save-quantity-link')
    .forEach((link)=>{
      link.addEventListener('click', ()=>{
        const productId = link.dataset.productId;
        console.log(productId)
        const container = document.querySelector(`.js-cart-item-container-${productId}`);
        container.classList.remove('is-editing-quantity')
        const newQuantity = Number(document.querySelector(`.js-quantity-input-${productId}`).value);
        // console.log(newQuantity)
        document.querySelector(`.js-quantity-input-${productId}`).value = ''
        updateCartQuantity(productId,newQuantity);

        renderOrderSummary();
        renderPaymentSummary();
        renderCheckoutHeader()
        console.log(cart);

      })
      
    })
    
    document.querySelectorAll('.js-delivery-option').forEach((element)=>{
      element.addEventListener('click',()=>{
        const {productId, deliveryOptionId} = element.dataset
        updateDeliveryOption(productId, deliveryOptionId)
        renderOrderSummary();
        renderPaymentSummary()
      })
    })
}