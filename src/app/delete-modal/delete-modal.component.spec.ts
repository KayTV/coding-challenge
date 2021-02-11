import { Component } from '@angular/core';
import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import { MatDialogRef } from '@angular/material/dialog';
import { DeleteModalComponent } from './delete-modal.component';

@Component({selector: 'app-mat-dialog-ref', template: ''})
class DialogRef {
}

const matDialogRef = jasmine.createSpyObj('MatDialogRef', ['mat-dialog-ref']);


describe('DeleteModalComponent', () => {
    let component: DeleteModalComponent;
    let fixture: ComponentFixture<DeleteModalComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
        declarations: [
            DeleteModalComponent,
            DialogRef
        ],
        providers: [{provide: MatDialogRef, useValue: matDialogRef}]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(DeleteModalComponent);
        component = fixture.componentInstance;
        component.employee = {
          id: 1,
          firstName: 'first',
          lastName: 'last',
          position: 'jobTitle'
        };
        component.removeEmployee = true;
    });

    it('should create the delete modal component', async(() => {
        expect(component).toBeTruthy();
    }));

    it('should call close function', async(() => {
        const spy = spyOn(component, 'onNoClick');
        component.onNoClick();
        expect(spy).toHaveBeenCalled();
    }));

    it('should have removeEmployee defined', async(() => {
        expect(component.removeEmployee).toBeDefined();
    }));

    it('should render title in a h1 tag', async(() => {
        fixture.detectChanges();
        const compiled = fixture.debugElement.nativeElement;
        expect(compiled.querySelector('h1').textContent).toContain('Remove Employee');
    }));
});
