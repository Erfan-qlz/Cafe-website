// تابع برای افزودن به سبد خرید
function addToCart(itemId) {
    console.log('محصول به سبد اضافه شد:', itemId);
    alert('محصول ' + itemId + ' به سبد خرید اضافه شد!');
}

// تابع checkout
function checkout() {
    alert('به صفحه پرداخت منتقل می‌شوید...');
}

// داده‌های محصولات کافه
const menuItems = [
    {
        id: 1,
        name: "اسپرسو",
        description: "قهوه اسپرسو تازه",
        price: 25000,
        image: "https://via.placeholder.com/300x200/92400e/white?text=اسپرسو"
    },
    {
        id: 2,
        name: "کاپوچینو", 
        description: "کاپوچینو با فوم شیر",
        price: 35000,
        image: "https://via.placeholder.com/300x200/92400e/white?text=کاپوچینو"
    },
    {
        id: 3,
        name: "چای مخصوص",
        description: "چای سنتی با طعم خاص",
        price: 15000,
        image: "https://via.placeholder.com/300x200/065f46/white?text=چای"
    }
];

// تابع نمایش منو
function renderMenu() {
    const menuContainer = document.getElementById('menu-container');

    if (!menuContainer) {
        console.log('منوی محصولات پیدا نشد');
        return;
    }

    let html = '';
    menuItems.forEach(item => {
        html += `
            <div class="bg-white rounded-lg shadow-md p-6 mb-6">
                <img src="${item.image}" alt="${item.name}" class="w-full h-48 object-cover rounded-lg mb-4">
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
        `;
    });

    menuContainer.innerHTML = html;
    console.log('منو با موفقیت نمایش داده شد');
}

// وقتی صفحه لود شد
document.addEventListener('DOMContentLoaded', function() {
    console.log('صفحه آماده است');
    renderMenu();
});

// هندل خطاها
window.addEventListener('error', function(e) {
    console.error('خطا:', e.error);
});
