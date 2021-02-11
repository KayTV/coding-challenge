import {Component, Input} from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Employee } from '../employee';

@Component({
  selector: 'delete-modal',
  templateUrl: './delete-modal.component.html',
  styleUrls: ['./delete-modal.component.css']
})
export class DeleteModalComponent {
    @Input() set employee(emp: Employee) {
        this._employee = emp;
    }
    get employee() {
        return this._employee;
    }
    _employee: Employee;
    @Input() removeEmployee: boolean;

    constructor(public deleteModal: MatDialogRef<DeleteModalComponent>) {}

    onNoClick(): void {
        this.deleteModal.close();
    }

}