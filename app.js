// داده‌های پیش‌فرض منو
const defaultMenuItems = [
    {
        id: 1,
        name: "فیله سوخاری",
        price: 85000,
        image: "images/file.jpg",
        description: "توضیحات",
        category: "غذای اصلی",
        ingredients: ["ترکیبیات"]
    },
    {
        id: 2,
        name: "ران سوخاری", 
        price: 120000,
        image: "images/ran.jpg",
        description: "توضیحات",
        category: "غذای اصلی",
        ingredients: ["ترکیبیات"]
    }
];

let menuItems = [];
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// دریافت منو از سرور
async function loadMenuFromServer() {
    try {
        const response = await fetch('http://localhost:3001/api/products');
        const serverMenuItems = await response.json();
        return serverMenuItems;
    } catch (error) {
        console.error('خطا در دریافت منو:', error);
        return defaultMenuItems;
    }
}

// نمایش منو
async function renderMenu() {
    const menuContainer = document.getElementById('menu-container');
    menuContainer.innerHTML = '<p class="text-center py-8">در حال دریافت منو...</p>';
    
    menuItems = await loadMenuFromServer();
    
    menuContainer.innerHTML = '';
    menuItems.forEach(item => {
        const productCard = 
            <div class="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
                <img src="${item.image}" alt="${item.name}" 
                     class="w-full h-48 object-cover"
                     onerror="this.src='https://via.placeholder.com/300x200/10b981/white?text=${item.name}'">
                <div class="p-6">
                    <h3 class="text-xl font-bold text-gray-800">${item.name}</h3>
                    <p class="text-gray-600 mt-2">${item.description}</p>
                    <div class="flex justify-between items-center mt-4">
                        <span class="text-2xl font-bold text-green-600">${item.price.toLocaleString()} تومان</span>
                        <button onclick="addToCart(${item.id})" 
                                class="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors">
                            افزودن به سبد
                        </button>
                    </div>
                </div>
            </div>
        ;
        menuContainer.innerHTML += productCard;
    });
}

// اضافه کردن به سبد خرید
function addToCart(productId) {
    const product = menuItems.find(item => item.id === productId);
    const existingItem = cart.find(item => item.id === productId);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            ...product,
            quantity: 1
        });
    }
    
    localStorage.setItem('cart', JSON.stringify(cart));
    renderCart();
    updateCartCount();
    showNotification(product.name + ' به سبد خرید اضافه شد');
}

// نمایش سبد خرید
function renderCart() {
    const cartItemsContainer = document.getElementById('cart-items');
    const cartTotalElement = document.getElementById('cart-total');
    
    cartItemsContainer.innerHTML = '';
    
    if (cart.length === 0) {
        cartItemsContainer.innerHTML = '<p class="text-gray-500 text-center">سبد خرید شما خالی است</p>';
        cartTotalElement.textContent = '0';
        return;
    }
    
    cart.forEach(item => {
        const cartItemHTML = `
            <div class="flex justify-between items-center border-b border-gray-200 py-3">
                <div class="flex-1">
                    <h4 class="font-bold">${item.name}</h4>
                    <div class="flex items-center gap-2 mt-1">
                        <button onclick="decreaseQuantity(${item.id})" class="bg-gray-200 w-6 h-6 rounded">-</button>
                        <span class="mx-2">${item.quantity}</span>
                    <button onclick="increaseQuantity(${item.id})" class="bg-gray-200 w-6 h-6 rounded">+</button>
                    </div>
                </div>
                <div class="text-left">
                    <span class="block font-bold">${(item.price * item.quantity).toLocaleString()} تومان</span>
                    <button onclick="removeFromCart(${item.id})" class="text-red-500 text-sm">حذف</button>
                </div>
            </div>
        `;
        cartItemsContainer.innerHTML += cartItemHTML;
    });
    
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    cartTotalElement.textContent = total.toLocaleString();
}

