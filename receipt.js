/* ==========================================
   FoodFlowPOS V4
   receipt.js
========================================== */

const Restaurant =
JSON.parse(localStorage.getItem("restaurantSettings")) || {

    name: "KAYALORAM TATTUKADA",

    address: "Kannur, Kerala",

    phone: "7356737186",

    footer: "🙏 Thank You! Visit Again ❤️",

    developer: "Farhan RP"

};

function generateBillNumber() {

    return String(App.billNumber).padStart(4, "0");

}

function getCurrentDateTime() {

    const now = new Date();

    return {

        date: now.toLocaleDateString(),

        time: now.toLocaleTimeString()

    };

}

function calculateTotal() {

    return App.bill.reduce((total, item) => {

        return total + (item.price * item.qty);

    }, 0);

}

function getPaymentDetails() {

    const total = calculateTotal();

    const paid = Number(
        document.getElementById("paidAmount").value
    ) || 0;

    return {

        total,

        paid,

        change: Math.max(0, paid - total)

    };

}
/* ==========================================
   Receipt Preview
========================================== */

function buildReceiptHTML() {

    const payment = getPaymentDetails();
    const dateTime = getCurrentDateTime();

    let itemsHTML = "";

    App.bill.forEach(item => {

        itemsHTML += `
        <div style="
            display:flex;
            justify-content:space-between;
            align-items:center;
            margin:4px 0;
            font-size:14px;
        ">
            <span>${item.name} × ${item.qty}</span>
            <strong>₹${item.price * item.qty}</strong>
        </div>
        `;

    });

    return `

<div style="
    font-family:monospace;
    line-height:1.35;
    font-size:14px;
">

<div style="text-align:center">

<h2 style="margin:0;">
${Restaurant.name}
</h2>

<p style="margin:2px 0;">
${Restaurant.address}
</p>

<p style="margin:2px 0;">
📞 ${Restaurant.phone}
</p>

<hr>

<p style="margin:2px 0;">
<strong>Bill #${generateBillNumber()}</strong>
</p>

<p style="margin:2px 0;">
${dateTime.date} ${dateTime.time}
</p>

</div>

<hr>

${itemsHTML}

<hr>

<div style="display:flex;justify-content:space-between;">
<strong>Total</strong>
<strong>₹${payment.total}</strong>
</div>

<div style="display:flex;justify-content:space-between;margin-top:4px;">
<span>Paid</span>
<span>₹${payment.paid}</span>
</div>

<div style="display:flex;justify-content:space-between;margin-top:4px;">
<span>Change</span>
<span>₹${payment.change}</span>
</div>

<hr>

<div style="text-align:center">

<p style="margin:4px 0;">
${Restaurant.footer}
</p>

<small>
Developer : ${Restaurant.developer}
</small>

</div>

</div>

`;

}

function printReceipt() {

    if (App.bill.length === 0) {

        alert("Bill is empty!");
        return;

    }

    document.getElementById("receiptPreview").innerHTML =
        buildReceiptHTML();

    document.getElementById("receiptPopup").style.display =
        "flex";

}

function closeReceipt() {

    document.getElementById("receiptPopup").style.display =
        "none";

}
/* ==========================================
   Final Print
========================================== */

function printFinalReceipt() {

    const receipt =
        document.getElementById("receiptPreview").innerHTML;

    const win = window.open("", "_blank");

    win.document.write(`
<!DOCTYPE html>
<html>
<head>
<title>Receipt</title>

<style>

body{

    font-family:monospace;
    padding:12px;
    max-width:300px;
    margin:auto;
    line-height:1.35;

}

hr{

    border:none;
    border-top:1px dashed #000;
    margin:8px 0;

}

</style>

</head>

<body>

${receipt}

</body>

</html>
`);

    win.document.close();

    win.print();

    /* Save Bill History */

    const history =
        JSON.parse(localStorage.getItem("billHistory")) || [];

    history.unshift({

        billNo: generateBillNumber(),

        date: getCurrentDateTime().date,

        time: getCurrentDateTime().time,

        items: [...App.bill],

        total: calculateTotal()

    });

    localStorage.setItem(
        "billHistory",
        JSON.stringify(history)
    );

    updateDashboard();

    /* Next Bill */

    App.billNumber++;

    localStorage.setItem(
        "billNumber",
        App.billNumber
    );

    /* Reset */

    App.bill = [];

    document.getElementById("paidAmount").value = "";

    closeReceipt();

    renderBill();

}
/* ==========================================
   Restaurant Settings
========================================== */

function openSettings() {

    document.getElementById("restaurantName").value =
        Restaurant.name;

    document.getElementById("restaurantAddress").value =
        Restaurant.address;

    document.getElementById("restaurantPhone").value =
        Restaurant.phone;

    document.getElementById("restaurantFooter").value =
        Restaurant.footer;

    document.getElementById("settingsPopup").style.display =
        "flex";

}

function closeSettings() {

    document.getElementById("settingsPopup").style.display =
        "none";

}

function saveSettings() {

    Restaurant.name =
        document.getElementById("restaurantName").value;

    Restaurant.address =
        document.getElementById("restaurantAddress").value;

    Restaurant.phone =
        document.getElementById("restaurantPhone").value;

    Restaurant.footer =
        document.getElementById("restaurantFooter").value;

    localStorage.setItem(
        "restaurantSettings",
        JSON.stringify(Restaurant)
    );

    alert("✅ Settings Saved!");

    closeSettings();

}

