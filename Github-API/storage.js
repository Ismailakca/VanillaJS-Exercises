class Storage {
    static getSearchedUsesFromStorage(){
        let users;
        if (localStorage.getItem('searched') === null){
            users = [];
        }
        else {
            users = JSON.parse(localStorage.getItem('searched'))
        }
        return users;
    }
    static addSearchedUserToStorage(username){
        let users = this.getSearchedUsesFromStorage();

        if (users.indexOf(username) === -1){
            users.push(username)
        }
        localStorage.setItem('searched',JSON.stringify(users))
    }
    static clearAllSearchedUserSFromStorage(){
        localStorage.removeItem('searched')
    }
}