function increaseQuantity(productId) {
    const item = cart.find(item => item.id === productId);
    if (item) {
        item.quantity += 1;
        localStorage.setItem('cart', JSON.stringify(cart));
        renderCart();
        updateCartCount();
    }
}

function decreaseQuantity(productId) {
    const item = cart.find(item => item.id === productId);
    if (item && item.quantity > 1) {
        item.quantity -= 1;
    } else {
        removeFromCart(productId);
        return;
    }
    localStorage.setItem('cart', JSON.stringify(cart));
    renderCart();
    updateCartCount();
}

function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    localStorage.setItem('cart', JSON.stringify(cart));
    renderCart();
    updateCartCount();
    showNotification('آیتم از سبد خرید حذف شد');
}

function updateCartCount() {
    const cartCount = document.getElementById('cart-count');
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCount.textContent = totalItems;
}

function checkout() {
    if (cart.length === 0) {
        showNotification('سبد خرید شما خالی است', 'error');
        return;
    }
    
    const customerName = prompt('نام و نام خانوادگی:');
    const customerPhone = prompt('شماره تلفن:');
    const customerAddress = prompt('آدرس تحویل:');
    
    if (customerName && customerPhone && customerAddress) {
        showNotification('سفارش شما ثبت شد! به زودی با شما تماس می‌گیریم.', 'success');
        cart = [];
        localStorage.setItem('cart', JSON.stringify(cart));
        renderCart();
        updateCartCount();
        document.getElementById('cart-sidebar').classList.add('hidden');
    }
}

function showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    notification.className = 'fixed top-4 right-4 p-4 rounded-lg shadow-lg text-white z-50 ' + 
        (type === 'success' ? 'bg-green-500' : 'bg-red-500');
    notification.textContent = message;
    document.body.appendChild(notification);
    setTimeout(() => {
        notification.remove();
    }, 3000);
}

// وقتی صفحه لود شد
document.addEventListener('DOMContentLoaded', function() {
    renderMenu();
    renderCart();
    updateCartCount();
    
    document.getElementById('cart-toggle').addEventListener('click', function() {
        const cartSidebar = document.getElementById('cart-sidebar');
        cartSidebar.classList.toggle('hidden');
    });
});

function addSearchFunctionality() {
    const searchInput = document.createElement('input');
    searchInput.placeholder = 'جستجو در منو...';
    searchInput.className = 'w-full p-3 border border-gray-300 rounded-lg mb-6';
    searchInput.onkeyup = function(e) {
        const searchTerm = e.target.value.toLowerCase();
        const filteredItems = menuItems.filter(item => 
            item.name.toLowerCase().includes(searchTerm) ||
            item.description.toLowerCase().includes(searchTerm)
        );
        renderFilteredMenu(filteredItems);
    };
    
    const menuContainer = document.getElementById('menu-container');
    menuContainer.parentNode.insertBefore(searchInput, menuContainer);
}

function addCategoryFilter() {
    const categories = [...new Set(menuItems.map(item => item.category))];
    const categoryHTML = 
        <div class="flex gap-2 mb-6 overflow-x-auto">
            <button class="category-btn bg-green-600 text-white px-4 py-2 rounded-lg" data-category="all">
                همه
            </button>
            ${categories.map(cat => 
                <button class="category-btn bg-gray-200 px-4 py-2 rounded-lg" data-category="${cat}">
                    ${cat}
                </button>
            ).join('')}
        </div>
    ;
    
    const menuContainer = document.getElementById('menu-container');
    menuContainer.insertAdjacentHTML('beforebegin', categoryHTML);
    
    // اضافه کردن event listener برای دکمه‌ها
    document.querySelectorAll('.category-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const category = this.dataset.category;
            const filtered = category === 'all' ? menuItems : menuItems.filter(item => item.category === category);
            renderFilteredMenu(filtered);
        });
    });
}
