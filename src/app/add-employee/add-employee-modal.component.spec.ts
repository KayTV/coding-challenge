import { Component } from '@angular/core';
import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import { MatDialogRef } from '@angular/material/dialog';
import { AddEmployeeModalComponent } from './add-employee-modal.component';

@Component({selector: 'app-mat-dialog-ref', template: ''})
class DialogRef {
}

const matDialogRef = jasmine.createSpyObj('MatDialogRef', ['close']);


describe('AddEmployeeModalComponent', () => {
    let component: AddEmployeeModalComponent;
    let fixture: ComponentFixture<AddEmployeeModalComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
        declarations: [
            AddEmployeeModalComponent,
            DialogRef
        ],
        providers: [{provide: MatDialogRef, useValue: matDialogRef}]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(AddEmployeeModalComponent);
        component = fixture.componentInstance;
        component.employee = {
          id: 1,
          firstName: 'first',
          lastName: 'last',
          position: 'jobTitle'
        };
    });

    it('should create the update modal component', async(() => {
        expect(component).toBeTruthy();
    }));

    it('should call close function', async(() => {
        const spy = spyOn(component, 'onNoClick');
        component.onNoClick();
        expect(spy).toHaveBeenCalled();
    }));

    it('should render title in a h1 tag', async(() => {
        fixture.detectChanges();
        const compiled = fixture.debugElement.nativeElement;
        expect(compiled.querySelector('h1').textContent).toContain('Add New Employee');
    }));
});