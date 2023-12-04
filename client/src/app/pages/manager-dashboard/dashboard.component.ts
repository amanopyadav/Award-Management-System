
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
// import { ManagerService } from 'app/pages/user/manager.service';
import { ManagerService } from './manager.service';
import { ConstantPool } from '@angular/compiler';
import { error } from 'console';


@Component({
  selector: 'app-user',
  templateUrl: 'dashboard.component.html',
})
export class DashboardComponent implements OnInit {
  nominationForm: FormGroup;
  showDialog: boolean;
  searchData: string = '';
  apiData: any[] = [];
  display: string = 'none';
  

  constructor(private fb: FormBuilder, private managerService: ManagerService) { }

  ngOnInit() : void {
    this.nominationForm = this.fb.group({
      award_category: ['', Validators.required],
      nominated_by: ['', Validators.required],
      

    });

    

    console.log("Checking")
    this.fetchAllEmployees();
    this.showDialog = false;
  }


  openModal() {
    console.log("Clicked")
    console.log("Fetching data from backend...");
    // this.fetchData();
     this.fetchAllEmployees();
    this.display = "block";
  }

  onCloseHandled() {
    this.display = "none";
  }

  

  fetchAllEmployees() {
    this.managerService. getEmployees().subscribe(
      (data) => {
        console.log(data);
      },
      (error) => {
        console.error(error);
      }
    );
  }
}

 