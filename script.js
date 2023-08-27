const itemForm = document.getElementById('item-form');
const itemInput   = document.getElementById('item-input');
const itemList = document.getElementById('item-list');
const clearBtn = document.getElementById('clear')
const filter = document.getElementById('filter')

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
    checkUI();

    const newItem = itemInput.value

    //validate input
    if (newItem==='') {
        alert('Pleaase add an item');
        return;
    }

    addItemToDOM(newItem);
    addItemToStorage(newItem);

   

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
        itemsFromStorage = JSON.parse(itemsFromStorage.getItem('items'));
    }

    return itemsFromStorage;
}

function removeItem(e) {
    if (e.target.parentElement.classList.contains('remove-item')) {
        if (confirm('Are you sure?')) {
            e.target.parentElement.parentElement.remove()
        }
    }
    checkUI();
}

function clearAll() {
    while(itemList.firstChild) {
        itemList.removeChild(itemList.firstChild);
    }
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
itemList.addEventListener('click', removeItem);
clearBtn.addEventListener('click', clearAll);
filter.addEventListener('input', filterItems);
document.addEventListener('DOMContentLoaded', displayItems);

checkUI();
}

init();


