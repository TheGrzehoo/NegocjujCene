/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
const dataObj = {};

if (localStorage.getItem('test')) {
  dataObj.login = true;
} else {
  dataObj.login = false;
}

window.top.postMessage(localStorage.getItem('test'), '*');

window.onmessage = (e) => {
  if (e.data.action === 'login') {
    localStorage.setItem('test', e.data.login);
  }
};

const data = {
  // product_data: props.productData,
  price: null,
  email: null,
  // product_sku: props.data.sku,
  // product_name: props.data.name,
};
const priceHandler = (event) => {
  data.price = event.target.value;
};
const emailHandler = (event) => {
  data.email = event.target.value;
};

const responseFormHandler = (obj) => {
  if (obj.status === 200) {
    console.log(obj);
  }
};
const submitHandler = (event) => {
  event.preventDefault();
  data.date = new Date().toJSON().slice(0, 10);
  const xhr = new XMLHttpRequest();
  xhr.open('POST', '/api/negotiations/place_offer');
  xhr.setRequestHeader('Content-Type', 'application/json');
  xhr.onload = responseFormHandler(xhr);
  xhr.send(JSON.stringify({
    offer_data: data,
  }));
  return false;
};
