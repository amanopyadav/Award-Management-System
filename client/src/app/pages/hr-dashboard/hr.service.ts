import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class HrService {
    constructor(private http: HttpClient) {}

    getNomineeList(): Observable<any[]> {
        return this.http.get<any[]>(`http://localhost:8080/nomineeList`);
    } 
    
}