import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Employee } from '../model/employee';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class EmployeeService {
  apiURL: string = 'http://localhost:8081/employee';

  constructor(private http: HttpClient) { }

  public getEmployees() : Observable<Employee[]> {
    return this.http.get<Employee[]>(`${this.apiURL}/all`)
  }

  public addEmployee(employee : Employee) : Observable<Employee> {
    return this.http.post<Employee>(`${this.apiURL}/add`, employee);
  }

  public updateEmployee(employee : Employee) : Observable<Employee> {
    return this.http.put<Employee>(`${this.apiURL}/update`, employee);
  }

  public deleteEmployee(employeeId : number) : Observable<void> {
    return this.http.delete<void>(`${this.apiURL}/delete/${employeeId}`)
  }


}
