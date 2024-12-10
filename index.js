const itemForm = document.getElementById("item-form");

const itemInput = document.getElementById("item-input");

const itemList = document.getElementById("item-list");

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

// Event Listener
itemForm.addEventListener("submit", addItem);
