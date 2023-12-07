import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ManagerService } from './manager.service';
import { EmployeeService } from 'app/employee.service';

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

  
  }

  openModal() {
    console.log("Clicked");
    
    this.fetchAllEmployees();
    // Initialize filteredEmployees with all employees when opening the dialog
    this.filteredEmployees = this.Employees;
    this.display = "block";
  }

  // openModalforproj(){
  //   console.log("Proj dialogbox opened");
  //   this.fetchAllProjects();

  //   this.display = "block";
  // }

  onCloseHandled() {
    this.display = "none";
    this.searchData = ''; 
  }

  // onCloseHandledforProj(){
  //   console.log("close proj dialog box");
  //   this.display = "none";
  //   this.searchData = ''; 
  // }

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

  // fetchAllProjects() {
  //   this.managerService.getProject().subscribe(
  //     (data) => {
  //       this.filteredProjects = data;
  //       console.log(data);
  //     },
  //     (error) => {
  //       console.error(error);
  //     }
  //   );
  // }

  addEmployee(employee: any) {
    console.log("Checking!!");
    console.log(employee.emp_id);

    this.employeeService.setEmployeeId(employee.emp_id);
  
    const employeeFormValues = {
      emp_id: employee.emp_id,
      empName: employee.emp_name,
      empDesignation: employee.designation_name,
      function_name: employee.function_name,
      primarySkillName: employee.primary_skill_name,
      mindcraftExpMon: employee.mindcraft_exp_mon,
      totalExpMon: employee.total_exp_mon,
      email: employee.email,
      mobileNo: employee.mobileno,
      dob: employee.dob,
      joiningDate: employee.joining_date,
    };
    this.nominationForm.patchValue(employeeFormValues);

    this.onCloseHandled();
  }

  
  
  

  onEmployeeIdChange() {
    const empId = this.nominationForm.get('emp_id').value;

    if (empId) {
      this.fetchEmployeeDetails(empId);
    }
  }

  
  fetchEmployeeDetails(empId: number) {
    this.managerService.getEmployeesDetails(empId).subscribe(
      (response: any) => {
        console.log(response);
  
        // Update the following lines based on the actual response structure
        this.empDesignation = response.empDesignation;
        this.function_name = response.unit;
  
        this.nominationForm.get('designation_name').setValue(this.empDesignation);
        this.nominationForm.get('function_name').setValue(this.function_name);
      },
      (error) => {
        console.log(error);
      }
    );
  }

 
  search() {
    console.log('Search function triggered');
    console.log('Search Data:', this.searchData);
    console.log('Employees:', this.Employees);

    if (!this.Employees) {
      return;
    }

    // Handle both scenarios: searching and showing all employees
    this.filteredEmployees = this.searchData.trim() === ''
      ? this.Employees // Show all employees
      : this.Employees.filter(employee =>
        employee.emp_name && employee.emp_name.toLowerCase().includes(this.searchData.toLowerCase())
      );
  }

  
 

addEmp() {
  // Add your form values to addedEmployees array
  this.addedEmployees.push({
    empCode: this.nominationForm.get('emp_id').value,
    empName: this.nominationForm.get('empName').value,
    // Add other fields accordingly
  });

  // Clear the form or reset as needed
  this.nominationForm.reset();
}



removeEmployee(employee: any) {
  const index = this.addedEmployees.indexOf(employee);
  if (index !== -1) {
    this.addedEmployees.splice(index, 1);
  }
}


  
  
}