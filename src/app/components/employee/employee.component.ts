import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Employee } from 'src/app/model/employee';
import { EmployeeService } from 'src/app/service/employee.service';

@Component({
    selector: 'app-employee',
    templateUrl: './employee.component.html',
    styleUrls: ['./employee.component.css']
})
export class EmployeeComponent {
    public employees: Employee[] = [];
    public emp?: Employee;

    constructor(private ES: EmployeeService) { }

    ngOnInit() {
        this.getAllEmployees();
        //resets modal employee information
        const modals = document.getElementsByClassName('modal');
        for (let i = 0; i < modals.length; i++)
            modals[i].addEventListener('hidden.bs.modal', event => this.emp = undefined)
    }

    editEmployee(employee?: Employee): void {
        if (this.emp && employee) 
            this.ES.updateEmployee(employee).subscribe({
                next: () => this.getAllEmployees(),
                error: (error: HttpErrorResponse) => alert(`Error: ${error.message}`)
            })
    }

    public deleteEmployee(employee?: Employee): void {
        if (this.emp && employee) 
            this.ES.deleteEmployee(employee.id).subscribe({
                next: () => this.getAllEmployees(),
                error: (error: HttpErrorResponse) => alert(`Error: ${error.message}`)
            })
    }

    search(key: string): void {
        const results : Employee[] = [];
        for (const employee of this.employees) {
            if (employee.name.toLowerCase().includes(key.toLowerCase()) ||
                employee.email.toLowerCase().includes(key.toLowerCase()) ||
                employee.phone.toLowerCase().includes(key.toLowerCase()) ||
                employee.jobTitle.toLowerCase().includes(key.toLowerCase()))
                    results.push(employee);

            this.employees = results;
        }
        
        if(!key)
            this.getAllEmployees();
    }


    getAllEmployees(): void {
        this.ES.getEmployees().subscribe({
            next: (response: Employee[]) => this.employees = response,
            error: (error: HttpErrorResponse) => console.error(`Error: ${error}`)
        })
    }

}
