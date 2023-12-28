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

    getEmployeeDetails(empCode: string): Observable<EmployeeDetails> {
      console.log("reached here");
      
      return this.http.get<EmployeeDetails>(`http://localhost:8080/employeeDetails/${empCode}`);
    }

    getEmployeeDetails1(empCode: string): Observable<EmployeeDetails> {
      console.log("reached here");
      
      return this.http.get<EmployeeDetails>(`http://localhost:8080/employeeDetails/${empCode}`);
    }

    getLatestEmpDialogRecord(empCode: string, awardCategory: string, awardSubCategory: string, awardSubCategory2: string): Observable<any> {
        return this.http.get<any>(`http://localhost:8080/latestEmpDialogRecord=${empCode}/${awardCategory}/${awardSubCategory}/${awardSubCategory2}`);
    }


    fetchNominationIDOne(empCode: string,awardCategory: string):  Observable<number>{
      return this.http.get<number>(`http://localhost:8080/getRatingNominationIdOne/${empCode}/${awardCategory}`);
    }

    fetchNominationIDTwo(empCode: string,awardCategory: string,awardSubCategory: string):  Observable<number>{
      console.log("Empcode for two: "+empCode);
      console.log("Emp category for two: "+awardCategory);
      console.log("Emp sub category for two: "+awardSubCategory);
      
      return this.http.get<number>(`http://localhost:8080/getRatingNominationIdTwo/${empCode}/${awardCategory}/${awardSubCategory}`);
    }

    fetchNominationIDThree(empCode: string,awardCategory: string,awardSubCategory: string,awardSubCategory2: string):  Observable<number>{
      return this.http.get<number>(`http://localhost:8080/getRatingNominationIdThree/${empCode}/${awardCategory}/${awardSubCategory}/${awardSubCategory2}`);
    }

    getRatingDetails(nominationID: number): Observable<any[]> {
      return this.http.get<any[]>(`http://localhost:8080/getRatingDetails/${nominationID}`);
    }


    // Get employee nomination details - 1
    getNominationDetails1(empCode: string,awardCategory: string): Observable<any[]>{
      return this.http.get<any[]>(`http://localhost:8080/getNominationDetails1/${empCode}/${awardCategory}`);
    }


    // // Get employee nomination details - 2
    getNominationDetails2(empCode: string,awardCategory: string,awardSubCategory: string): Observable<any[]>{
      return this.http.get<any[]>(`http://localhost:8080/getNominationDetails2/${empCode}/${awardCategory}/${awardSubCategory}`);
    }

    // Get employee nomination details - 3
    getNominationDetails3(empCode: string, awardCategory: string,awardSubCategory: string,awardSubCategory2: string): Observable<any[]>{
      return this.http.get<any[]>(`http://localhost:8080/getNominationDetails3/${empCode}/${awardCategory}/${awardSubCategory}/${awardSubCategory2}`);
    }


    
}

interface EmployeeDetails {
  empCode: string;
  empName: string;
  doj: Date;
  unit: string;
  skill: string;
  empDesignation: string;
  mindcraftExpInMonths: number;
  totalExpInMonths: number;
  contactNumber: number;
  emailId: string;
  dob: Date;
  projectCode: number;
  projectName: string;
  client: string;
  industryName: string;
}