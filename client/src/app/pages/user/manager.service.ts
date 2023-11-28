import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, catchError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ManagerService {
  private apiUrl = 'http://localhost:8080';

  constructor(private http: HttpClient) { }

  getEmployeesByEmpName(empName: any): Observable<any> {
    // const requestBody = { emp_name: empName };

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };
    return this.http.post<string>(`${this.apiUrl}/form/employeeDetails`, empName, httpOptions);
  }

  getAllEmployees(): Observable<any[]> {
    return this.http.get<any[]>(`http://localhost:8080/form/allEmployees`)
      .pipe(
        catchError((error) => {
          console.error('Error fetching all employees:', error);
          throw error; // Rethrow the error to propagate it to the component
        })
      );
  }


}
