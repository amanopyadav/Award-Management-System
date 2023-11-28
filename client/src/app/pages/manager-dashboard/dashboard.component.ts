// import { Component, OnInit } from '@angular/core';
// import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// import { MatInputModule } from '@angular/material/input';
// import { MatIconModule } from '@angular/material/icon';
// import { MatFormFieldModule } from '@angular/material/form-field';
// // import { ManagerService } from 'app/pages/user/manager.service';
// import { ManagerService } from './manager.service';
// import { ConstantPool } from '@angular/compiler';
// import { error } from 'console';



// @Component({
//   selector: 'app-user',
//   templateUrl: 'dashboard.component.html',
// })
// export class DashboardComponent implements OnInit {
//   nominationForm: FormGroup;
//   showDialog: boolean;
//   searchData: string = '';
//   apiData: any[] = [];
//   display: string = 'none';
//   selectedAwardCategory: string; // Variable to store the selected award category
//   managerService: any;

//   constructor(private fb: FormBuilder) { }

//   ngOnInit(): void {
//     this.nominationForm = this.fb.group({
//       award_category: ['', Validators.required],
//       nominated_by: ['', Validators.required],
//       // Add your other form controls here
//     });

//     this.nominationForm.get('award_category').valueChanges.subscribe((value) => {
//       this.selectedAwardCategory = value;
//       this.updateFormControls();
//     });

//     // Initialize your other logic
//     this.showDialog = false;
//   }

//   updateFormControls() {
//     // Add logic to enable/disable form controls based on the selected award category
//     const spotAwardControls = ['parameter1', 'parameter2', 'parameter3']; // Replace with your actual control names

//     if (this.selectedAwardCategory === 'spot_award') {
//       spotAwardControls.forEach(controlName => {
//         this.nominationForm.get(controlName).disable();
//       });
//     } else {
//       spotAwardControls.forEach(controlName => {
//         this.nominationForm.get(controlName).enable();
//       });
//     }
//   }

//   openModal() {
//     console.log("Clicked");
//     console.log("Fetching data from backend...");
//     this.fetchAllEmployees();
//     this.display = "block";
//   }

//   onCloseHandled() {
//     this.display = "none";
//   }

//   fetchAllEmployees() {
//     // Your existing code for fetching employees
//     this.managerService.getEmployees().subscribe(
//       (data) => {
//         console.log(data);
//       },
//       (error) => {
//         console.error(error);
//       }
//     );
//   }
// }

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

  
//     applyFilter() {
//       this.filteredEmployeeData = this.employeeTableData.dataRows.filter(row =>
//         Object.values(row).some(value =>
//           value.toString().toLowerCase().includes(this.searchTerm.toLowerCase())
//         )
//       );
//     }

// }