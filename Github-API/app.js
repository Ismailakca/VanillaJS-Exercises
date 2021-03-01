const githubForm = document.querySelector('#github-form')
const nameInout = document.querySelector('#githubname')
const cleatLastUSer = document.querySelector('#clear-last-users')
const lastUsers = document.querySelector('#last-users')
const github = new Github();
const ui = new UI()

eventListener();

function eventListener(){
    githubForm.addEventListener('submit',getData)
    cleatLastUSer.addEventListener('click',clearAllSearch)
    document.addEventListener('DOMContentLoaded',getAllSearched)
}
function getData(e){
    let userName = nameInout.value.trim();

    if (userName === ''){
        ui.showError('Lütfen Boş bırakmayınız')
    }
    else{
        github.getGithubData(userName)
            .then(response => {
                if (response.user.message === "Not Found"){

                    ui.showError('Kullanıcı Bulunamadı')
                }
                else{
                    ui.addSearchedUserToUi(userName);
                    Storage.addSearchedUserToStorage(userName)
                    ui.showUserInfo(response.user)
                    ui.showRepoInfo(response.repo)

                }
            })
            .catch(err => ui.showError(err))
    }
    ui.clearInput();
    e.preventDefault()
}
function clearAllSearch(){
    if (confirm('Eminmisiniz ?')){
        Storage.clearAllSearchedUserSFromStorage();
        ui.clearAllSearchedFromUi();
    }
}
function getAllSearched(){
    let users = Storage.getSearchedUsesFromStorage();
    let result = '';
    users.forEach((user) => {
        result += `
             <li class="list-group-item">${user}</li>`
    })
    lastUsers.innerHTML = result;
}