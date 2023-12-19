import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class HrService {
    getEmployeeRatings(id: any): any {
      throw new Error('Method not implemented.');
    }
    constructor(private http: HttpClient) {}

    getNomineeList(): Observable<any[]> {
        return this.http.get<any[]>(`http://localhost:8080/nomineeList`);
    } 

    getLatestEmpDialogRecord(empCode: string, awardCategory: string, awardSubCategory: string, awardSubCategory2: string): Observable<any> {
        return this.http.get<any>(`http://localhost:8080/latestEmpDialogRecord=${empCode}/${awardCategory}/${awardSubCategory}/${awardSubCategory2}`);
      }
    
}