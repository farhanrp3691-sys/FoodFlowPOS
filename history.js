/* ==========================================
   FoodFlowPOS V3
   history.js
   Phase 1
========================================== */

/* Load Bill History */

function getBillHistory(){

    return JSON.parse(
        localStorage.getItem("billHistory")
    ) || [];

}

/* Save Bill History */

function saveBillHistory(history){

    localStorage.setItem(
        "billHistory",
        JSON.stringify(history)
    );

}

/* Show History Popup */

function showHistory(){

    const history = getBillHistory();
    const search = document.getElementById("historySearch").value.toLowerCase();
const filter = document.getElementById("historyFilter").value;
const sort = document.getElementById("historySort").value;

const today = new Date();

const filteredHistory = history.filter(bill => {
  
  

    const billDate = new Date(bill.date);

    if (
        search &&
        !bill.billNo.toString().includes(search)
    ) {
        return false;
    }

    if (filter === "today") {

    return billDate.toDateString() === today.toDateString();

}

else if (filter === "week") {

    const diff =
        (today - billDate) / (1000 * 60 * 60 * 24);

    return diff >= 0 && diff < 7;

}

else if (filter === "month") {

    return billDate.getMonth() === today.getMonth() &&
           billDate.getFullYear() === today.getFullYear();

}

else if (filter === "all") {

    return true;

}

return true;

});
if (sort === "newest") {

    filteredHistory.sort((a, b) => Number(b.billNo) - Number(a.billNo));

} else {

    filteredHistory.sort((a, b) => Number(a.billNo) - Number(b.billNo));

}

    const historyList =
        document.getElementById("historyList");

    if(filteredHistory.length === 0){

        historyList.innerHTML = `

        <p style="text-align:center">

            No Bills Yet 🧾

        </p>

        `;

    }else{

        historyList.innerHTML = filteredHistory.map((bill,index)=>`

            <div class="historyCard">

                <h3>🧾 Bill #${bill.billNo}</h3>

                <p>📅 ${bill.date}</p>

                <p>🕒 ${bill.time}</p>

                <p>💰 ₹${bill.total}</p>

                <div class="historyButtons">

                    <button
                        onclick="viewHistory(${index})">

                        👁 View

                    </button>

                    <button
                        onclick="deleteHistory(${index})">

                        🗑 Delete

                    </button>

                </div>

            </div>

        `).join("");

    }

    document.getElementById("historyPopup")
        .style.display="flex";

}

/* Close Popup */

function closeHistory(){

    document.getElementById("historyPopup")
        .style.display="none";

}

/* Temporary View */

function viewHistory(index){

    const history = getBillHistory();
    const bill = history[index];

    let receipt = "";

    receipt += "🧾 Bill #" + bill.billNo + "\n";
    receipt += "━━━━━━━━━━━━━━\n\n";

    bill.items.forEach(item => {

        receipt +=
            item.name +
            " × " +
            item.qty +
            " = ₹" +
            (item.price * item.qty) +
            "\n";

    });

    receipt += "\n━━━━━━━━━━━━━━\n";

    receipt += "💰 Total : ₹" + bill.total + "\n";
    receipt += "📅 " + bill.date + "\n";
    receipt += "🕒 " + bill.time;

    alert(receipt);

}

/* Delete */

function deleteHistory(index){

    const history = getBillHistory();

    history.splice(index,1);

   saveBillHistory(history);

showHistory();

updateDashboard();

}
/* ==========================================
   Dashboard
========================================== */

function updateDashboard(){

    const history = getBillHistory();

    let totalSales = 0;
    let billsToday = 0;
    let totalExpenses = 0;
    let itemCount = {};
    
    

    const today = new Date().toLocaleDateString();

    history.forEach(bill=>{

        if(bill.date === today){

            totalSales += bill.total;
            billsToday++;

            bill.items.forEach(item=>{

                if(!itemCount[item.name]){

                    itemCount[item.name] = 0;

                }

                itemCount[item.name] += item.qty;

            });

        }

    });

    let bestSeller = "-";
    let highest = 0;

    for(const item in itemCount){

        if(itemCount[item] > highest){

            highest = itemCount[item];
            bestSeller = item;

        }

    }

    const average =
        billsToday === 0
        ? 0
        : Math.round(totalSales / billsToday);
const expenses = getExpenses();

expenses.forEach(exp=>{

    totalExpenses += exp.amount;

});

const profit = totalSales - totalExpenses;
    document.getElementById("todaySales").textContent =
        "₹" + totalSales;

    document.getElementById("todayBills").textContent =
        billsToday;

    document.getElementById("bestSeller").textContent =
        bestSeller;
        document.getElementById("todayProfit").textContent =
    "₹" + profit;
        
        

    document.getElementById("averageBill").textContent =
        "₹" + average;

}
/* ==========================================
   Daily Report
========================================== */

