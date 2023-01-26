(() => {
  const params = new URLSearchParams(window.location.search)
  document.getElementById('orderId').textContent = params.get('orderId')
})()


// order.innerText = new Date().getTime()
// console.log(order);