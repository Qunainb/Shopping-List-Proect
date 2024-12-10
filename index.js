const itemForm = document.getElementById("item-form");

const itemInput = document.getElementById("item-input");

const itemList = document.getElementById("item-list");

const clrBtn = document.getElementById("clear");

const itemFilter = document.getElementById("filter");

function addItem(event) {
  event.preventDefault();

  const newItem = itemInput.value;

  if (newItem === "") {
    alert("Please add an item");
    return;
  }
  const li = document.createElement("li");
  const text = document.createTextNode(newItem);

  li.appendChild(text);

  const button = createButton("remove-item btn-link text-red");

  li.appendChild(button);

  itemList.appendChild(li);

  checkUi();

  itemInput.value = "";
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

function removeItem(event) {
  if (event.target.parentElement.classList.contains("remove-item")) {
    if (confirm("Are you sure?")) {
      event.target.parentElement.parentElement.remove();

      checkUi();
    }
  }
}

function clearItems() {
  while (itemList.firstChild) {
    itemList.removeChild(itemList.firstChild);
  }
  checkUi();
}

function checkUi() {
  const items = document.querySelectorAll("li");

  if (items.length === 0) {
    clrBtn.style.display = "none";
    itemFilter.style.display = "none";
  } else {
    clrBtn.style.display = "block";
    itemFilter.style.display = "block";
  }
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
itemList.addEventListener("click", removeItem);
clrBtn.addEventListener("click", clearItems);
itemFilter.addEventListener("input", filterItems);

checkUi();
