export class UI {
    constructor() {
        this.employeesList = document.getElementById('employees')
        this.updateBtn = document.getElementById('update')
        this.nameInput = document.getElementById('name')
        this.salaryInput = document.getElementById('salary')
        this.departmentInput = document.getElementById('department')
    }

    addAllEmployeeToUI(employees){
        let result = "";
        employees.forEach(function (employee){
            result += `
                <tr>                            
                    <td>${employee.name}</td>
                    <td>${employee.department}</td>
                    <td>${employee.salary}</td>
                    <td>${employee.id}</td>
                    <td><a href="#" id = "update-employee" class= "btn btn-danger">Güncelle</a></td> 
                    <td> <a href="#" id = "delete-employee" class= "btn btn-danger">Sil</a></td>
                </tr>
           `
        });
        this.employeesList.innerHTML = result;
    }
    clearInput(){
        this.nameInput.value = "";
        this.salaryInput.value = "";
        this.departmentInput.value = "";
    }
    addEmployeeToUI(employee){
        this.employeesList.innerHTML += `
                <tr>                            
                    <td>${employee.name}</td>
                    <td>${employee.department}</td>
                    <td>${employee.salary}</td>
                    <td>${employee.id}</td>
                    <td><a href="#" id = "update-employee" class= "btn btn-danger">Güncelle</a></td> 
                    <td> <a href="#" id = "delete-employee" class= "btn btn-danger">Sil</a></td>
                </tr>
           `
    }
    deleteEmployeeFromUI(element){
        element.remove()
    }
    toggleUpdateBtn(target){
        if (this.updateBtn.style.display === "none"){
            this.updateBtn.style.display = "block"
            this.addEmployeeInfoToInput(target);
        }
        else{
            this.updateBtn.style.display = "none";
            this.clearInput()
        }
    }

    addEmployeeInfoToInput(target){
        const children = target.children;
        this.nameInput.value = children[0].textContent;
        this.departmentInput.value = children[1].textContent;
        this.salaryInput.value = children[2].textContent;
    }
    updateEmployeeOnUi(employee,parent){
        parent.innerHTML = `
                <tr>                            
                    <td>${employee.name}</td>
                    <td>${employee.department}</td>
                    <td>${employee.salary}</td>
                    <td>${employee.id}</td>
                    <td><a href="#" id = "update-employee" class= "btn btn-danger">Güncelle</a></td> 
                    <td> <a href="#" id = "delete-employee" class= "btn btn-danger">Sil</a></td>
                </tr>
           `
        this.clearInput();
    }
}
