
// ESTADO DE LA APLICACIÓN

let products = [];
let cart = [];
let currentCategory = 'todos';
let editingProductId = null;


// PRODUCTOS INICIALES
const initialProducts = [
    {
        id: 1,
        name: "corazon del Zocalo",
        price: 2500000,
        category: 'anillos',
        image: "../JOYAS-CAM/imagenes/corazon_zocalo.jpeg",
        description: 'Inspirado en el centro ceremonial y corazón de la cultura Muisca, con el cuarzo representando su claridad espiritual y los zafiros el brillo de las lagunas sagradas.'

    },
    {
        id: 2,
        name: 'set Daba',
        price: 890000,
        category: 'sets',
        image: '../joyas-cam/imagenes/set_daba.jpeg',
        description: 'De la cultura zenú, Significa "Tierra". Ideal para la conexión del oro con los elementos y el fondo verde.'
    },
    {
        id: 3,
        name: 'Aretes Esmeraldas',
        price: 1200000,
        category: 'aretes',
        image: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=500',
        description: 'Aretes en oro amarillo con esmeraldas naturales'
    },
    {
        id: 4,
        name: 'Pulsera Oro Rosa',
        price: 650000,
        category: 'pulseras',
        image: 'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=500',
        description: 'Pulsera minimalista en oro rosa 14k'
    },
    {
        id: 6,
        name: 'Collar Cadena Oro',
        price: 450000,
        category: 'collares',
        image: 'https://images.unsplash.com/photo-1506630448388-4e683c67ddb0?w=500',
        description: 'Cadena clásica en oro amarillo 18k'
    }
];


// INICIALIZACIÓN

document.addEventListener('DOMContentLoaded', function() {
    loadProducts();
    setupEventListeners();
    renderProducts();
});

// ============================================
// CONFIGURAR EVENT LISTENERS
// ============================================
function setupEventListeners() {
    // Mobile menu
    document.getElementById('menuBtn').addEventListener('click', toggleMobileMenu);
    document.getElementById('closeMenuBtn').addEventListener('click', toggleMobileMenu);
    document.getElementById('mobileAdminBtn').addEventListener('click', function() {
        toggleMobileMenu();
        toggleAdminPanel();
    });
    document.getElementById('mobileCartBtn').addEventListener('click', function() {
        toggleMobileMenu();
        toggleCart();
    });

    // Cart buttons
    document.getElementById('cartBtn').addEventListener('click', toggleCart);
    document.getElementById('closeCartBtn').addEventListener('click', toggleCart);
    document.getElementById('checkoutBtn').addEventListener('click', handleCheckout);

    // Admin buttons
    document.getElementById('adminBtn').addEventListener('click', toggleAdminPanel);
    document.getElementById('closeAdminBtn').addEventListener('click', toggleAdminPanel);
    document.getElementById('saveProductBtn').addEventListener('click', saveProduct);
    document.getElementById('cancelEditBtn').addEventListener('click', cancelEdit);

    // Category buttons
    document.querySelectorAll('.category-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            document.querySelectorAll('.category-btn').forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            currentCategory = this.dataset.category;
            renderProducts();
        });
    });
}

// GESTIÓN DE PRODUCTOS

function loadProducts() {
    const stored = localStorage.getItem('jewelry-products');
    if (stored) {
        products = JSON.parse(stored);
    } else {
        products = initialProducts;
        saveProductsToStorage();
    }
}

function saveProductsToStorage() {
    localStorage.setItem('jewelry-products', JSON.stringify(products));
}

function renderProducts() {
    const grid = document.getElementById('productsGrid');
    const filtered = currentCategory === 'todos' 
        ? products 
        : products.filter(p => p.category === currentCategory);

    grid.innerHTML = filtered.map(product => `
        <div class="product-card">
            <img src="${product.image}" alt="${product.name}" class="product-image">
            <div class="product-info">
                <h3 class="product-name">${product.name}</h3>
                <p class="product-description">${product.description}</p>
                <div class="product-footer">
                    <span class="product-price">$${formatPrice(product.price)}</span>
                    <button class="add-to-cart-btn" onclick="addToCart(${product.id})">
                        <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
                        </svg>
                        Agregar
                    </button>
                </div>
            </div>
        </div>
    `).join('');
}


// GESTIÓN DEL CARRITO

function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;

    const existing = cart.find(item => item.id === productId);
    if (existing) {
        existing.quantity++;
    } else {
        cart.push({ ...product, quantity: 1 });
    }

    updateCartDisplay();
}

function updateQuantity(productId, change) {
    const item = cart.find(i => i.id === productId);
    if (!item) return;

    item.quantity += change;
    if (item.quantity <= 0) {
        removeFromCart(productId);
    } else {
        updateCartDisplay();
    }
}

function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    updateCartDisplay();
}

