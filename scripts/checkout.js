import { renderCheckoutHeader } from "./checkout/checkoutHeader.js";
import { renderOrderSummary } from "./checkout/orderSummary.js";
import { renderPaymentSummary } from "./checkout/paymentSummary.js";
// import '../data/backend-practice.js'
import { loadProducts } from "../data/products.js";

// Promise.all([
//   //read it online
// ])

// // promises are class
// new Promise((resolve) => {   
// // as soon as the promise is created this anonymous function runs immediately. it gets a parameter called resolve. resolve is a function. lets us control when we go to the next step.
//   loadProducts(()=>{  
//   //loadProducts is an async function.
//     resolve('value1');   
//   //this is called to go to the next step i.e the then() part of promise. if you remove resolve() the next step wont be called. resolve can take an argument, this argument is then passed onto the next then as a parameter and can be used further.
//   })
// }).then((value)=>{
//   console.log(value)
// })

loadProducts(()=>{
  renderPaymentSummary()
  renderOrderSummary()
  renderCheckoutHeader();
})
