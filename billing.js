// ==========================================
// FoodFlow POS V2
// Billing Module
// ==========================================

// Initialize Billing
function initBilling() {
    App.bill = [];
    updateBill();
}

// ==========================================
// Add Item
// ==========================================

function addItem(id) {

    const menuItem = menu.find(item => item.id === id);

    if (!menuItem) return;

    const billItem = App.bill.find(item => item.id === id);

    if (billItem) {

        billItem.qty++;

    } else {

        App.bill.push({
            id: menuItem.id,
            name: menuItem.name,
            price: menuItem.price,
            qty: 1
        });

    }

    updateBill();

}

// ==========================================
// Update Bill
// ==========================================

function updateBill() {

    const billItems = document.getElementById("billItems");
    const totalItems = document.getElementById("totalItems");
    const totalPrice = document.getElementById("totalPrice");

    billItems.innerHTML = "";

    if (App.bill.length === 0) {

        billItems.innerHTML = "<p>No items added</p>";

        totalItems.textContent = 0;
        totalPrice.textContent = 0;

        calculateChange();

        return;
    }

    let itemCount = 0;
    let priceTotal = 0;

    App.bill.forEach(item => {

        itemCount += item.qty;
        priceTotal += item.qty * item.price;

billItems.innerHTML += `
<div class="billRow">

    <div>
        <strong>${item.name}</strong><br>
        ₹${item.price} × ${item.qty}
    </div>

    <div>

        <button onclick="decreaseQty(${item.id})">−</button>

        <span>${item.qty}</span>

        <button onclick="increaseQty(${item.id})">+</button>

    </div>

    <div>
        ₹${item.price * item.qty}
    </div>

</div>
`;

    });

    totalItems.textContent = itemCount;
    totalPrice.textContent = priceTotal;

    calculateChange();

}

// ==========================================
// Increase Quantity
// ==========================================

function increaseQty(id) {

    addItem(id);

}

// ==========================================
// Decrease Quantity
// ==========================================

function decreaseQty(id) {

    const item = App.bill.find(i => i.id === id);

    if (!item) return;

    item.qty--;

    if (item.qty <= 0) {

        App.bill = App.bill.filter(i => i.id !== id);

    }

    updateBill();

}

// ==========================================
// Calculate Change
// ==========================================

function calculateChange() {

    const paid =
        Number(document.getElementById("paidAmount").value) || 0;

    const total = App.bill.reduce((sum, item) => {

        return sum + item.price * item.qty;

    }, 0);

    const change = Math.max(0, paid - total);

    document.getElementById("change").textContent = "₹" + change;

}

// ==========================================
// Clear Bill
// ==========================================

function clearBill() {

    App.bill = [];

    document.getElementById("paidAmount").value = "";

    updateBill();

}
