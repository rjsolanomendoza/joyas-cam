
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
        image: "https://i.imgur.com/kut330D.jpeg",
        description: 'Inspirado en el centro ceremonial y corazón de la cultura Muisca, con el cuarzo representando su claridad espiritual y los zafiros el brillo de las lagunas sagradas.'

    },
    {
        id: 2,
        name: 'set Daba',
        price: 890000,
        category: 'sets',
        image: 'https://i.imgur.com/lGQmIII.jpg',
        description: 'De la cultura zenú, Significa "Tierra". Ideal para la conexión del oro con los elementos y el fondo verde.'
    },
    {
        id: 3,
        name: 'set uli',
        price: 1200000,
        category: 'sets',
        image: 'https://i.imgur.com/JummJmL.jpeg',
        description: 'Palabra de la cultura Emberá, Significa "Arcilla". Ideal para el color rojizo-marrón de las cuentas y el tono terroso de la imagen.'
    },
    {
        id: 4,
        name: 'Sello de los Guardianes',
        price: 650000,
        category: 'collares',
        image: 'https://i.imgur.com/zAcldCI.jpeg',
        description: 'Hace alusión a los Talismanes y la conexión con seres superiores/protectores, muy presente en la cosmovisión indígena que buscaba protección y equilibrio.'
    },
    {
        id: 5,
        name: 'Orejas del Cacique',
        price: 450000,
        category: 'aretes',
        image: "https://i.imgur.com/KpibyP1.jpeg",
        description: 'Inspirado en los grandes ornamentes de oro o tumbaga usados por los líderes (Caciques) y la nobleza, que simbolizaban poder, estatus y conexión con lo divino.'
    },
    {
        id: 6,
        name: "Anillo pashaka ",
        price: 580000,
        category: 'anillos',
        image: 'https://i.imgur.com/rCNNJTF.jpeg',
        description: 'Palabra de la cultura muisca, Nombre dado al "Señor de las Esmeraldas" o al "Rey de las Piedras Preciosas" en la región de Muzo.'

    },
     {
        id: 7,
        name: "Nahual del Sinú",
        price:  560000,
        category: 'collares',
        image: 'https://i.imgur.com/IBAJDTE.jpeg',
        description: 'Se refiere al concepto del Nahual o el espíritu protector animal (como el Jaguar, emblema de fuerza), un tema central en culturas como la Tumaco-La Tolita o Quimbaya.'

    },
    {
        id:  8,
        name: "Pulsera Yaku",
        price:  380000,
        category: 'pulseras',
        image: 'https://i.imgur.com/TWYrt7X.jpeg',
        description: 'Es una palabra de origen Quechua (presente en influencias andinas) que significa "agua". Los ríos y lagunas son centrales en muchas cosmovisiones indígenas.'

    },
    {
        id:  9,
        name: "Ofrenda de los dioses ",
        price:  450000,
        category: 'pulseras',
        image: 'https://i.imgur.com/FX7o2vX.jpeg',
        description: 'Inspirado en las pequeñas ofrendas (como figuras de Sol o Tunjos)'

    },
    {
        id:  10,
        name: "Pulsera tayrona ",
        price:  60000,
        category: 'pulseras',
        image: 'https://i.imgur.com/PUvdXLC.jpeg',
        description: 'Nombre de la antigua civilización y del parque nacional tayrona, que representa la riqueza natural y cultural de la Sierra Nevada.'

    },
    {
        id:  11,
        name: "Collar Caracolí ",
        price:  70000,
        category: 'collares',
        image: 'https://i.imgur.com/NUOG72q.jpeg',
        description: 'Nombre que evoca el caracol, cuya forma espiral es un patrón muy común y simbólico en el arte precolombino'

    },
    {
        id:  12,
        name: "Collar Guatavita",
        price:  334000,
        category: 'collares',
        image: 'https://i.imgur.com/pKSkadK.jpeg',
        description: 'Nombre de la laguna sagrada donde la cultura Muisca realizaba las ceremonias del Dorado, ofrendando oro.'

    },
    {
        id:  13,
        name: "Collar Jaba ",
        price:  780000,
        category: "collares",
        image:"https://i.imgur.com/54UL5oP.jpeg",
        description: 'En la lengua Wayuu, significa "camino" o sendero.'
    },
    {
        id:  13,
        name: "El Cacicazgo Dorado",
        price:  780000,
        category: "collares",
        image:"https://i.imgur.com/Y1hep0x.jpeg",
        description: 'La cultura Muisca utilizaba mucho el oro y representaciones de la vida cíclica y la fertilidad.'
    },
    {
        id:  14,
        name: "Tunjito solar",
        price:  780000,
        category: "collares",
        image:"https://i.imgur.com/KtnWwTn.jpeg",
        description: 'Inspirada en tunjo, que es el nombre popular que se le da a las pequeñas figuras votivas de oro o tumbaga creadas por las culturas precolombinas, especialmente la Muisca. Estas figuras eran ofrendas a los dioses.'
    },
    {
        id:  15,
        name: "Cacique del Oro",
        price:  780000,
        category: "collares",
        image:"https://i.imgur.com/p712RoO.jpeg",
        description: 'Un cacique era el jefe o dignatario. Este nombre resalta el estatus de la figura, que usaría este oro como insignia de poder.'
    },
    {
        id:  16,
        name: "set Huriya",
        price:  780000,
        category: "sets",
        image:"https://i.imgur.com/qKYAzln.jpeg",
        description: 'Es una palabra wayuu, Significa "Oro" o "Tesoro". Alude al metal precioso del pendiente y el brazalete.'
    },
    {
        id:  17,
        name: "Brazalete kareo ",
        price:  780000,
        category: "pulseras",
        image:"https://i.imgur.com/1reIYW6.jpeg",
        description: 'En la lengua Sinu, podría relacionarse con el trabajo del metal o la fuerza. Simboliza el brazalete ancho y robusto.'
    },
    {
        id:  18,
        name: "Kankuamo",
        price:  780000,
        category: "pulseras",
        image:"https://i.imgur.com/pjZqOCE.jpeg",
        description: 'La espiral es un símbolo recurrente en el arte del pueblo Senú/Zenú. Este nombre rinde homenaje a la región y su arte.'
    },
    {
        id:  19,
        name: "Set kankuamo",
        price:  780000,
        category: "sets",
        image: "https://i.imgur.com/iP082q9.jpeg",
        description: ''
    },
    {
        id:  20,
        name: "Set Daire",
        price:  780000,
        category: "sets",
        image:"https://i.imgur.com/xJHgX84.jpeg",
        description: 'Palabra wayuu, Significa "Luz de Sol" o "Radiante". Ideal para el color dorado y el diseño que irradia desde el centro.'
    },

     {
        id:  21,
        name: "Aretes Nari ",
        price:  780000,
        category: "aretes",
        image:"https://i.imgur.com/0hZngZw.jpeg",
        description: 'Un diminutivo de nariguera, la joya ancestral más emblemática de la orfebrería precolombina.'
    },
     {
        id:  22,
        name: "Aretes Sua",
        price:  780000,
        category: "aretes",
        image:"https://i.imgur.com/pdCI4Gn.jpeg",
        description: 'Palabra muisca, donde se utiliza para una variación de las palabras "Sol" o "Astro Rey". Simboliza energía, oro y vida.'
    },
     {
        id:  23,
        name: "Aretes Siatá",
        price:  780000,
        category: "aretes",
        image:"https://i.imgur.com/RT2Yr0a.jpeg",
        description: 'Palabra muisca, Significa "Tierra de la Luna". El calendario Muisca estaba basado en ciclos lunares, simbolizando el tiempo circular.'
    },
     {
        id:  24,
        name: "Aretes esenúa",
        price:  780000,
        category: "aretes",
        image:"https://i.imgur.com/88DeQ7i.jpeg",
        description: 'Significa "Estrella del Cielo". El sol es la estrella principal y parece colgar del cielo.'
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