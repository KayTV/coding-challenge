import {Component, OnInit} from '@angular/core';
import {catchError, map} from 'rxjs/operators';
import {MatSnackBar} from '@angular/material/snack-bar';

import {Employee} from '../employee';
import {EmployeeService} from '../employee.service';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css'],
  providers: [MatSnackBar]
})
export class EmployeeListComponent implements OnInit {
  employees: Employee[] = [];
  errorMessage: string;

  constructor(
    private employeeService: EmployeeService,
    private _alertMessage: MatSnackBar) {
  }

  ngOnInit(): void {
    this.employeeService.getAll()
      .pipe(
        map(emps => this.employees = emps),
        catchError(this.handleError.bind(this))
      ).subscribe();
  }

  employeeUpdated(employee: Employee): void {
    if (employee) {
      this.employeeService.save(employee).subscribe(emp => {
        const updateAction: string = 'compensation has been updated to $' + emp.compensation ;
        this.openAlertMessage(emp, updateAction);
        this.employeeService.getAll().subscribe(emps => {
          this.employees = emps;
        })
      }, (error) => {
        if (error) {
          this.handleError(error);
        }
      });
    }
  }

  employeeDeleted(employee: Employee): void {
    if (employee) {
      let id: number = employee.id;
      this.employeeService.remove(employee).subscribe(never => {
        const deleteAction: string = 'has been removed from the system' ;
        this.openAlertMessage(employee, deleteAction);
        this.employeeService.getAll().subscribe(emps => {
          emps.forEach(emp => {
            if (emp.directReports && emp.directReports.length > 0) {
              emp.directReports.forEach(dirEmpId => {
                if (dirEmpId === id) {
                  const index = emp.directReports.indexOf(dirEmpId);
                  emp.directReports.splice(index, 1);
                }
              })
            }
          }, (error) => {
            if (error) {
              this.handleError(error);
            }
          });
          this.employees = emps;
        })
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
