import {Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Employee } from '../employee';

@Component({
  selector: 'add-employee-modal',
  templateUrl: './add-employee-modal.component.html',
  styleUrls: ['./add-employee-modal.component.css'],
})
export class AddEmployeeModalComponent {
    employee: Employee = {
        id: null,
        firstName: '',
        lastName: '',
        position: ''
    }

    constructor(public addEmployeeModal: MatDialogRef<AddEmployeeModalComponent>) {}

    onNoClick(): void {
        this.addEmployeeModal.close();
    }

}