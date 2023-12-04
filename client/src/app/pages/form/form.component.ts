import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FormService } from './form.service';


@Component({
  selector: 'app-user',
  templateUrl: 'form.component.html',
})
export class FormComponent implements OnInit {

    nominationForm: FormGroup;
    EmpForm: FormGroup;
    ProjectForm: FormGroup

    filteredEmployees: any[] = [];
    filteredProjects: any[]=[];
    displayEmpModal: string = 'none';
    displayProjModal: string = 'none';
    Employees: any[] = [];
    Projects: any[] = [];
    searchData: string = '';

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
    

  constructor(
    private fb: FormBuilder,
    private formService: FormService
  ){

    this.nominationForm=this.fb.group({
        award_category: ['', Validators.required]
      
    });

    this.EmpForm = this.fb.group({
        emp_id: ['', Validators.required],
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

  this.ProjectForm = this.fb.group({
    project_name: ['', Validators.required],
    project_id: ['', Validators.required],
    client: ['', Validators.required],
    industry_name: ['', Validators.required],
  });
}

    ngOnInit() {
      this.fetchAllEmployees();
    }

    openModal() {
        console.log("Emp dialogbox Opened");
        
        this.fetchAllEmployees();
        // Initialize filteredEmployees with all employees when opening the dialog
        this.filteredEmployees = this.Employees;
        this.displayEmpModal = "block";
      }

      openModalforproj(){
        console.log("Proj dialogbox opened");
        this.fetchAllProjects();
    
        this.displayProjModal = "block";
      }

      onCloseHandled() {
        this.displayEmpModal = "none";
        this.searchData = ''; 
      }

      onCloseHandledforProj(){
        console.log("close proj dialog box");
        this.displayProjModal = "none";
        this.searchData = ''; 
      }

      fetchAllEmployees() {
        this.formService.getEmployees().subscribe(
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
        this.formService.getProject().subscribe(
          (data) => {
            this.filteredProjects = data;
            console.log(data);
          },
          (error) => {
            console.error(error);
          }
        );
      }

      addEmployee(employee: any) {
        console.log("Checking!!");
        console.log(employee.emp_id);
    
        // this.formService.setEmployeeId(employee.emp_id);
      
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
        this.EmpForm.patchValue(employeeFormValues);
    
        this.onCloseHandled();
      }

      addProject(project: any) {
    console.log("Adding Project:");
    console.log("Project ID:", project.project_id);
  
    // Assuming you have a service to set the project ID
    // this.projectService.setProjectId(project.project_id);
  
    const projectFormValues = {
      project_id: project.project_id,
      project_name: project.project_name,
      client: project.client,
      industry_name: project.industry_name,
      // Add other project-related properties as needed
    };
  
    this.ProjectForm.patchValue(projectFormValues);
  
    console.log("Form values after adding project:", this.nominationForm.value);
  
    // Close the modal after adding a project
    this.onCloseHandledforProj();
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

      searchProj() {
    console.log('Search function triggered');
    console.log('Search Data:', this.searchData);
    console.log('Projects:', this.Projects);
  
    if (!this.Projects) {
      return;
    }
  
    // Handle both scenarios: searching and showing all projects
    this.filteredProjects = this.searchData.trim() === ''
      ? this.Projects // Show all projects
      : this.Projects.filter(project =>
        this.projectContainsSearchData(project)
      );
  }
  
  projectContainsSearchData(project: any): boolean {
    const searchDataLowerCase = this.searchData.toLowerCase();
  
    return (
      (project.project_id && project.project_id.toString().includes(searchDataLowerCase)) ||
      (project.project_name && project.project_name.toLowerCase().includes(searchDataLowerCase)) ||
      (project.client && project.client.toLowerCase().includes(searchDataLowerCase)) ||
      (project.industry_name && project.industry_name.toLowerCase().includes(searchDataLowerCase))
      // Add other properties as needed
    );
  }
  
  
    
   
}
