import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
})
export class EmployeeService {
    private empId: number;

    setEmployeeId(id: number) {
        this.empId = id;
    }

    getEmployeeId(): number {
        return this.empId;
    }
}