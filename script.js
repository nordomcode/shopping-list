const itemForm = document.getElementById('item-form');
const itemInput  = document.getElementById('item-input');
const itemList = document.getElementById('item-list');
const formBtn = document.querySelector('div.form-control button');
const clearBtn = document.getElementById('clear')
const filter = document.getElementById('filter')
let isEditMode = false

function displayItems() {
    let itemsFromStorage = getItemsFromStorage();

    itemsFromStorage.forEach(item => addItemToDOM(item));

    checkUI();
}

function createIcon(classes) {
    const icon = document.createElement('i');
    icon.className = classes;
    return icon;
}

function createButton(classes) {
    const button = document.createElement('button');
    button.className= classes;
    return button;
}

function onAddItemSubmit(e) {
    e.preventDefault();
    

    const newItem = itemInput.value

    //validate input
    if (newItem==='') {
        alert('Pleaase add an item');
        return;
    }
    addItemToDOM(newItem);
    addItemToStorage(newItem);
    checkUI();
    //clearing the input
    itemInput.value = ''
}

function addItemToDOM(item) {
    const icon = createIcon('fa-solid fa-xmark');
    //create button
    const button = createButton("remove-item btn-link text-red");
    button.appendChild(icon);
    //Create list element
    const li = document.createElement('li');
    li.appendChild(document.createTextNode(item));
    li.appendChild(button);
    //finally adding item to the item list
    itemList.appendChild(li);
}

function addItemToStorage(item) {
    let itemsFromStorage = getItemsFromStorage()
    itemsFromStorage.push(item);
    localStorage.setItem('items', JSON.stringify(itemsFromStorage));
}

function getItemsFromStorage() {
    let itemsFromStorage;
    if (localStorage.getItem('items') === null) {
        itemsFromStorage = [];
    } else {
        itemsFromStorage = JSON.parse(localStorage.getItem('items'));
    }
    return itemsFromStorage;
}

function onClickItem(e) {
    if (e.target.parentElement.classList.contains('remove-item')) {
        removeItem(e.target.parentElement.parentElement);
    } else {
        setItemToEdit(e.target);
    }
}

function setItemToEdit(item) {
    isEditMode = true;
    itemList
        .querySelectorAll('li')
        .forEach(item => item.classList.remove('edit-mode'));
    formBtn.innerHTML = '<i class="fa-solid fa-pen"></i> Update Item';
    formBtn.style.color = '#228B22';
    item.classList.add('edit-mode');
    itemInput.value= item.textContent
    
}

function removeItem(item) {
    if (confirm('Are you sure?')) {
            item.remove()

            removeItemFromStorage(item.textContent);

            checkUI();

        }
}
    
function removeItemFromStorage(item) {
    let itemsFromStorage = getItemsFromStorage();

    itemsFromStorage = itemsFromStorage.filter(i => i != item);

    localStorage.setItem('items', JSON.stringify(itemsFromStorage));
}

function clearAll() {
    while(itemList.firstChild) {
        itemList.removeChild(itemList.firstChild);
    }

    localStorage.removeItem('items');
    checkUI();
}

function checkUI() {
    const items = itemList.querySelectorAll('li');
    if (items.length === 0 ) {
        clearBtn.style.display = 'none';
        filter.style.display = 'none';
    } else {
    clearBtn.style.display = 'block';
    filter.style.display = 'block';
    }
}

function filterItems(e) {
    const text = e.target.value.toLowerCase();
    const items = itemList.querySelectorAll('li');

    items.forEach(item => {
        const itemName = item.firstChild.textContent.toLowerCase();

        if (itemName.indexOf(text) != -1) {
            item.style.display = 'flex';
        } else {
            item.style.display = 'none';
        }
        
    });
}

function init() {
    //Event Listeners
itemForm.addEventListener('submit', onAddItemSubmit);
itemList.addEventListener('click', onClickItem);
clearBtn.addEventListener('click', clearAll);
filter.addEventListener('input', filterItems);
document.addEventListener('DOMContentLoaded', displayItems);

checkUI();
}

init();


