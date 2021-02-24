const form = document.querySelector('form')
const input = document.querySelector('#txtTaskName')
const deleteAllBtm = document.querySelector('#btnDeleteAll')
const taskList = document.querySelector('#task-list')
let items;

loadItems();
eventListeners();

function eventListeners(e){
    form.addEventListener('submit',addNewItem)
    taskList.addEventListener('click',deleteItem)
    deleteAllBtm.addEventListener('click',deleteAllItems)
}

function loadItems(){
    items = getItemsFromLs();
    items.forEach(function (item){
        createItem(item)
    })
}
function setItemToLs(text){
    items = getItemsFromLs();
    items.push(text)
    localStorage.setItem('items',JSON.stringify(items))
}
function getItemsFromLs(){
    if (localStorage.getItem('items') === null){
        items = [];
    }
    else{
        items = JSON.parse(localStorage.getItem('items'))
    }
    return items;
}
function addNewItem(e){
    if (input.value === ''){
        alert(' Lütfen inputu doldurunuz ')
    }
    else{
        createItem(input.value)
        setItemToLs(input.value)
    }
    input.value = '';

    e.preventDefault();
}
function createItem(text){
    let li = document.createElement('li')
    li.className ='list-group-item list-group-item-secondary'
    li.appendChild(document.createTextNode(text))

    const  a = document.createElement('a')
    a.className = 'delete-item float-right'
    a.setAttribute('href','#')
    a.innerHTML = ' <i class="fas fa-plus"></i>'
    li.appendChild(a)
    taskList.appendChild(li)
}
function deleteItem(e){
   if (e.target.className === 'fas fa-plus'){
        if (confirm('Eminmisiniz ??')){
            e.target.parentElement.parentElement.remove()
            deleteItemToLs(e.target.parentElement.parentElement.textContent)
        }
    }

    e.preventDefault()
}
function deleteAllItems(e){
    if (confirm('Emin misiniz ???')){
        taskList.innerHTML = ''
        localStorage.clear();
    }



    e.preventDefault()
}
function deleteItemToLs(text){
  items = getItemsFromLs();
  items.forEach(function (item,index){
    if (item === text){
        items.splice(index,1)
    }
  })
    localStorage.setItem('items',JSON.stringify(items))
}
