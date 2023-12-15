import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class FormService {

    private addNomineeData = 'http://localhost:8080/addNomineeList';

    constructor(private http: HttpClient) {}

    getEmployees(): Observable<any[]> {
        return this.http.get<any[]>(`http://localhost:8080/allEmployees`);
    } 

    getEmployeesDetails(id: any): Observable<any[]> {
        return this.http.get<any[]>(`http://localhost:8080/allEmployees/${id}`);
    } 

    getProject(): Observable<any[]> {
        return this.http.get<any[]>(`http://localhost:8080/projects/all`);
    } 

    getExceptFreshers(): Observable<any[]> {
        return this.http.get<any[]>(`http://localhost:8080/allExceptFreshers`);
    }

    getAwardId(awardCategory: string, awardSubCategory: string): Observable<number> {
        const url = `http://localhost:8080/getAwardId?awardCategory=${awardCategory}&awardSubCategory=${awardSubCategory}`;
      
        return this.http.get<number>(url);
      }

    getAwardIdSingle(awardCategory: string): Observable<number> {
        const url = `http://localhost:8080/getAwardId?awardCategory=${awardCategory}`;
      
        return this.http.get<number>(url);
      }



    getProjectDetailsByEmployeeCode(employeeCode: string): Observable<any[]> {
        return this.http.get<any[]>(`http://localhost:8080/getProjectDetailsByEmployeeCode?employeeCode=${employeeCode}`);
      }

      addNominee(nomineeData: any): Observable<String> {
        const httpOptions = {
          headers: new HttpHeaders({
            'Content-Type': 'application/json',
          }),
        };
    
        return this.http.post<string>(this.addNomineeData, nomineeData, httpOptions);
      }

     
}