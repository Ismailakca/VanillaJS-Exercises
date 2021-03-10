import {Request} from "./request";
import {UI} from "./ui";

const form = document.getElementById('employee-form');
const nameInput = document.getElementById('name')
const departmentInput = document.getElementById('department')
const salaryInput = document.getElementById('salary')
const employeesList = document.getElementById('employees')
const updateEmployeeBtn = document.getElementById('update')

const request = new Request('http://localhost:3000/emplooyes');
const ui = new UI();

let updateState = null;

eventListeners();

function eventListeners(){
    document.addEventListener("DOMContentLoaded",getAllEmployees);
    form.addEventListener("submit",addEmployee);
    employeesList.addEventListener('click',UpdateorDelete)
    updateEmployeeBtn.addEventListener('click',updateEmployee)
}

function getAllEmployees(){
    request.get()
        .then(employees => {
               ui.addAllEmployeeToUI(employees);
        })
        .catch(err => console.log(err))
}
function addEmployee(e){
    const employeeName = nameInput.value.trim();
    const employeeDepartment = departmentInput.value.trim();
    const employeeSalary = salaryInput.value.trim();

    if (employeeName === "" || employeeDepartment === "" || employeeSalary === ""){
        alert("Lütfen Tüm alanları doldurun")
    }
    else{
        request.post({name:employeeName,departmant:employeeDepartment,salary:Number(employeeSalary)})
            .then(employee => {
                ui.addEmployeeToUI(employee)
            })
    }


    ui.clearInput();
    e.preventDefault()
}
function UpdateorDelete(e){
    if(e.target.id === "delete-employee"){
        deleteEmployee(e.target)
    }
    else if(e.target.id === "update-employee"){
        updateEmployeeController(e.target.parentElement.parentElement);
    }
}

function deleteEmployee(targetEmployee){
    const id = targetEmployee.parentElement.previousElementSibling.previousElementSibling.textContent;

    request.delete(id)
        .then(message => {
            ui.deleteEmployeeFromUI(targetEmployee.parentElement.parentElement);
        })
}
function updateEmployeeController(targetEmployee){
    ui.toggleUpdateBtn(targetEmployee);

    if (updateState === null){
        updateState = {
            updateId :targetEmployee.children[3].textContent,
            updateParent : targetEmployee
        }
    }
    else{
        updateState = null
    }
}
function updateEmployee(){
        if (updateState){
            const data = {name:nameInput.value.trim(),department:departmentInput.value.trim(),salary:Number(salaryInput.value.trim())}

            request.put(updateState.updateId,data)
                .then(updatedEmployee => {
                    ui.updateEmployeeOnUi(updatedEmployee,updateState.updateParent)

                })
        }
}

