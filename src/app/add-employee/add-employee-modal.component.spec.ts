import { Component } from '@angular/core';
import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import { MatDialogRef } from '@angular/material/dialog';
import { AddEmployeeModalComponent } from './add-employee-modal.component';
import { By } from '@angular/platform-browser';

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
          id: null,
          firstName: '',
          lastName: '',
          position: ''
        };
    });

    it('should create the add employee modal component', async(() => {
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

    it('should input value in first name', async(() => {
        fixture.detectChanges();
        const compiled = fixture.debugElement;
        fixture.whenStable().then(() => {
            let input = compiled.query(By.css('#firstName'));
            let el = input.nativeElement;

            expect(el.value).toBe('');

            el.value = 'Kaylyn';
            el.dispatchEvent(new Event('input'));

            expect(el.value).toBe('Kaylyn');
        })
    }));

    it('should input value in last name', async(() => {
        fixture.detectChanges();
        const compiled = fixture.debugElement;
        fixture.whenStable().then(() => {
            let input = compiled.query(By.css('#lastName'));
            let el = input.nativeElement;

            expect(el.value).toBe('');

            el.value = 'Van';
            el.dispatchEvent(new Event('input'));

            expect(el.value).toBe('Van');
        })
    }));

    it('should input value in position', async(() => {
        fixture.detectChanges();
        const compiled = fixture.debugElement;
        fixture.whenStable().then(() => {
            let input = compiled.query(By.css('#position'));
            let el = input.nativeElement;

            expect(el.value).toBe('');

            el.value = 'Developer';
            el.dispatchEvent(new Event('input'));

            expect(el.value).toBe('Developer');
        })
    }));

    it('should input value in compensation', async(() => {
        fixture.detectChanges();
        const compiled = fixture.debugElement;
        fixture.whenStable().then(() => {
            let input = compiled.query(By.css('#compensation'));
            let el = input.nativeElement;

            expect(el.value).toBe('');

            el.value = '120000';
            el.dispatchEvent(new Event('input'));

            expect(el.value).toBe('120000');
        })
    }));
});