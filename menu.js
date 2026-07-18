// ==========================================
// Kayaloram Tattukada POS V2
// Module : Menu
// ==========================================

// ===============================
// MENU DATA
// ===============================

let menu = JSON.parse(localStorage.getItem("menu")) || [

    // ☕ Drinks
    { 
      id:1,
      category: "☕ Drinks", name: "Tea", price: 12 },
    { 
      id:2,
      category: "☕ Drinks", name: "Coffee", price: 15 },
    { 
      id:3,
      category: "☕ Drinks", name: "Black Tea", price: 12 },
    { 
      id:4,
      category: "☕ Drinks", name: "Boost", price: 15 },
    { 
      id:5,
      category: "☕ Drinks", name: "Horlicks", price: 15 },
    { 
      id:6,
      category: "☕ Drinks", name: "Badam Milk", price: 20 },
    { 
      id:7,
      category: "☕ Drinks", name: "Milk", price: 12 },

    // 🥟 Snacks
    { 
      id:8,
      category: "🥟 Snacks", name: "Pazampori", price: 12 },
    { 
      id:9,
      category: "🥟 Snacks", name: "Parippu Vada", price: 12 },
    { 
      id:10,
      category: "🥟 Snacks", name: "Chicken Roll", price: 25 },
    { 
      id:11,
      category: "🥟 Snacks", name: "Shawarma Roll", price: 30 },
    { 
      id:12,
      category: "🥟 Snacks", name: "Porotta Roll", price: 30 },

    // 🍗 Chicken
    { 
      id:13,
      category: "🍗 Chicken", name: "Chicken Curry", price: 80 },
    { 
      id:14,
      category: "🍗 Chicken", name: "Chicken Fry", price: 90 },
    { 
      id:15,
      category: "🍗 Chicken", name: "Chicken Kondattam", price: 120 },

    // 🥩 Beef
    { 
      id:16,
      category: "🥩 Beef", name: "Beef Fry", price: 100 },
    { 
      id:17,
      category: "🥩 Beef", name: "Beef Curry", price: 100 },
    { 
      id:18,
      category: "🥩 Beef", name: "Beef Roast", price: 100 },

    // 🐟 Fish
    { 
      id:19,
      category: "🐟 Fish", name: "Fish Fry", price: 100 }

];

// ===============================
// SEARCH
// ===============================

function searchMenu() {

    const text = document
        .getElementById("searchBox")
        .value
        .trim()
        .toLowerCase();

    loadMenu(text);

}

// ===============================
// LOAD MENU
// ===============================

function loadMenu(search = "") {

    const menuDiv = document.getElementById("menu");
    menu.sort((a, b) => {

    const categoryCompare =
        categories.indexOf(a.category) -
        categories.indexOf(b.category);

    if (categoryCompare !== 0) {
        return categoryCompare;
    }

    return a.name.localeCompare(b.name);

});

    let html = "";

categories.forEach(category => {

    const items = menu.filter(item => {

        if (item.category !== category) return false;

        if (
            search &&
            !item.name.toLowerCase().includes(search)
        ) return false;

        return true;

    });

    if (items.length === 0) return;

    html += `
        <h3 class="category">${category}</h3>
    `;

    items.forEach(item => {

        html += `
        <div class="item">

            <span class="itemName">
                ${item.name}
            </span>

            <span class="itemPrice">
                ₹${item.price}
            </span>

            <button onclick="addItem(${item.id})">
                +
            </button>

        </div>
        `;

    });

});

    if (html === "") {

        html = `
        <p style="text-align:center;padding:20px;">
            No items found
        </p>
        `;

    }

    menuDiv.innerHTML = html;

}
if(!localStorage.getItem("menu")){

    localStorage.setItem(
        "menu",
        JSON.stringify(menu)
    );

}