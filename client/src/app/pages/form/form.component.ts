import { Component, Inject, OnInit, ChangeDetectorRef, ChangeDetectionStrategy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DateService } from './date.service';
import { FormService } from './form.service';

@Component({
  selector: 'app-user',
  templateUrl: 'form.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
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
    Employees: any[] = [];
    Projects: any[] = [];
    searchData: string = '';
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
  // isFormEnabled: any;

  isFormEnabled: boolean = true;
  setAwardForm: boolean;
    

  constructor(
    private fb: FormBuilder,
    @Inject(DateService) private dateService: DateService,
    private cdRef: ChangeDetectorRef, // Inject ChangeDetectorRef
    private formService: FormService
  ) {
    this.nominationForm = this.fb.group({
      award_category: ['', Validators.required],
      spot_award_subcategory: [''], // Add this line for spot_award_subcategory
    });

    this.EmpForm = this.fb.group({
      emp_id: ['', Validators.required],
      empName: [{ value: '', disabled: !this.isFormEnabled }],
      empDesignation: [{ value: '', disabled: !this.isFormEnabled }],
      function_name: [{ value: '', disabled: !this.isFormEnabled }],
      primarySkillName: [{ value: '', disabled: !this.isFormEnabled }],
      mindcraftExpMon: [{ value: '', disabled: !this.isFormEnabled }],
      totalExpMon: [{ value: '', disabled: !this.isFormEnabled }],
      email: [{ value: '', disabled: !this.isFormEnabled }],
      mobileNo: [{ value: '', disabled: !this.isFormEnabled }],
      dob: [{ value: '', disabled: !this.isFormEnabled }],
      joiningDate: [{ value: '', disabled: !this.isFormEnabled }],
    });

    this.ProjectForm = this.fb.group({
      project_name: [{ value: '', disabled: !this.isFormEnabled }, Validators.required],
      project_id: [{ value: '', disabled: !this.isFormEnabled }, Validators.required],
      client: [{ value: '', disabled: !this.isFormEnabled }, Validators.required],
      industry_name: [{ value: '', disabled: !this.isFormEnabled }, Validators.required],
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
    this.updateFormStatus();
    this.cdRef.detectChanges();
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

  updateFormStatus(): boolean {
    const currentMonth = this.dateService.getCurrentMonth();
    const awardCategory = this.nominationForm.get('award_category').value;
    const spotAwardSubcategory = this.nominationForm.get('spot_award_subcategory').value;

    // Check if the selected category is spot_award or its subcategories
    if (
      awardCategory === 'spot_award' ||
      (awardCategory === 'promising_newcomer' && [4, 7, 10, 1].includes(currentMonth)) ||
      (awardCategory === 'quaterly_award' && [4, 7, 10, 1].includes(currentMonth)) ||
      (awardCategory === 'rising_star' && [4, 7, 10, 1].includes(currentMonth)) ||
      (awardCategory === 'spot_award' && spotAwardSubcategory && spotAwardSubcategory !== '') ||
      (awardCategory === 'half_yearly_award' && [7, 1].includes(currentMonth)) ||
      (awardCategory === 'team_award' && [7, 1].includes(currentMonth))
      
    ) {
      this.setAwardForm = true;
    } else {
      this.setAwardForm = false;
    }

    return this.setAwardForm;
  }

  onAwardCategoryChange() {
    this.updateFormStatus();
  }

  private disableFormControls(formGroup: FormGroup): void {
    Object.keys(formGroup.controls).forEach((key) => {
      const control = formGroup.get(key);
      control.disable();
      console.log(`${key} is disabled: ${control.disabled}`);
    });
  }

  private enableFormControls(formGroup: FormGroup): void {
    Object.keys(formGroup.controls).forEach((key) => {
      const control = formGroup.get(key);
      control.enable();
      console.log(`${key} is enabled: ${control.enabled}`);
    });
  }

  // openModal() {
  //   this.fetchAllEmployees();
  //   this.filteredEmployees = this.Employees;
  //   this.displayEmpModal = 'block';
  // }
    // ngOnInit() {
    //   this.fetchAllEmployees();
    // }

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
    this.displayEmpModal = 'none';
    this.searchData = '';
  }

      onCloseHandledforProj(){
        console.log("close proj dialog box");
        this.displayProjModal = "none";
        this.searchData = ''; 
      }

      fetchAllEmployees() {
        // Your existing code for fetching employees
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
        // Your existing code for adding employees
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
      

    //   searchProj() {
    // console.log('Search function triggered');
    // console.log('Search Data:', this.searchData);
    // console.log('Projects:', this.Projects);
  
    // if (!this.Projects) {
    //   return;
    // }
  
    // Handle both scenarios: searching and showing all projects
  //   this.filteredProjects = this.searchData.trim() === ''
  //     ? this.Projects // Show all projects
  //     : this.Projects.filter(project =>
  //       this.projectContainsSearchData(project)
  //     );
  // }
  
  // projectContainsSearchData(project: any): boolean {
  //   const searchDataLowerCase = this.searchData.toLowerCase();
  
  //   return (
  //     (project.project_id && project.project_id.toString().includes(searchDataLowerCase)) ||
  //     (project.project_name && project.project_name.toLowerCase().includes(searchDataLowerCase)) ||
  //     (project.client && project.client.toLowerCase().includes(searchDataLowerCase)) ||
  //     (project.industry_name && project.industry_name.toLowerCase().includes(searchDataLowerCase))
  //     // Add other properties as needed
  //   );
  // }



  // addProject(project: any) {
  //   console.log("Adding Project:");
  //   console.log("Project ID:", project.project_id);
  
  //   // Assuming you have a service to set the project ID
  //   // this.projectService.setProjectId(project.project_id);
  
  //   const projectFormValues = {
  //     project_id: project.project_id,
  //     project_name: project.project_name,
  //     client: project.client,
  //     industry_name: project.industry_name,
  //   };
  
  //   this.ProjectForm.patchValue(projectFormValues);
  
  //   //console.log("Form values after adding project:", this.nominationForm.value);
  
  //   // Close the modal after adding a project
  //   this.onCloseHandledforProj();
  // }
  
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
