const xhr = new XMLHttpRequest();
xhr.addEventListener('load',()=>{
  console.log(xhr.response)
});
xhr.open('GET','https://supersimplebackend.dev');
xhr.send(); // this is asynchronous i.e it will not wait for the send to complete, it will move to the next line and execute it.