function showReports(type = "today") {

    const history = getBillHistory();

    let totalSales = 0;
    let bills = 0;
    let html = "";

    const now = new Date();

    history.forEach(bill => {

        const billDate = new Date(bill.date);

        let include = false;

        if (type === "today") {

            include =
                billDate.toDateString() === now.toDateString();

        } else if (type === "week") {

            const diff =
                (now - billDate) / (1000 * 60 * 60 * 24);

            include = diff >= 0 && diff < 7;

        } else if (type === "month") {

            include =
                billDate.getMonth() === now.getMonth() &&
                billDate.getFullYear() === now.getFullYear();

        } else if (type === "year") {

            include =
                billDate.getFullYear() === now.getFullYear();

        }

        if (!include) return;

        totalSales += Number(bill.total || 0);
        bills++;

        html += `
    <p>
        🧾 Bill #${bill.billNo}
        - ₹${Number(bill.total || 0)}
    </p>
`;
    });

    const average =
        bills === 0 ? 0 : Math.round(totalSales / bills);

    document.getElementById("dailyReportContent").innerHTML = `
        <p><b>💰 Total Sales:</b> ₹${totalSales}</p>
        <p><b>🧾 Bills:</b> ${bills}</p>
        <p><b>📈 Average Bill:</b> ₹${average}</p>

        <hr>

        ${html || "<p>No Bills Found</p>"}
    `;

    document.getElementById("reportPopup").style.display = "flex";
}

function closeDailyReport(){

    document.getElementById("reportPopup")
        .style.display = "none";

}
/* ==========================================
   Expense Tracker
========================================== */

function getExpenses(){

    return JSON.parse(
        localStorage.getItem("expenses")
    ) || [];

}

function saveExpenses(expenses){

    localStorage.setItem(
        "expenses",
        JSON.stringify(expenses)
    );

}

function openExpensePopup(){

    loadExpenses();

    document.getElementById("expensePopup")
        .style.display = "flex";

}

function closeExpensePopup(){

    document.getElementById("expensePopup")
        .style.display = "none";

}

function saveExpense(){

    const name =
        document.getElementById("expenseName").value.trim();

    const amount =
        Number(document.getElementById("expenseAmount").value);

    if(name === "" || amount <= 0){

        alert("Enter valid expense!");

        return;

    }

    const expenses = getExpenses();

    expenses.push({

        name,
        amount

    });

    saveExpenses(expenses);

    document.getElementById("expenseName").value = "";
    document.getElementById("expenseAmount").value = "";

    loadExpenses();

}

function loadExpenses(){

    const expenses = getExpenses();

    const list =
        document.getElementById("expenseList");

    if(expenses.length === 0){

        list.innerHTML =
            "No Expenses Yet 💸";

        return;

    }

    list.innerHTML = expenses.map((exp,index)=>`

    <div class="historyCard">

        <p>

            💸 <b>${exp.name}</b>

            - ₹${exp.amount}

        </p>

        <div class="historyButtons">

            <button
                onclick="editExpense(${index})">

                ✏️ Edit

            </button>

            <button
                onclick="deleteExpense(${index})">

                🗑 Delete

            </button>

        </div>

    </div>

`).join("");

}
/* Edit Expense */

function editExpense(index){

    const expenses = getExpenses();

    const newName = prompt(
        "Edit Expense Name",
        expenses[index].name
    );

    if(newName === null) return;

    const newAmount = prompt(
        "Edit Amount",
        expenses[index].amount
    );

    if(newAmount === null) return;

    expenses[index].name = newName.trim();
    expenses[index].amount = Number(newAmount);

    saveExpenses(expenses);

    loadExpenses();

}

/* Delete Expense */

function deleteExpense(index){

    if(!confirm("Delete this expense?")){

        return;

    }

    const expenses = getExpenses();

    expenses.splice(index,1);

    saveExpenses(expenses);

    loadExpenses();

}




function showAnalytics(){

    updateDashboard();

    const history = getBillHistory();

    const expenses = getExpenses();

    const totalSales = history.reduce(
    (sum, bill) => sum + Number(bill.total || 0),
    0
);

    const totalBills = history.length;

    const totalExpenses = expenses.reduce(
    (sum, item) => sum + Number(item.amount || 0),
    0
);

    const averageBill =
        totalBills===0
        ?0
        :Math.round(totalSales/totalBills);

    const netProfit =
        totalSales-totalExpenses;

    document.getElementById(
        "analyticsContent"
    ).innerHTML=`

<h3>💰 Total Sales : ₹${totalSales}</h3>

<h3>🧾 Total Bills : ${totalBills}</h3>

<h3>💸 Expenses : ₹${totalExpenses}</h3>

<h3>📈 Average Bill : ₹${averageBill}</h3>

<h3>💵 Net Profit : ₹${netProfit}</h3>

<h3>🏆 Best Seller : ${
document.getElementById("bestSeller").innerText
}</h3>

`;

    document.getElementById(
        "analyticsPopup"
    ).style.display="flex";

}

function closeAnalytics(){

    document.getElementById(
        "analyticsPopup"
    ).style.display="none";

}