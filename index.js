//select DOM elements
const itemInput=document.getElementById('item-input');
const addButton=document.getElementById('add-button');
const clearButton=document.getElementById('clear-button');
const shoppingList=docment.getElementById('shopping-list');
//array to store shopping list
let items=[];
//add items to list
addButton.addEventListener('click',() => {
    const itemName=itemInput.value.trim();
 if (itemName){
    const item = {name: itemName, purchased: false };
    items.push(item);
    renderList();
    itemInput.value='';
}
});