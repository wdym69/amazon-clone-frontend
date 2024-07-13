export function formatCurrency(priceCents){
  return (Math.round(priceCents)/100).toFixed(2);
}


// let p = new Promise((resolve,reject)=>{
//   let a = 1+2;
//   if(a == 2){
//     resolve('Success')
//   }else{
//     reject('Failed')
//   }
// })


// p.then((message)=>{
//   console.log("this is in the then : " + message);
// }).catch((message)=>{
//   console.log("this is in the catch: "+message);
// })



// const promise1 = new Promise((resolve,reject)=>{
//   setTimeout(()=>{
//     let error = true;
//     if(!error){
//       resolve({username:"smth", password:"smthaswell"})
//     }else{
//       reject("something went wrong");
//     }
//   },1000)
// })

// async function consumePromise1(){
//   try {
//     const response = await promise1;
//     console.log(response);
//   } catch (error) {
//     console.log(error);
//   }
  
// }


  


