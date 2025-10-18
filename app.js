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
        name: "فیله سوخاری",
        description: "توضیحات",
        price: 25000,
        image: "images/file.jpg"
    },
    {
        id: 2,
        name: "قارچ سوخاری", 
        description: "توضیحات",
        price: 35000,
        image: "images/gharch.jpg"
    },
    {
        id: 3,
        name: "بال سوخاری",
        description: "نوضیحات",
        price: 15000,
        image: "images/ball.jpg"
    },
    {
        id: 4,
        name: "ران سوخاری",
        description: "نوضیحات",
        price: 15000,
        image: "images/ran.jpg"
    },
    {
        id: 5,
        name: "سالاد",
        description: "نوضیحات",
        price: 15000,
        image: "images/salad.jpg"
    },
    {
        id: 6,
        name: "سیب زمینی",
        description: "نوضیحات",
        price: 15000,
        image: "images/sibsokh.jpg"
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
