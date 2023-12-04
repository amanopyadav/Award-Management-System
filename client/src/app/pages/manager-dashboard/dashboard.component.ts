
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ManagerService } from './manager.service';
import { ConstantPool } from '@angular/compiler';
import { error } from 'console';




@Component({
  selector: 'app-user',
  templateUrl: 'dashboard.component.html',
})
export class DashboardComponent implements OnInit {
  filteredEmployees: any[] = [];

  nominationForm: FormGroup;
  empForm: FormGroup;
  showDialog: boolean;
  searchData: string = '';
  apiData: any[] = [];
  display: string = 'none';
  Employees: any[] = [];
  filteredProjects: any[]=[];

  empId: number;
  empName: string;
  empDesignation: string;
  function_name: string;
  primarySkillName: string;
  mindcraftExpMon: string;
  totalExpMon: string;
  email: string;
  mobileNo: string;
  dob: Date;
  joiningDate: Date;
  addedEmployees: any[]=[];
  projectForm: FormGroup;
  Projects: any;

  constructor(
    private fb: FormBuilder,
    private managerService: ManagerService,
    private employeeService: EmployeeService
  ) {
    this.nominationForm = this.fb.group({
      award_category: ['', Validators.required],
      nominated_by: ['', Validators.required],
      emp_id: [this.employeeService.getEmployeeId(), Validators.required],
      empName: [{ value: '', disabled: true }],
      empDesignation: [{ value: '', disabled: true }],
      function_name: [{ value: '', disabled: true }],
      primarySkillName: [{ value: '', disabled: true }],
      mindcraftExpMon: [{ value: '', disabled: true }],
      totalExpMon: [{ value: '', disabled: true }],
      email: [{ value: '', disabled: true }],
      mobileNo: [{ value: '', disabled: true }],
      dob: [{ value: '', disabled: true }],
      joiningDate: [{ value: '', disabled: true }],

      // project_name: ['', Validators.required],
      // project_id: ['', Validators.required],
      // client: ['', Validators.required],
      // industry_name: ['', Validators.required],
    });

    this.projectForm = this.fb.group({
      project_name: ['', Validators.required],
      project_id: ['', Validators.required],
      client: ['', Validators.required],
      industry_name: ['', Validators.required],
    });

    this.Employees=[];
    this.filteredProjects=[];
    this.Projects=[];
  }

  ngOnInit() {
    console.log("Checking");
    this.fetchAllEmployees();
    this.showDialog = false;

    this.empId = this.employeeService.getEmployeeId();
    console.log(this.empId);

    this.nominationForm.get('emp_id').setValue(this.empId);

    this.nominationForm.get('emp_id').valueChanges.subscribe(
      (empId) => {
        if (empId) {
          this.fetchEmployeeDetails(empId);
        }
      }
    );

    // Initialize filteredEmployees with all employees
    // this.filteredEmployees = this.Employees;
    // this.filteredProjects = this.Projects;
  }

  openModal() {
    console.log("Clicked");
    
    this.fetchAllEmployees();
    // Initialize filteredEmployees with all employees when opening the dialog
    this.filteredEmployees = this.Employees;
    this.display = "block";
  }

  openModalforproj(){
    console.log("Proj dialogbox opened");
    this.fetchAllProjects();

    this.display = "block";
  }

  onCloseHandled() {
    this.display = "none";
    this.searchData = ''; 
  }

  onCloseHandledforProj(){
    console.log("close proj dialog box");
    this.display = "none";
    this.searchData = ''; 
  }

  fetchAllEmployees() {
    this.managerService.getEmployees().subscribe(
      (data) => {
        this.Employees = data;
        console.log(data);
      },
      (error) => {
        console.error(error);
      }
    );
  }

  fetchAllProjects() {
    this.managerService.getProject().subscribe(
      (data) => {
        this.filteredProjects = data;
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