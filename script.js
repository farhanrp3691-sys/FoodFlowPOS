// ==========================================
// Kayaloram Tattukada POS V2
// Main Script
// ==========================================
window.onload = () => {

  

    loadMenu();

    initBilling();
    updateDashboard();
};

window.addEventListener("load", () => {

    setTimeout(() => {

        document.getElementById("splashScreen").style.display = "none";

    }, 2000);

});