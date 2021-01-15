const main = document.getElementById('main');
const addUserButton = document.getElementById('add-user');
const doubleButton = document.getElementById('double');
const showMillionairesBtn = document.getElementById('show-miilionaires');
const shortBtn = document.getElementById('sort');
const calculateWealthBtn = document.getElementById('calculate-wealth');

let data = [];

eventListeners();

function eventListeners(){
addUserButton.addEventListener('click',getRandomUser);
doubleButton.addEventListener('click',doubleMoney);
shortBtn.addEventListener('click',sortByRichest);
showMillionairesBtn.addEventListener('click',showMillionaires);
calculateWealthBtn.addEventListener('click',calculateWealth);
}
function calculateWealth(){
    const wealth = data.reduce((acc,user) => (acc += user.money), 0);

    const wealthEl = document.createElement('div');
    wealthEl.innerHTML = `<h3>Total Wealth: <strong>${formatMoney(wealth)}</strong></h3>`;
    main.appendChild(wealthEl);
}
function showMillionaires(){
    data = data.filter(user => user.money > 1000000);
    updateDom();
}

function sortByRichest(){
    data.sort((a,b) => b.money - a.money);
    updateDom();
}

function doubleMoney(){
    data = data.map(user => {
        return {...user, money:user.money * 2}
    });
    updateDom();
}

async function getRandomUser(){
    const res = await fetch('https://randomuser.me/api');
    const data = await res.json();
    const user = data.results[0];

    const newUSer = {
        name : `${user.name.first} ${user.name.last}`,
        money : Math.floor(Math.random() * 1000000)
    };

    addData(newUSer);
}

function addData(obj){
    data.push(obj);
    updateDom();
}

function updateDom(providedData = data){
    main.innerHTML = '<h2><strong>Person</strong>Wealt</h2>';

    providedData.forEach(item => {
        const element = document.createElement('div');
        element.classList.add('person');
        element.innerHTML = `<strong>${item.name}</strong> ${formatMoney(
            item.money
        )}`;
        main.appendChild(element);
    })
}

function formatMoney(number){
    return '$' + number.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
}