import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class ManagerService {

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

}