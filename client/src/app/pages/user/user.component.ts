import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
//import { ManagerService } from 'app/pages/user/manager.service';
import { ConstantPool } from '@angular/compiler';
import { error } from 'console';



@Component({
  selector: 'app-user',
  templateUrl: 'user.component.html',
})
export class UserComponent implements OnInit {
  nominationForm: FormGroup;
  showDialog: boolean;
  searchData: string = '';
  apiData: any[] = [];
  display: string = 'none';

  constructor(private fb: FormBuilder) { }

  ngOnInit() : void {
    this.nominationForm = this.fb.group({
      award_category: ['', Validators.required],
      nominated_by: ['', Validators.required],

    });

    console.log("Checking")
    //this.fetchAllEmployees();
    this.showDialog = false;
  }

  // showNomineeDialog() {
  //   // For simplicity, using window.prompt
  //   const nomineeName = window.prompt('Nominee Name:', this.nominationForm.get('employee_name').value);

  //   // Update the form control with the entered value
  //   this.nominationForm.get('employee_name').setValue(nomineeName);
  //   this.fetchData();
  // }



  openModal() {
    console.log("Clicked")
    console.log("Fetching data from backend...");
    // this.fetchData();
    // this.fetchAllEmployees();
    this.display = "block";
  }

  onCloseHandled() {
    this.display = "none";
  }

  // fetchData() {
  //   // Fetch data from the API using your service
  //   // Update YourApiService with the actual service name and method
  //   this.managerService.getEmployeesByEmpName(this.searchData).subscribe(
  //     (data: any[]) => {
  //       this.apiData = data;
  //       console.log('Fetched Data:', data);
  //     },
  //     (error) => {
  //       console.error('Error fetching data:', error);
  //     }
  //   );
  // }

  // fetchAllEmployees() {
  //   this.managerService.getAllEmployees().subscribe(
  //     (response: any) => {
  //       console.log(response);
  //       // console.log('Fetched All Employees:', data);
  //     },
  //     (error) => {
  //       console.error('Error fetching all employees:', error);
  //     }
  //   );
  // }

  // fetchAllEmployees() {
  //   this.managerService.getAllEmployees().subscribe(
  //     (data) => {
  //       console.log(data);
  //     },
  //     (error) => {
  //       console.error(error);
  //     }
  //   );
  // }

  // fetchData() {
  //   this.managerService.getAllEmployees().subscribe(
  //     (data: any[]) => {
  //       this.apiData = data;
  //       console.log('Fetched Data:', data);
  //     },
  //     (error) => {
  //       console.error('Error fetching data:', error);
  //     }
  //   );
  // }

}

