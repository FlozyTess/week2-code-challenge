//select DOM elements
const itemInput=document.getElementById('item-input');
const addButton=document.getElementById('add-button');
const clearButton=document.getElementById('clear-button');
const shoppingList=document.getElementById('shopping-list');
const searchBar=document.getElementById('search-bar');
//array to store shopping list
let items=[];
//save items to local storage
function saveToLocalStorage() {
    localStorage.setItem('shoppingList', JSON.stringify(items));
}
// Load from local storage when the page loads
function loadFromLocalStorage() {
    const storedItems = localStorage.getItem('shoppingList');
    if (storedItems) {
        items =JSON.parse(storedItems);
        renderList(); // Render loaded items
    }
}
document.addEventListener('DOMContentLoaded', loadFromLocalStorage);
//add items to list
addButton.addEventListener('click',() => {
    const itemName=itemInput.value.trim();
 if (itemName){
    const item = {name: itemName, purchased: false };
    items.push(item);
    saveToLocalStorage();//saves to local storage 
    renderList();
    itemInput.value=''; //clears the input field
}
});
//renders the shopping list
function renderList(listtoRender = items) {
    shoppingList.innerHTML = '';
    listtoRender.forEach((item, index) => {
    const listItem = document.createElement('li');
    listItem.textContent = item.name;
    //mark purchased
    if (item.purchased) {
    listItem.classList.add('purchased');
    }
    //add markPurchased button
    const purchaseButton = document.createElement('button');
    purchaseButton.textContent = item.purchased ? 'Unmark' : 'Mark Purchased';
    purchaseButton.addEventListener('click', () =>{
    item.purchased = !item.purchased;
    saveToLocalStorage();    
    renderList();
    });
    // Add "Delete" button
    const deleteButton = document.createElement('button');
    deleteButton.textContent='Delete';
    deleteButton.addEventListener('click', () => {
    items.splice(index, 1);
    saveToLocalStorage();
    renderList();
    });
    // Edit Button
    const editButton = document.createElement('button');
    editButton.textContent = 'Edit';
    editButton.addEventListener('click', () => {
        const inputField = document.createElement('input');
        inputField.type = 'text';
        inputField.value = item.name;

        const saveButton = document.createElement('button');
        saveButton.textContent = 'Save';

        // Replace item with input field and save button
        listItem.innerHTML = '';
        listItem.appendChild(inputField);
        listItem.appendChild(saveButton);

        // Save the edited item
        saveButton.addEventListener('click', () => {
            const newName = inputField.value.trim();
            if (newName) {
                item.name = newName;
                saveToLocalStorage(); // Persist changes
                renderList();
            }
        });
    });
    // Append buttons and item
    listItem.appendChild(purchaseButton);
    listItem.appendChild(deleteButton);
    listItem.appendChild(editButton);
    shoppingList.appendChild(listItem);
    });
}
    //clear the list
clearButton.addEventListener('click',() => {
    items = [];
    localStorage.removeItem('shoppingList');
    renderList();
});
// Search functionality
searchBar.addEventListener('input', () => {
    const searchTerm = searchBar.value.trim().toLowerCase();
    const filteredItems = items.filter(item => item.name.toLowerCase().includes(searchTerm));
    renderList(filteredItems); // Render only the filtered items
});