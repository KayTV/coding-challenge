import { Component } from '@angular/core';
import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import { MatDialogRef } from '@angular/material/dialog';
import { UpdateModalComponent } from './update-modal.component';
import { By } from '@angular/platform-browser';

@Component({selector: 'app-mat-dialog-ref', template: ''})
class DialogRef {
}

const matDialogRef = jasmine.createSpyObj('MatDialogRef', ['close']);


describe('UpdateModalComponent', () => {
    let component: UpdateModalComponent;
    let fixture: ComponentFixture<UpdateModalComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
        declarations: [
            UpdateModalComponent,
            DialogRef
        ],
        providers: [{provide: MatDialogRef, useValue: matDialogRef}]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(UpdateModalComponent);
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
        expect(compiled.querySelector('h1').textContent).toContain('Update Compensation');
    }));

    it('should has first name as disabled', async(() => {
        fixture.detectChanges();
        const compiled = fixture.debugElement;
        fixture.whenStable().then(() => {
            let input = compiled.query(By.css('#firstName'));
            let el = input.nativeElement;
            el.value = component.employee.firstName;

            expect(el.value).toBe('first');
            expect(el.disabled).toBeTruthy();
        })
    }));

    it('should has last name as disabled', async(() => {
        fixture.detectChanges();
        const compiled = fixture.debugElement;
        fixture.whenStable().then(() => {
            let input = compiled.query(By.css('#lastName'));
            let el = input.nativeElement;
            el.value = component.employee.lastName;

            expect(el.value).toBe('last');
            expect(el.disabled).toBeTruthy();
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
