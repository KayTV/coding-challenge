import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {Component} from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import {EmployeeComponent} from './employee.component';
import { EmployeeService } from '../employee.service';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { UpdateModalComponent } from '../update-modal/update-modal.component';
import { DeleteModalComponent } from '../delete-modal/delete-modal.component';
import { OverlayModule } from '@angular/cdk/overlay';
import { of } from 'rxjs';


@Component({selector: 'app-mat-card', template: ''})
class CardComponent {
}

@Component({selector: 'app-mat-card-header', template: ''})
class CardHeaderComponent {
}

@Component({selector: 'app-mat-card-title', template: ''})
class CardTitleComponent {
}

@Component({selector: 'app-mat-card-subtitle', template: ''})
class CardSubtitleComponent {
}

@Component({selector: 'app-mat-card-content', template: ''})
class CardContentComponent {
}


const employeeServiceSpy = jasmine.createSpyObj('EmployeeService', ['getAll', 'get', 'save', 'remove']);
const matDialog = jasmine.createSpyObj('MatDialog', ['open']);

describe('EmployeeComponent', () => {
  let component: EmployeeComponent;
  let fixture: ComponentFixture<EmployeeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        OverlayModule,
        MatDialogModule,
        BrowserAnimationsModule
      ],
      declarations: [
        EmployeeComponent,
        CardComponent,
        CardHeaderComponent,
        CardTitleComponent,
        CardSubtitleComponent,
        CardContentComponent,
        UpdateModalComponent,
        DeleteModalComponent
      ],
      providers: [
        {provide: EmployeeService, useValue: employeeServiceSpy},
        {provide: MatDialog, useValue: matDialog}
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeeComponent);
    component = fixture.componentInstance;
    component.employee = {
      id: 1,
      firstName: 'first',
      lastName: 'last',
      position: 'jobTitle'
    };
    component.directReportEmployees = [
      {
        id: 1,
        firstName: 'first',
        lastName: 'last',
        position: 'jobTitle'
      },
      {
        id: 2,
        firstName: 'first',
        lastName: 'last',
        position: 'jobTitle'
      }
    ];
  });

  it('should create the component', async(() => {
    expect(component).toBeTruthy();
  }));

  it('should render title in a mat card title tag', async(() => {
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('mat-card-title').textContent).toContain('last, first');
  }));

  it('should have have direct employees', async(() => {
    component.directReports = 2;
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('mat-accordion')).toBeTruthy();
    expect(component.directReportEmployees.length).toBeGreaterThan(0);
  }));

});
