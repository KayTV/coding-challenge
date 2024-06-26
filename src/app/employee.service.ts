import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {from, Observable, throwError} from 'rxjs';
import {catchError, flatMap} from 'rxjs/operators';

import {Employee} from './employee';

@Injectable()
export class EmployeeService {
  private url = '/api/employees';

  constructor(private http: HttpClient) {
  }

  getAll(): Observable<Employee[]> {
    return this.http.get<Employee[]>(this.url)
      .pipe(
        catchError(this.handleError)
      );
  }

  get(id: number): Observable<Employee> {
    return this.http.get<Employee>(`${this.url}/${id}`)
      .pipe(catchError(this.handleError));
  }

  save(emp: Employee): Observable<Employee> {
    const response = (!!emp.id) ? this.put(emp) : this.post(emp);
    return response.pipe(catchError(this.handleError));
  }

  remove(emp: Employee): Observable<never> {
    return this.http
      .delete<never>(`${this.url}/${emp.id}`)
      .pipe(catchError(this.handleError));
  }

  removeDirectReport(employees: Employee[], employee: Employee): void {
    employees.forEach(emp => {
      if (emp.directReports && emp.directReports.length > 0) {
        const directEmployee = emp.directReports.find(reportEmployee => reportEmployee === employee.id);
        if (directEmployee) {
          const index = emp.directReports.indexOf(directEmployee);
          emp.directReports.splice(index, 1);
          this.save(emp);
        }
      }
    })       
  }

  private post(emp: Employee): Observable<Employee> {
    return this.http.post<Employee>(this.url, emp);
  }

  private put(emp: Employee): Observable<Employee> {
    return this.http.put<Employee>(`${this.url}/${emp.id}`, emp);
  }

  private handleError(res: HttpErrorResponse | any): Observable<never> {
    return throwError(res.error || 'Server error');
  }
}
