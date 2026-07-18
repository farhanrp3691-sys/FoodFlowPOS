// ==========================================
// Menu Manager
// ==========================================

function openMenuManager(){

    loadMenuManager();

    document.getElementById(
        "menuManagerPopup"
    ).style.display = "flex";
    loadCategoryDropdown();

}

function closeMenuManager(){

    document.getElementById(
        "menuManagerPopup"
    ).style.display = "none";

}

function loadMenuManager(){

    const list =
        document.getElementById(
            "menuManagerList"
        );

    const search = document
    .getElementById("menuManagerSearch")
    .value
    .toLowerCase();

list.innerHTML = menu
    .filter(item =>
        item.name.toLowerCase().includes(search)
    )
    .map((item,index)=>`

        <div class="historyCard">

            <p>

                ${item.category}<br>

                <b>${item.name}</b>

                - ₹${item.price}

            </p>

            <div class="historyButtons">

                <button
                    onclick="editMenuItem(${index})">

                    ✏️ Edit

                </button>

                <button
                    onclick="deleteMenuItem(${index})">

                    🗑 Delete

                </button>

            </div>

        </div>

    `).join("");

}
function editMenuItem(index){

    const newName = prompt(
        "Item Name",
        menu[index].name
    );

    if(newName === null) return;

    const newPrice = prompt(
        "Price",
        menu[index].price
    );

    if(newPrice === null) return;

    menu[index].name = newName.trim();
    menu[index].price = Number(newPrice);

    localStorage.setItem(
        "menu",
        JSON.stringify(menu)
    );

    loadMenu();

    loadMenuManager();

}
function deleteMenuItem(index){

    if(!confirm("Delete this item?")){

        return;

    }

    menu.splice(index,1);

    localStorage.setItem(
        "menu",
        JSON.stringify(menu)
    );

    loadMenu();

    loadMenuManager();

}
function addMenuItem(){

    const name =
        document.getElementById("menuItemName").value.trim();

    const price =
        Number(document.getElementById("menuItemPrice").value);
const category =
    document.getElementById("menuCategory").value;
    if(name === "" || price <= 0){

        alert("Enter valid item!");

        return;

    }

    menu.push({

        id: Date.now(),

        category: category,

        name,

        price

    });

    localStorage.setItem(
        "menu",
        JSON.stringify(menu)
    );

    document.getElementById("menuItemName").value = "";

    document.getElementById("menuItemPrice").value = "";

    loadMenu();

    loadMenuManager();

}
function loadCategoryDropdown(){

    const select =
        document.getElementById("menuCategory");

    if(!select) return;

    select.innerHTML = "";

    categories.forEach(category=>{

        select.innerHTML += `
            <option>${category}</option>
        `;

    });

}

function addCategory(){

    const category = prompt("Enter category (emoji + name)");

    if(!category) return;

    if(categories.includes(category)){
        alert("Category already exists!");
        return;
    }

    categories.push(category);

    localStorage.setItem(
        "categories",
        JSON.stringify(categories)
    );

    loadCategoryDropdown();

    loadMenu();

    alert("✅ Category Added!");
    loadMenuManager();
}