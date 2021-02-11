import {Component, Input, ViewChild} from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Employee } from '../employee';

@Component({
  selector: 'update-modal',
  templateUrl: './update-modal.component.html',
  styleUrls: ['./update-modal.component.css']
})
export class UpdateModalComponent {
    @Input() set employee(emp: Employee) {
        this._employee = emp;
    }
    get employee() {
        return this._employee;
    }
    _employee: Employee;

    constructor(public updateModal: MatDialogRef<UpdateModalComponent>) {}

    onNoClick(): void {
        this.updateModal.close();
    }

}