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
    ProjectForm: FormGroup;
    NominatedByForm: FormGroup;
    OnBehalfOfForm: FormGroup;

    filteredEmployees: any[] = [];
    filteredProjects: any[]=[];
    filteredNominatedBy: any[]=[];
    filteredOnBehalf: any[]=[];

    displayEmpModal: string = 'none';
    displayProjModal: string = 'none';
    displayNominatedByModal: string = 'none';
    displayOnBehalfModal: string = 'none';
    Employees: any[] = [];
    Projects: any[] = [];
    searchData: string = '';
    searchDataProj: string = '';
    nominatedByOptions: any[] = [];
    BehalfOptions: any[] = [];

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

  this.NominatedByForm = this.fb.group({
    empName: [{value:''}], // FormControl for nominatedBy
    empDesignation: ['']  // FormControl for designation
  });

  this.OnBehalfOfForm = this.fb.group({
    empName: [{value:''}], // FormControl for OnBehalf of
    empDesignation: ['']  // FormControl for designation
  });

  
}

    ngOnInit() {
      this.fetchAllEmployees();
      this.fetchAllProjects();
      //this.getNominatedByOptions();
      // Fetch nominated by options from the backend
    this.formService.getExceptFreshers().subscribe(
      (data) => {
        this.nominatedByOptions = data;
      },
      (error) => {
        console.error(error);
      }
    );

    this.formService.getExceptFreshers().subscribe(
      (data) => {
        this.BehalfOptions = data;
      },
      (error) => {
        console.error(error);
      }
    );
    }

    openModal() {
        console.log("Emp dialogbox Opened");

        // Clear the search data when opening the dialog
        this.searchData = '';

        
        this.fetchAllEmployees();
        // Initialize filteredEmployees with all employees when opening the dialog
        this.filteredEmployees = this.Employees;
        this.displayEmpModal = "block";
      }

      openModalforproj(){
        console.log("Proj dialogbox opened");
        this.searchDataProj = '';

        this.fetchAllProjects();
        this.filteredProjects= this.Projects;
    
        this.displayProjModal = "block";
      }

      // openModalforNominatedBy(){
      //   console.log("NominatedBy dialogbox opened");
      //   this.fetchAllExceptFreshers();
    
      //   this.displayNominatedByModal = "block";
      // }

      // openModalforOnBehalf(){
      //   console.log("On Behalf Of dialogbox opened");
      //   this.fetchAllOnBehalf();
    
      //   this.displayOnBehalfModal = "block";
      // }

      onCloseHandled() {
        this.displayEmpModal = "none";
        this.searchData = ''; 
      }

      onCloseHandledforProj(){
        console.log("close proj dialog box");
        this.displayProjModal = "none";
        //this.searchData = ''; 
        this.searchDataProj= '';
      }

      // onCloseHandledforNominatedBy(){
      //   console.log("close NominatedBy dialog box");
      //   this.displayNominatedByModal = "none";
      //   this.searchData = ''; 
      // }

      // onCloseHandledforOnBehalf(){
      //   console.log("close On Behalf dialog box");
      //   this.displayOnBehalfModal = "none";
      //   this.searchData = ''; 
      // }

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

      fetchAllExceptFreshers() {
        this.formService.getExceptFreshers().subscribe(
          (data) => {
            this. filteredNominatedBy= data;
            console.log(data);
          },
          (error) => {
            console.error(error);
          }
        );
      }

      fetchAllOnBehalf() {
        this.formService.getExceptFreshers().subscribe(
          (data) => {
            this. filteredOnBehalf= data;
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
    };
  
    this.ProjectForm.patchValue(projectFormValues);
  
    //console.log("Form values after adding project:", this.nominationForm.value);
  
    // Close the modal after adding a project
    this.onCloseHandledforProj();
  }

  // addNominatedBy(nominated_by: any) {
  //   console.log("Autofill nominated by", nominated_by);
  //   //console.log(nominated_by.emp_id);

  //   // this.formService.setEmployeeId(employee.emp_id);
  
  //   const nominatedbyFormValues = {
      
  //     empName: nominated_by.emp_name,
  //     empDesignation: nominated_by.designation_name,
      
  //   };
  //   this.NominatedByForm.patchValue(nominatedbyFormValues);

  //   this.onCloseHandledforNominatedBy();
  // }
  addNominatedBy(selectedEmpName: string) {
    const selectedEmployee = this.nominatedByOptions.find(emp => emp.emp_name === selectedEmpName);
  
    if (selectedEmployee) {
      const nominatedbyFormValues = {
        empName: selectedEmployee.emp_name,
        empDesignation: selectedEmployee.designation_name,
      };
      this.NominatedByForm.patchValue(nominatedbyFormValues);
      //this.onCloseHandledforNominatedBy();
    }
  }
  
  
  // addOnBehalf(on_behalf: any) {
  //   console.log("Autofill nominated by", on_behalf);
  //   //console.log(nominated_by.emp_id);

  //   // this.formService.setEmployeeId(employee.emp_id);
  
  //   const onbehalfFormValues = {
      
  //     empName: on_behalf.emp_name,
  //     empDesignation: on_behalf.designation_name,
      
  //   };
  //   this.OnBehalfOfForm.patchValue(onbehalfFormValues);

  //   this.onCloseHandledforOnBehalf();
  // }
  addOnBehalf(selectedEmpName: string) {
    const selectedEmployee = this.BehalfOptions.find(emp => emp.emp_name === selectedEmpName);
    
    if (selectedEmployee) {
      const onbehalfFormValues = {
        empName: selectedEmployee.emp_name,
        empDesignation: selectedEmployee.designation_name,
      };
      this.OnBehalfOfForm.patchValue(onbehalfFormValues);
      //this.onCloseHandledforOnBehalf();
    }
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

      onSearchInputChange(event: Event) {
        // Ensure that the target is an HTMLInputElement
        if (event.target instanceof HTMLInputElement) {
          // Update the searchData property when the input changes
          this.searchData = event.target.value;
        }
      }
      

      searchProj() {
    console.log('Search function triggered');
    console.log('searchDataProj Data:', this.searchDataProj);
    console.log('Projects:', this.Projects);
  
    if (!this.Projects) {
      return;
    }
  
    // Handle both scenarios: searching and showing all projects
    this.filteredProjects = this.searchDataProj.trim() === ''
      ? this.Projects // Show all projects
      : this.Projects.filter(project =>
        project.project_name && project.project_name.toLowerCase().includes(this.searchDataProj.toLowerCase())
        // this.projectContainsSearchData(project)
      );
  }

  onSearchInputChangeforProj(event: Event) {
    // Ensure that the target is an HTMLInputElement
    if (event.target instanceof HTMLInputElement) {
      // Update the searchData property when the input changes
      this.searchDataProj = event.target.value;
    }
  }
  
  onNominatedBySelection() {
    const selectedEmpName = this.NominatedByForm.get('empName').value;
    
    // Find the selected employee from the options
    const selectedEmployee = this.nominatedByOptions.find(option => option.emp_name === selectedEmpName);

    // Update the designation in the form
    if (selectedEmployee) {
      this.NominatedByForm.get('empDesignation').setValue(selectedEmployee.designation);
    }
  }

  onNominatedByChange(event: any) {
    const selectedEmpName = event.target.value;
  
    // Find the selected employee by emp_name
    const selectedEmployee = this.nominatedByOptions.find(emp => emp.emp_name === selectedEmpName);
  
    if (selectedEmployee) {
      // Update the designation field in the form
      this.NominatedByForm.get('empDesignation').setValue(selectedEmployee.designation);
    }
  }
  
  
  
    
   
}
