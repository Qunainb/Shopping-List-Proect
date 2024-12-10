const itemForm = document.getElementById("item-form");

const itemInput = document.getElementById("item-input");

const itemList = document.getElementById("item-list");

const clrBtn = document.getElementById("clear");

const itemFilter = document.getElementById("filter");

const formBtn = itemForm.querySelector("button");

let isEditMode = false;

// Display Items from Local storage
function displayItems() {
  const itemsFromStorage = getItemsFromStorage();
  itemsFromStorage.forEach((item) => {
    addItemsToDom(item);
  });

  checkUi();
}

function addItem(event) {
  event.preventDefault();

  const newItem = itemInput.value;

  if (newItem === "") {
    alert("Please add an item");
    return;
  }

  // Check for edit mode
  if (isEditMode) {
    const itemToEdit = itemList.querySelector(".edit-mode");

    removeItemFromStorage(itemToEdit.textContent);
    itemToEdit.classList.remove("edit-mode");
    itemToEdit.remove();
    isEditMode = false;
  } else {
    if (checkIfItemExists(newItem)) {
      alert("That item already exists");
      return;
    }
  }

  // Add items to DOM
  addItemsToDom(newItem);

  // Add Items to local Storage
  addItemToStorage(newItem);

  checkUi();

  itemInput.value = "";
}
// Add Items to Dom
function addItemsToDom(item) {
  const li = document.createElement("li");
  const text = document.createTextNode(item);

  li.appendChild(text);

  const button = createButton("remove-item btn-link text-red");

  li.appendChild(button);

  itemList.appendChild(li);
}

// Local Storage
function addItemToStorage(item) {
  let itemsFromStorage;

  if (localStorage.getItem("items") === null) {
    itemsFromStorage = [];
  } else {
    itemsFromStorage = JSON.parse(localStorage.getItem("items"));
  }

  // Add new Item to array
  itemsFromStorage.push(item);

  // Convert to JSON String and set to local storage
  localStorage.setItem("items", JSON.stringify(itemsFromStorage));
}

// Display items from localStorage
function getItemsFromStorage() {
  let itemsFromStorage;

  if (localStorage.getItem("items") === null) {
    itemsFromStorage = [];
  } else {
    itemsFromStorage = JSON.parse(localStorage.getItem("items"));
  }
  return itemsFromStorage;
}

function createButton(classes) {
  const button = document.createElement("button");
  button.className = classes;
  const icon = createIcon("fa-solid fa-xmark");
  button.appendChild(icon);
  return button;
}

function createIcon(classes) {
  const icon = document.createElement("i");
  icon.className = classes;
  return icon;
}

function onClickItem(event) {
  if (event.target.parentElement.classList.contains("remove-item")) {
    removeItem(event.target.parentElement.parentElement);
  } else {
    setItemToEdit(event.target);
  }
}

function checkIfItemExists(item) {
  const itemsFromStorage = getItemsFromStorage();
  return itemsFromStorage.includes(item);
}

function setItemToEdit(item) {
  isEditMode = true;

  itemList.querySelectorAll("li").forEach((i) => {
    i.classList.remove("edit-mode");
  });

  item.classList.add("edit-mode");
  formBtn.innerHTML = '<i class= "fa-solid fa-pen"></i> Update Item';
  formBtn.style.backgroundColor = "#228B22";
  itemInput.value = item.textContent;
}

function removeItem(item) {
  if (confirm("Are you sure?")) {
    item.remove();

    // Remove item from storage
    removeItemFromStorage(item.textContent);

    checkUi();
  }
}

function removeItemFromStorage(item) {
  let itemsFromStorage = getItemsFromStorage();

  // Filter out items to be removed
  itemsFromStorage = itemsFromStorage.filter((i) => {
    i !== item;
  });

  // Reset to local storage
  localStorage.setItem("items", JSON.stringify(itemsFromStorage));
}

function clearItems() {
  while (itemList.firstChild) {
    itemList.removeChild(itemList.firstChild);
  }

  // Clear from localStorage
  localStorage.removeItem("items");
  checkUi();
}

function checkUi() {
  itemInput.value = "";

  const items = document.querySelectorAll("li");

  if (items.length === 0) {
    clrBtn.style.display = "none";
    itemFilter.style.display = "none";
  } else {
    clrBtn.style.display = "block";
    itemFilter.style.display = "block";
  }

  isEditMode = false;

  formBtn.innerHTML = '<i class= "fa-solid fa-pen"></i> Add Item';
  formBtn.style.backgroundColor = "#333";
}

function filterItems(event) {
  const items = document.querySelectorAll("li");
  const text = event.target.value.toLowerCase();

  items.forEach((item) => {
    const value = item.firstChild.textContent.toLocaleLowerCase();

    if (value.indexOf(text) != -1) {
      item.style.display = "flex";
    } else {
      item.style.display = "none";
    }
  });
}

// Event Listener
itemForm.addEventListener("submit", addItem);
itemList.addEventListener("click", onClickItem);
clrBtn.addEventListener("click", clearItems);
itemFilter.addEventListener("input", filterItems);
document.addEventListener("DOMContentLoaded", displayItems);

checkUi();
