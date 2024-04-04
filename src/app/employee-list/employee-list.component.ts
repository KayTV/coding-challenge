import {Component, OnInit} from '@angular/core';
import {catchError, map} from 'rxjs/operators';
import {MatSnackBar} from '@angular/material/snack-bar';

import {Employee} from '../employee';
import {EmployeeService} from '../employee.service';
import { AddEmployeeModalComponent } from '../add-employee/add-employee-modal.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css'],
  providers: [MatSnackBar]
})
export class EmployeeListComponent implements OnInit {
  employees: Employee[] = [];
  errorMessage: string;
  mockImage: string = '../../assets/what.jpeg';

  constructor(
    public dialog: MatDialog,
    private employeeService: EmployeeService,
    private _alertMessage: MatSnackBar) {
  }

  ngOnInit(): void {
    this.getEmployees();
  }

  getEmployees(): void {
    this.employeeService.getAll()
      .pipe(
        map(emps => this.employees = emps),
        catchError(this.handleError.bind(this))
      ).subscribe(() => this.getDirectReports());
  }

  getDirectReports(): void {
    // take the index numbers in direct reports array and create an array of employee info
    this.employees.forEach(employee => {
      const reportsArray: Employee[] = [];
      if (employee && employee.directReports) {
        employee.directReports.forEach(directReport => {
          const emp = this.employees.find(employee => employee.id === directReport);
          if (emp) {
            reportsArray.push(emp);
          }
          
        });
        employee.directReportEmployees = reportsArray; 
      }
    });
  }

  addEmployee() {
    const modal = this.dialog.open(AddEmployeeModalComponent);
    modal.afterClosed().subscribe(result => {
      if (result) {
        result.image = this.mockImage;
        this.employeeService.save(result).subscribe(emp => {
        const addAction: string = 'has been added! Welcome!';
        this.openAlertMessage(emp, addAction);
        this.getEmployees();
      }, (error) => {
        if (error) {
          this.handleError(error);
        }
      });
      }  
    }, (error) => {
      if (error) {
        this.handleError(error);
      }
    });
  }

  employeeUpdated(employee: Employee): void {
    if (employee) {
      this.employeeService.save(employee).subscribe(emp => {
        const updateAction: string = 'compensation has been updated to $' + emp.compensation ;
        this.openAlertMessage(emp, updateAction);
        this.getEmployees();
      }, (error) => {
        if (error) {
          this.handleError(error);
        }
      });
    }
  }

  employeeDeleted(employee: Employee): void {
    if (employee) {
      this.employeeService.remove(employee).subscribe(never => {
        const deleteAction: string = 'has been removed from the system' ;
        this.openAlertMessage(employee, deleteAction);
        this.employeeService.removeDirectReport(this.employees, employee);
        this.getEmployees();    
      }, (error) => {
        if (error) {
          this.handleError(error);
        }
      });
    }
  }

  openAlertMessage(emp: Employee, action: string) {
    this._alertMessage.open(emp.firstName + ' ' + emp.lastName + ' ' + action, 'X', {
      duration: 2500,
      horizontalPosition: 'center',
      verticalPosition: 'top',
    });
  }

  private handleError(e: Error | any): string {
    console.error(e);
    return this.errorMessage = e.message || 'Unable to retrieve employees';
  }
}
