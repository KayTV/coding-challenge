import {Component, Input, Output, EventEmitter} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import { DeleteModalComponent } from '../delete-modal/delete-modal.component';

import {Employee} from '../employee';
import { EmployeeService } from '../employee.service';
import { UpdateModalComponent } from '../update-modal/update-modal.component';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css'],
  providers: [MatDialog]
})
export class EmployeeComponent {
  @Input() set employee(employee: Employee) {
    this._employee = employee;
    if (employee && employee.directReports) {
      this.directReports = employee.directReports.length;
      this.getDirectEmployees(employee);
    }
  }
  get employee() {
    return this._employee;
  }
  @Output() employeeUpdated: EventEmitter<Employee> = new EventEmitter<Employee>();
  @Output() employeeDeleted: EventEmitter<Employee> = new EventEmitter<Employee>();
  employeeList: Employee[];
  _employee: Employee;
  directReports: number;
  directReportEmployees: Employee[] = [];
  errorMessage: string;

  constructor(public dialog: MatDialog,
    private employeeService: EmployeeService) {
  }

  getDirectEmployees(employee: Employee) {
    this.employeeService.getAll().subscribe(list => {
      this.employeeList = list;
      employee.directReports.forEach(directReport => {
        const emp = this.employeeList.find(employee => employee.id === directReport);
        if (emp) {
          this.directReportEmployees.push(emp);
        }
      }, (error) => {
        if (error) {
          this.handleError(error);
        }
      });
    }) 
  }

  openDeleteModal(employee: Employee, removeEmployee: boolean) {
    const modal = this.dialog.open(DeleteModalComponent);
    modal.componentInstance.employee = employee;
    modal.componentInstance.removeEmployee = removeEmployee;
    modal.afterClosed().subscribe(result => {
      if (result) {
        if (removeEmployee) {
          // remove employee from system
          this.employeeDeleted.emit(result);
        } else {
          const empIndex = this.directReportEmployees.indexOf(this.directReportEmployees.find(employee => employee.id === result.id));
          // removing element from just the direct reports array
          if (empIndex || empIndex === 0) {
              this.directReportEmployees.splice(empIndex, 1);
              this.directReports = this.directReportEmployees.length;
              this.directReportEmployees.forEach(emp => {
                this.employee.directReports.push(emp.id);
              });
          }
        } 
      }  
    }, (error) => {
      if (error) {
        this.handleError(error);
      }
    });
  }

  openUpdateModal(employee: Employee) {
    const modal = this.dialog.open(UpdateModalComponent);
    modal.componentInstance.employee = employee;
    modal.afterClosed().subscribe(result => {
      if (result) {
        this.employeeUpdated.emit(result);
      }  
    }, (error) => {
      if (error) {
        this.handleError(error);
      }
    });
  }

  private handleError(e: Error | any): string {
    console.error(e);
    return this.errorMessage = e.message || 'An error has occurred';
  }

}
