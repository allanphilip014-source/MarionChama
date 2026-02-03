/* --------------------
   HOME PAGE SECTIONS
-------------------- */
function initHome() {
  loadSection("newProducts", p => p.isNew);
  loadSection("saleProducts", p => p.isSale);
  loadSection("popularProducts", p => p.isPopular);
}

function loadSection(containerId, filterFn) {
  const container = document.getElementById(containerId);
  if (!container) return;

  container.innerHTML = "";

  products.filter(filterFn).forEach(p => {
    container.innerHTML += productCard(p);
  });
}

/* --------------------
   CATEGORY PAGES
-------------------- */
function loadCategory(category, containerId) {
  const container = document.getElementById(containerId);
  if (!container) return;

  container.innerHTML = "";

  products
    .filter(p => p.category === category)
    .forEach(p => {
      container.innerHTML += productCard(p);
    });
}

/* --------------------
   PRODUCT CARD
-------------------- */
function productCard(product) {
  return `
    <div class="product">
      <img src="${product.image}" alt="${product.name}">
      <h3>${product.name}</h3>
      <p>KES ${product.price}</p>
      <button onclick="addToCart(${product.id})">Add to Cart</button>
    </div>
  `;
}

/* --------------------
   CART FUNCTIONS
-------------------- */
function addToCart(id) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  const product = products.find(p => p.id === id);

  const item = cart.find(i => i.id === id);
  if (item) {
    item.quantity++;
  } else {
    cart.push({ ...product, quantity: 1 });
  }

  localStorage.setItem("cart", JSON.stringify(cart));
  updateCartCount();
  alert("Product added to cart");
}

function updateCartCount() {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  const count = cart.reduce((sum, item) => sum + item.quantity, 0);

  const cartCount = document.getElementById("cartCount");
  if (cartCount) cartCount.textContent = count;
}

updateCartCount();

/* --------------------
   WHATSAPP CHECKOUT
-------------------- */
function whatsappCheckout() {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  if (cart.length === 0) {
    alert("Your cart is empty");
    return;
  }

  let message = "🛒 *Nova Store Order*%0A%0A";
  let total = 0;

  cart.forEach(item => {
    const subtotal = item.price * item.quantity;
    total += subtotal;
    message += `• ${item.name} x ${item.quantity} = KES ${subtotal}%0A`;
  });

  message += `%0A*Total: KES ${total}*`;

  const phone = "254705457217";
  window.open(`https://wa.me/${phone}?text=${message}`, "_blank");
}
function loadAllProducts(containerId) {
  const container = document.getElementById(containerId);
  container.innerHTML = "";

  products.forEach(p => {
    container.innerHTML += productCard(p);
  });
}
