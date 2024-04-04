import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {Component, Input} from '@angular/core';

import {EmployeeListComponent} from './employee-list.component';
import {EmployeeService} from '../employee.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { OverlayModule } from '@angular/cdk/overlay';
import { of } from 'rxjs';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AddEmployeeModalComponent } from '../add-employee/add-employee-modal.component';
import { MatDialog } from '@angular/material/dialog';

@Component({selector: 'app-employee', template: ''})
class EmployeeComponent {
  @Input('employee') employee: any;
}

@Component({selector: 'app-mat-grid-list', template: ''})
class GridListComponent {
}

@Component({selector: 'app-mat-grid-tile', template: ''})
class GridTileComponent {
}

const employeeServiceSpy = jasmine.createSpyObj('EmployeeService', ['getAll', 'get', 'save', 'remove']);
const matSnackBar = jasmine.createSpyObj('MatSnackBar', ['open']);
const matDialog = jasmine.createSpyObj('MatDialog', ['open']);

describe('EmployeeListComponent', () => {
  let component: EmployeeListComponent;
  let fixture: ComponentFixture<EmployeeListComponent>;
  let service: EmployeeService;
  
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        OverlayModule,
        BrowserAnimationsModule
      ],
      declarations: [
        EmployeeListComponent,
        EmployeeComponent,
        GridListComponent,
        GridTileComponent,
        AddEmployeeModalComponent
      ],
      providers: [
        {provide: EmployeeService, useValue: employeeServiceSpy},
        {provide: MatSnackBar, useValue: matSnackBar},
        {provide: MatDialog, useValue: matDialog}
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeeListComponent);
    component = fixture.componentInstance;
    service = TestBed.inject(EmployeeService);
    let employee = {
      id: 1,
      firstName: 'first',
      lastName: 'last',
      position: 'jobTitle'
    };
    employeeServiceSpy.getAll.and.returnValue(
      of([employee])
    );
    employeeServiceSpy.save.and.returnValue(
      of(employee)
    );
    employeeServiceSpy.remove.and.returnValue(
      of(null)
    )
    service = new EmployeeService(employeeServiceSpy);
  });

  it('should create the component', async(() => {
    expect(component).toBeTruthy();
  }));

  it('should call employee update function', async(() => {
    let employee = {
      id: 1,
      firstName: 'first',
      lastName: 'last',
      position: 'jobTitle'
    };
    const spy = spyOn(component, 'employeeUpdated');
    component.employeeUpdated(employee);
    fixture.detectChanges();
    expect(spy).toHaveBeenCalledWith(employee);
  }));

  it('should call employee delete function', async(() => {
    let employee = {
      id: 1,
      firstName: 'first',
      lastName: 'last',
      position: 'jobTitle'
    };
    const spy = spyOn(component, 'employeeDeleted');
    component.employeeDeleted(employee);
    fixture.detectChanges();
    expect(spy).toHaveBeenCalledWith(employee);
  }));
  
});
