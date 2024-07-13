// // import { deliveryOptionsHTML } from "../scripts/checkout.js";

// const cart = {
//   cartItems : undefined,

//   // loadFromStorage: function(){   this also works
//     loadFromStorage() {
//     cart.cartItems = JSON.parse(localStorage.getItem('cart'));
//     if(!cart){
//       cart.cartItems = [{
//         productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
//         quantity: 2,
//         deliveryOptionId: '3'
//       }];
//     }
//   }
// }

// loadFromStorage();



// // console.log(cart)


// export function addToCart(productId,quantity){
//   let matchingItem;
//   cart.forEach((item)=>{
//     if(productId === item.productId){
//       matchingItem = item;
//     }
//   })

//   if(matchingItem){
//     matchingItem.quantity+=quantity;
//   }else{
//     cart.push({
//       productId,
//       quantity,
//       deliveryOptionId: '1'
//     })
//   }
//   // deliveryOptionsHTML()
//   saveToStorage()
// }

// function saveToStorage(){
//   localStorage.setItem('cart', JSON.stringify(cart));
// }

// export function calculateCartQuantity(){
//   let cartQuantity = 0;
//   cart.forEach((item)=>{
//     cartQuantity+=item.quantity;
//   })
//   return cartQuantity;
// }

// export function removeFromCart(productId){
//   const newCart = [];
//   cart.forEach((cartItem)=>{
//     if(productId !== cartItem.productId){
//       newCart.push(cartItem);
//     }
//   })
//   cart = newCart;
//   saveToStorage();
// }

// export function updateCartQuantity(productId,newQuantity){
//   if(newQuantity<0 || newQuantity>1000){
//     alert("Quantity cannot exceed 1000 or be less than 0. Try again!!");
//     return;
//   }
//   cart.forEach((item) => {
//     let matchingItem;
//     if(productId === item.productId){
//       matchingItem = item;
//       matchingItem.quantity = newQuantity;
//     }
//     saveToStorage();
//     // document.querySelector(`.js-quantity-label-${productId}`).innerHTML = `"${newQuantity}"`;
//   });
// }

// export function updateDeliveryOption(productId, deliveryOptionId){
//   let matchingItem;
//   cart.forEach((item)=>{
//     if(productId === item.productId){
//       matchingItem = item;
//     }
//   });

//   matchingItem.deliveryOptionId = deliveryOptionId; 
//   saveToStorage()
// }