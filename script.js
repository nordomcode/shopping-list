const itemForm = document.getElementById('item-form');
const itemInput   = document.getElementById('item-input');
const itemList = document.getElementById('item-list');
const clearBtn = document.getElementById('clear')

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

function addItem(e) {
    e.preventDefault();

    const newItem = itemInput.value

    //validate input
    if (newItem==='') {
        alert('Pleaase add an item');
        return;
    }

    

    //create icon
    const icon = createIcon('fa-solid fa-xmark');
    //create button
    const button = createButton("remove-item btn-link text-red");
    button.appendChild(icon);

    //Create list element
    const li = document.createElement('li');
    li.appendChild(document.createTextNode(newItem));
   

    li.appendChild(button);

    //finally adding item to the item list
    itemList.appendChild(li);


    //clearing the input
    itemInput.value = ''

}

function removeItem(e) {
    if (e.target.parentElement.classList.contains('remove-item')) {
        e.target.parentElement.parentElement.remove()
    }
}

function clearAll() {
    while(itemList.firstChild) {
        itemList.removeChild(itemList.firstChild);
    }
}

//Event Listeners
itemForm.addEventListener('submit', addItem);
itemList.addEventListener('click', removeItem);
clearBtn.addEventListener('click', clearAll);

