  import { Component, Inject, OnInit, ChangeDetectorRef, ChangeDetectionStrategy } from '@angular/core';
  import { FormBuilder, FormGroup, Validators } from '@angular/forms';
  import { DateService } from './date.service';
  import { FormService } from './form.service';
  import { NotificationService } from './notification.service'; 
  // import { forkJoin } from 'rxjs';

  @Component({
    selector: 'app-user',
    templateUrl: 'form.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
  })
  export class FormComponent implements OnInit {

      private fetchedAwardId: number;

      nominationForm: FormGroup;
      EmpForm: FormGroup;
      ProjectForm: FormGroup;
      NominatedByForm: FormGroup;
      OnBehalfOfForm: FormGroup;
      mainForm: FormGroup;

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
      isFormEnabled: boolean = true;
      setAwardForm: boolean;
      selectedAwardId: number;
      showForm: boolean = false;
      showRatingScale = false;

    

    constructor(
      private fb: FormBuilder,
      @Inject(DateService) private dateService: DateService,
      private cdRef: ChangeDetectorRef, // Inject ChangeDetectorRef
      private formService: FormService,
      private notificationService: NotificationService
    ) {
      this.nominationForm = this.fb.group({
        award_category: ['', Validators.required],
        spot_award_subcategory: [''],
        half_yearly_award_subcategory: [''],
        half_yearly_award_isSales: ['']
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
        project_code: [{ value: '', disabled: !this.isFormEnabled }, Validators.required],
        client: [{ value: '', disabled: !this.isFormEnabled }, Validators.required],
        industry: [{ value: '', disabled: !this.isFormEnabled }, Validators.required],
      });

      this.NominatedByForm = this.fb.group({
        empName: ['',{value:''}], // FormControl for nominatedBy
        empDesignation: ['']  // FormControl for designation
      });
    
      this.OnBehalfOfForm = this.fb.group({
        empName: ['',{value:''}], // FormControl for OnBehalf of
        empDesignation: ['']  // FormControl for designation
      });   

      this.mainForm = this.fb.group({

            nomination: this.fb.group({
              award_category: ['', Validators.required],
              spot_award_subcategory: [''],
              half_yearly_award_subcategory: [''],
              half_yearly_award_isSales : ['']
            }),

            employee: this.fb.group({
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
            }),

            project: this.fb.group({
              project_name: [{ value: '', disabled: !this.isFormEnabled }, Validators.required],
              project_code: [{ value: '', disabled: !this.isFormEnabled }, Validators.required],
              client: [{ value: '', disabled: !this.isFormEnabled }, Validators.required],
              industry: [{ value: '', disabled: !this.isFormEnabled }, Validators.required]
            }),

            nominatedBy: this.fb.group({
              empName: [{value:''}], // FormControl for nominatedBy
              empDesignation: ['']
            }),

            onBehalfOf: this.fb.group({
              empName: [{value:''}], // FormControl for OnBehalf of
              empDesignation: ['']  
            }),
        
      });
  
    
    }

    handleCheckboxClick() {
      // console.log("Clicked this");
      // console.log("Sales before : "+this.nominationForm.get('half_yearly_award_isSales').value);

      // this.nominationForm.get('half_yearly_award_isSales').setValue('sales');

      // console.log("Sales after : "+this.nominationForm.get('half_yearly_award_isSales').value);


       // Check if the checkbox is checked
      if (this.nominationForm.get('half_yearly_award_isSales').value === 'sales') {
        console.log("sales value after uncheck : "+this.nominationForm.get('award_category').value === 'Promising newcomer');
        
        // If checked, set the value to an empty string when unchecked
        this.nominationForm.get('half_yearly_award_isSales').setValue('');
      } else {
        // If unchecked, set the value to 'sales' when checked
        this.nominationForm.get('half_yearly_award_isSales').setValue('sales');
      }
      
    }


    


 
    

    ngOnInit() {
      
      this.fetchAllEmployees();
      this.updateFormStatus();
      this.cdRef.detectChanges();
      this.fetchNominatedBy();
      this.fetchBehalfOf();
    
    }

    fetchNominatedBy(){
      this.formService.getExceptFreshers().subscribe(
        (data) => {
          this.nominatedByOptions = data;
        },
        (error) => {
          console.error(error);
        }
      );
    }

    fetchBehalfOf(){
      this.formService.getExceptFreshers().subscribe(
        (data) => {
          this.BehalfOptions = data;
        },
        (error) => {
          console.error(error);
        }
      );
    }

    onSubmit(): void {
      const awardId =  this.fetchedAwardId
      const awardCategory =  this.nominationForm.get('award_category').value
      let awardSubCategory : String;
      let awardSubCategory2 : String;
      if(awardCategory == 'Spot Award'){
        awardSubCategory =  this.nominationForm.get('spot_award_subcategory').value
        awardSubCategory2 =  this.nominationForm.get('half_yearly_award_isSales').value
      }else if(awardCategory == 'Half Yearly Award'){
        awardSubCategory =  this.nominationForm.get('half_yearly_award_subcategory').value
        awardSubCategory2 =  this.nominationForm.get('half_yearly_award_isSales').value
      }else{
        awardSubCategory =  this.nominationForm.get('half_yearly_award_subcategory').value
        awardSubCategory2 =  this.nominationForm.get('half_yearly_award_isSales').value
      }

      const empCode =  this.EmpForm.get('emp_id').value
      const empName =  this.EmpForm.get('empName').value
      const empDesignation =  this.EmpForm.get('empDesignation').value
      const unit =  this.EmpForm.get('function_name').value
      const skill =  this.EmpForm.get('primarySkillName').value
      const mindcraftExpInMonths =  this.EmpForm.get('mindcraftExpMon').value
      const totalExpInMonths =  this.EmpForm.get('totalExpMon').value
      const emailId =  this.EmpForm.get('email').value
      const contactNumber =  this.EmpForm.get('mobileNo').value
      const dob =  this.EmpForm.get('dob').value
      const doj =  this.EmpForm.get('joiningDate').value
      const projectName =  this.ProjectForm.get('project_name').value
      const projectCode =  this.ProjectForm.get('project_code').value
      const client =  this.ProjectForm.get('client').value
      const industryName =  this.ProjectForm.get('industry').value
      const nominatedBy =  this.NominatedByForm.get('empName').value
      const nomByDesignation =  this.NominatedByForm.get('empDesignation').value
      const onbehalfOf =  this.OnBehalfOfForm.get('empName').value
      const onBehalfDesignation =  this.OnBehalfOfForm.get('empDesignation').value
      const activeYN =  true
      const createdBy =  "Admin"
      const createdOn =  "2023-12-13T12:00:00"
      const updatedBy = "Admin"
      const updatedOn = "2023-12-13T12:00:00"

      const formData = {
        awardId,
        awardCategory,
        awardSubCategory,
        awardSubCategory2,
        empCode,
        empName,
        empDesignation,
        unit,
        skill,
        mindcraftExpInMonths,
        totalExpInMonths,
        emailId,
        contactNumber,
        dob,
        doj,
        projectName,
        projectCode,
        client,
        industryName,
        nominatedBy,
        nomByDesignation,
        onbehalfOf,
        onBehalfDesignation,
        activeYN,
        createdBy,
        createdOn,
        updatedBy,
        updatedOn
      }

      console.log("My subcategory : "+awardSubCategory2);
      

      console.log(formData);

      this.formService.addNominee(formData).subscribe(
        (response) => {
          window.alert("Done")
          console.log('Nominee data submitted successfully:', response);
          // this.onSave()
          // Handle success, such as showing a success message
        },
        (error) => {
          window.alert("Failed")
          console.error('Error submitting nominee data:', error);
          // Handle error, such as showing an error message
        }
      );

    }
    


    updateFormStatus(): boolean {
      
      const currentMonth = this.dateService.getCurrentMonth();
      const awardCategory = this.nominationForm.get('award_category').value;
      const spotAwardSubcategory = this.nominationForm.get('spot_award_subcategory').value;

      // Check if the selected category is spot_award or its subcategories
      if (
        awardCategory === 'Spot Award' ||
        (awardCategory === 'Promising newcomer' && [4, 7, 10, 12].includes(currentMonth)) ||
        (awardCategory === 'Quarterly Award' && [4, 7, 10, 12].includes(currentMonth)) ||
        (awardCategory === 'Rising Star Award' && [4, 7, 10, 12].includes(currentMonth)) ||
        (awardCategory === 'Spot Award' && spotAwardSubcategory && spotAwardSubcategory !== '') ||
        (awardCategory === 'Half Yearly Award' && [7, 12].includes(currentMonth)) ||
        (awardCategory === 'Team Award' && [7, 12].includes(currentMonth))
        
      ) {
        this.setAwardForm = true;
      } else {
        this.setAwardForm = false;
      }

      return this.setAwardForm;
    }

    onAwardCategoryChange() {
      this.updateFormStatus();
      const awardCategory = this.nominationForm.get('award_category').value;
      const spotAwardSubcategory = this.nominationForm.get('spot_award_subcategory').value;
      const halfYearlyAwardSubcategory = this.nominationForm.get('half_yearly_award_subcategory').value;
      const halfYearlyAwardSubcategory1 = this.nominationForm.get('half_yearly_award_isSales').value;

      console.log("Award: ", awardCategory);
      console.log("Spot award: ", spotAwardSubcategory);
      console.log("Half yearly: ", halfYearlyAwardSubcategory);
      console.log("Half yearly sales: ", halfYearlyAwardSubcategory1);

      if (awardCategory === 'Spot Award' && spotAwardSubcategory) {
        this.formService.getAwardId(awardCategory, spotAwardSubcategory).subscribe(
          (data) => {
            console.log('Fetched award_id:', data);
            this.fetchedAwardId = data; 
            console.log("fetchedaward id data : "+this.fetchedAwardId);
            // You can use the fetched award_id as needed
          },
          (error) => {
            console.error('Error fetching award_id:', error);
          }
        );
      } else if (awardCategory === 'Half Yearly Award' && halfYearlyAwardSubcategory && halfYearlyAwardSubcategory1) {
        this.formService.getAwardIdForSales(awardCategory, halfYearlyAwardSubcategory,halfYearlyAwardSubcategory1).subscribe(
          (data) => {
            console.log('Fetched award_id:', data);
            this.fetchedAwardId = data; 
            console.log("fetchedaward id data : "+this.fetchedAwardId);
            // You can use the fetched award_id as needed
          },
          (error) => {
            console.error('Error fetching award_id:', error);
          }
        );
      } else if (awardCategory === 'Half Yearly Award' && halfYearlyAwardSubcategory) {
        this.formService.getAwardId(awardCategory, halfYearlyAwardSubcategory).subscribe(
          (data) => {
            console.log('Fetched award_id:', data);
            this.fetchedAwardId = data; 
            console.log("fetchedaward id data : "+this.fetchedAwardId);
            // You can use the fetched award_id as needed
          },
          (error) => {
            console.error('Error fetching award_id:', error);
          }
        );
      }  else {
        this.formService.getAwardIdSingle(awardCategory).subscribe(
          (data) => {
            console.log('Fetched award_id:', data);
            this.fetchedAwardId = data; 
            console.log("fetchedaward id data : "+this.fetchedAwardId);
            // You can use the fetched award_id as needed
          },
          (error) => {
            console.error('Error fetching award_id:', error);
          }
        );
      }
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

      openModal() {
          console.log("Emp dialogbox Opened");
          
          this.fetchAllEmployees();
          // Initialize filteredEmployees with all employees when opening the dialog
          this.filteredEmployees = this.Employees;
          this.displayEmpModal = "block";
        }


        openModalforproj(empId: string) {
          console.log("Proj dialogbox opened");

          this.fetchSpecificProjects(empId);
          // this.filteredProjects = this.Projects
          this.displayProjModal = "block";
        
        }
        
      



    onCloseHandled() {
      this.displayEmpModal = 'none';
      this.searchData = '';
    }

        onCloseHandledforProj(){
          console.log("close proj dialog box");
          this.displayProjModal = "none";
          // this.searchData = ''; 
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

        fetchSpecificProjects(empId: string){
          console.log("Emplopyee id from frontend : ",empId);
          
          this.formService.getProjectDetailsByEmployeeCode(empId).subscribe(
            (data) => {
              this.filteredProjects = data; 
              console.log("Employee project data : ",this.filteredProjects);
            },
            (error) => {
              console.error(error);
            }
          )


        }

        // fetchAllProjects() {
        //   this.formService.getProject().subscribe(
        //     (data) => {
        //       this.filteredProjects = data;
        //       console.log(data);
        //     },
        //     (error) => {
        //       console.error(error);
        //     }
        //   );
        // }

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

          this.fetchSpecificProjects(employeeFormValues.emp_id)

      
          this.onCloseHandled();
        }

        addProject(project: any) {
          console.log("Adding Project:");
          console.log("Project ID:", project.project_code);
        
          const projectFormValues = {
            project_code: project.project_code,
            project_name: project.project_name,
            client: project.client,
            industry: project.industry,
          };
        
          this.ProjectForm.patchValue(projectFormValues);
        
          //console.log("Form values after adding project:", this.nominationForm.value);
        
          // Close the modal after adding a project
          this.onCloseHandledforProj();
        }

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

    onSave() {
      // Perform your save logic here
    
      // Notify user
      this.notificationService.showNotification('Nomination form filled successfully.');
    
      // Reset the forms
      this.nominationForm.reset();
      this.EmpForm.reset();
      this.ProjectForm.reset();
      this.NominatedByForm.reset();
      this.OnBehalfOfForm.reset();

        // Set default value for award_category
      this.nominationForm.get('award_category').setValue('');

      // Update the form status
      this.updateFormStatus();
    
      // Log to console
      console.log('Form saved and reset successfully.');
    }
      
    
  }



