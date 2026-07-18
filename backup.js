/* ==========================================
   FoodFlowPOS V3
   backup.js
========================================== */

function backupData() {

    const backup = {

        menu: JSON.parse(localStorage.getItem("menu")) || [],

        billHistory: JSON.parse(localStorage.getItem("billHistory")) || [],

        expenses: JSON.parse(localStorage.getItem("expenses")) || [],

        restaurantSettings: JSON.parse(localStorage.getItem("restaurantSettings")) || {},

        billNumber: localStorage.getItem("billNumber") || 1

    };

    const blob = new Blob(
        [JSON.stringify(backup, null, 2)],
        { type: "application/json" }
    );

    const link = document.createElement("a");

    const today = new Date().toISOString().split("T")[0];

link.href = URL.createObjectURL(blob);

link.download = `FoodFlowPOS_Backup_${today}.json`;

link.click();

    URL.revokeObjectURL(link.href);

    alert("✅ Backup created successfully!");

}

function restoreData() {

    document.getElementById("restoreFile").click();

}

function importBackup(event) {

    const file = event.target.files[0];

    if (!file) return;

    const reader = new FileReader();

    reader.onload = function(e) {

        const data = JSON.parse(e.target.result);

        localStorage.setItem("menu", JSON.stringify(data.menu || []));
        localStorage.setItem("billHistory", JSON.stringify(data.billHistory || []));
        localStorage.setItem("expenses", JSON.stringify(data.expenses || []));
        localStorage.setItem("restaurantSettings", JSON.stringify(data.restaurantSettings || {}));
        localStorage.setItem("billNumber", data.billNumber || 1);

        alert("✅ Backup restored successfully!\nRefresh the app.");

        location.reload();

    };

    reader.readAsText(file);

}
function factoryReset() {

    const confirmReset = confirm(
`⚠️ FACTORY RESET

This will permanently delete:

• Bill History
• Expenses
• Reports
• Analytics Data

Bill Number will reset to 1.

Menu and Restaurant Settings will be kept.

Continue?`
    );

    if (!confirmReset) return;

    localStorage.removeItem("billHistory");
    localStorage.removeItem("expenses");
    App.billNumber = 1; localStorage.setItem("billNumber", 1);

    alert("✅ POS has been reset successfully!");

    location.reload();
}