import {Component, Input, Output, EventEmitter, OnInit} from '@angular/core';
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
  @Input() employee: Employee;
  @Input() employeeList: Employee[];
  @Output() employeeUpdated: EventEmitter<Employee> = new EventEmitter<Employee>();
  @Output() employeeDeleted: EventEmitter<Employee> = new EventEmitter<Employee>();
  
  errorMessage: string;

  constructor(public dialog: MatDialog) {
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
          const empIndex = this.employee.directReportEmployees.indexOf(this.employee.directReportEmployees.find(employee => employee.id === result.id));
          // removing element from just the direct reports array
          if (empIndex || empIndex === 0) {
              this.employee.directReportEmployees.splice(empIndex, 1);
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
