// ==========================================
// Kayaloram Tattukada POS V2
// App State
// ==========================================
let categories = JSON.parse(localStorage.getItem("categories")) || [

    "☕ Drinks",

    "🥟 Snacks",

    "🍗 Chicken",

    "🥩 Beef",

    "🐟 Fish"

];
const App = {

    menu: menu,

    bill: [],

    billNumber: Number(localStorage.getItem("billNumber")) || 1,

    deleteTimer: null

};