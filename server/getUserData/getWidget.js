/* eslint-disable no-undef */
const iframe = document.createElement('iframe');
iframe.src = 'http://localhost:3001/getUserData';

document.body.appendChild(iframe);

let jsonObj = {};
document.querySelectorAll('script[type="application/ld+json"]').forEach((el) => {
  const temObj = JSON.parse(el.innerHTML);
  jsonObj = {
    ...jsonObj,
    ...temObj,
  };
});

document.getElementById('negocjuj_iframe').contentWindow.postMessage({
  product_data: jsonObj,
}, '*');