function updateCartDisplay() {
    const cartCount = document.getElementById('cartCount');
    const mobileCartCount = document.getElementById('mobileCartCount');
    const cartItems = document.getElementById('cartItems');
    const cartFooter = document.getElementById('cartFooter');
    const cartTotal = document.getElementById('cartTotal');

    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    
    // Update cart count
    if (totalItems > 0) {
        cartCount.textContent = totalItems;
        cartCount.classList.remove('hidden');
        mobileCartCount.textContent = totalItems;
    } else {
        cartCount.classList.add('hidden');
        mobileCartCount.textContent = '0';
    }

    // Update cart items
    if (cart.length === 0) {
        cartItems.innerHTML = `
            <div class="empty-cart">
                <svg class="empty-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 002 1.61h9.72a2 2 0 002-1.61L23 6H6"/>
                </svg>
                <p>Tu carrito está vacío</p>
            </div>
        `;
        cartFooter.classList.add('hidden');
    } else {
        cartItems.innerHTML = cart.map(item => `
            <div class="cart-item">
                <img src="${item.image}" alt="${item.name}" class="cart-item-image">
                <div class="cart-item-info">
                    <h3 class="cart-item-name">${item.name}</h3>
                    <p class="cart-item-price">$${formatPrice(item.price)}</p>
                    <div class="cart-item-controls">
                        <button class="quantity-btn" onclick="updateQuantity(${item.id}, -1)">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <line x1="5" y1="12" x2="19" y2="12"/>
                            </svg>
                        </button>
                        <span class="quantity">${item.quantity}</span>
                        <button class="quantity-btn" onclick="updateQuantity(${item.id}, 1)">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
                            </svg>
                        </button>
                        <button class="remove-btn" onclick="removeFromCart(${item.id})">
                            <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2"/>
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
        `).join('');
        
        const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        cartTotal.textContent = '$' + formatPrice(total);
        cartFooter.classList.remove('hidden');
    }
}

function handleCheckout() {
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    alert('Redirigiendo a pasarela de pago...\n\nEn producción aquí se integraría:\n- Stripe\n- PayU\n- Mercado Pago\n- etc.\n\nTotal: $' + formatPrice(total));
}

// ============================================
// PANEL DE ADMINISTRACIÓN
// ============================================
function saveProduct() {
    const name = document.getElementById('productName').value;
    const price = parseFloat(document.getElementById('productPrice').value);
    const category = document.getElementById('productCategory').value;
    const image = document.getElementById('productImage').value;
    const description = document.getElementById('productDescription').value;

    if (!name || !price || !image || !description) {
        alert('Por favor completa todos los campos');
        return;
    }

    const product = {
        id: editingProductId || Date.now(),
        name,
        price,
        category,
        image,
        description
    };

    if (editingProductId) {
        const index = products.findIndex(p => p.id === editingProductId);
        products[index] = product;
    } else {
        products.push(product);
    }

    saveProductsToStorage();
    renderProducts();
    renderAdminProducts();
    clearProductForm();
}

function editProduct(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;

    document.getElementById('productName').value = product.name;
    document.getElementById('productPrice').value = product.price;
    document.getElementById('productCategory').value = product.category;
    document.getElementById('productImage').value = product.image;
    document.getElementById('productDescription').value = product.description;

    editingProductId = productId;
    document.getElementById('formTitle').textContent = 'Editar Producto';
    document.getElementById('saveProductBtn').textContent = 'Actualizar';
    document.getElementById('cancelEditBtn').classList.remove('hidden');
}

function deleteProduct(productId) {
    if (!confirm('¿Estás seguro de eliminar este producto?')) return;

    products = products.filter(p => p.id !== productId);
    saveProductsToStorage();
    renderProducts();
    renderAdminProducts();
}

function cancelEdit() {
    clearProductForm();
}

function clearProductForm() {
    document.getElementById('productName').value = '';
    document.getElementById('productPrice').value = '';
    document.getElementById('productCategory').value = 'anillos';
    document.getElementById('productImage').value = '';
    document.getElementById('productDescription').value = '';
    
    editingProductId = null;
    document.getElementById('formTitle').textContent = 'Agregar Nuevo Producto';
    document.getElementById('saveProductBtn').textContent = 'Agregar';
    document.getElementById('cancelEditBtn').classList.add('hidden');
}

function renderAdminProducts() {
    const list = document.getElementById('adminProductsList');
    const count = document.getElementById('productCount');
    
    count.textContent = products.length;
    
    list.innerHTML = products.map(product => `
        <div class="admin-product-item">
            <img src="${product.image}" alt="${product.name}" class="admin-product-image">
            <div class="admin-product-info">
                <h4 class="admin-product-name">${product.name}</h4>
                <p class="admin-product-price">$${formatPrice(product.price)}</p>
            </div>
            <div class="admin-product-actions">
                <button class="btn btn-edit" onclick="editProduct(${product.id})">Editar</button>
                <button class="btn btn-delete" onclick="deleteProduct(${product.id})">Eliminar</button>
            </div>
        </div>
    `).join('');
}

// ============================================
// TOGGLE FUNCIONES
// ============================================
function toggleMobileMenu() {
    const menu = document.getElementById('mobileMenu');
    menu.classList.toggle('hidden');
}

function toggleCart() {
    const cart = document.getElementById('cartSidebar');
    cart.classList.toggle('hidden');
}

function toggleAdminPanel() {
    const panel = document.getElementById('adminPanel');
    panel.classList.toggle('hidden');
    if (!panel.classList.contains('hidden')) {
        renderAdminProducts();
    }
}

// ============================================
// UTILIDADES
// ============================================
function formatPrice(price) {
    return price.toLocaleString('es-CO');
}

// ============================================
// HACER FUNCIONES GLOBALES
// ============================================
window.addToCart = addToCart;
window.updateQuantity = updateQuantity;
window.removeFromCart = removeFromCart;
window.editProduct = editProduct;
window.deleteProduct = deleteProduct;