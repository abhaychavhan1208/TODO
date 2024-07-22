// Function to render items from localStorage
function renderItems() {
  let arrayget = localStorage.getItem("arraykey");
  if (arrayget) {
    let arraygetset = JSON.parse(arrayget);
    let container = document.getElementsByClassName("container")[0];
    container.innerHTML = ''; // Clear existing content

    arraygetset.forEach(element => {
      let data = document.createElement("div");
      // <span>${element.id}</span> 
      data.innerHTML = ` 
            <span class="task">${element.text}</span>
            <span class="description">${element.description}</span>
            <span class="deadline">${element.date}</span>
            <button onclick="deleteItem(${element.id})">Delete</button>`;
      container.appendChild(data);
    });
  } else {
    alert('Item not found in localStorage');
  }
}

// Function to delete an item by id
function deleteItem(id) {
  let retrievedArrayString = localStorage.getItem('arraykey');
  if (retrievedArrayString) {
    let retrievedArray = JSON.parse(retrievedArrayString);
    let updatedArray = retrievedArray.filter(item => item.id !== id);
    localStorage.setItem('arraykey', JSON.stringify(updatedArray));
    renderItems(); // Re-render the items
  } else {
    alert('Item not found in localStorage');
  }
}

// Function to add a new item
document.getElementById("itemForm").addEventListener("submit", function (event) {
  event.preventDefault();

  let text = document.getElementById("text").value;
  let description = document.getElementById("description").value;
  let date = document.getElementById("date").value;

  let arrayget = localStorage.getItem("arraykey");
  let arraygetset = arrayget ? JSON.parse(arrayget) : [];

  let newId = arraygetset.length > 0 ? arraygetset[arraygetset.length - 1].id + 1 : 1;
  let newItem = { id: newId, text: text, description: description, date: date };

  arraygetset.push(newItem);
  localStorage.setItem("arraykey", JSON.stringify(arraygetset));

  // Clear the form
  document.getElementById("itemForm").reset();

  // Re-render the items
  renderItems();
});

// Initial render
renderItems();
