import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Employee } from 'src/app/model/employee';
import { EmployeeService } from 'src/app/service/employee.service';

@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.css']
})
export class AddEmployeeComponent {
  public showToast = false;
  public autohideToast = true;
  constructor(private ES: EmployeeService) {}

  addEmployee(form: NgForm){
    this.ES.addEmployee(form.value).subscribe({
      next: (response: Employee) => alert(`Employee ${response.name} added successfully !`),
      error: (err: HttpErrorResponse) => alert(err.message),
    })

    form.reset();
  }
  

}
