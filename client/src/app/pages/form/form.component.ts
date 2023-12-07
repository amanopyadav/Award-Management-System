import { Component, Inject, OnInit, ChangeDetectorRef, ChangeDetectionStrategy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DateService } from './date.service';

@Component({
  selector: 'app-user',
  templateUrl: 'form.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormComponent implements OnInit {
  nominationForm: FormGroup;
  EmpForm: FormGroup;
  ProjectForm: FormGroup;

  filteredEmployees: any[] = [];
  filteredProjects: any[] = [];
  displayEmpModal: string = 'none';
  displayProjModal: string = 'none';
  Employees: any[] = [];
  Projects: any[] = [];
  searchData: string = '';

  isFormEnabled: boolean = true;
  setAwardForm: boolean;

  constructor(
    private fb: FormBuilder,
    @Inject(DateService) private dateService: DateService,
    private cdRef: ChangeDetectorRef // Inject ChangeDetectorRef
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
  }

  ngOnInit() {
    this.fetchAllEmployees();
    this.updateFormStatus();
    this.cdRef.detectChanges();
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

  openModal() {
    this.fetchAllEmployees();
    this.filteredEmployees = this.Employees;
    this.displayEmpModal = 'block';
  }

  openModalforproj() {
    this.fetchAllProjects();
    this.displayProjModal = 'block';
  }

  onCloseHandled() {
    this.displayEmpModal = 'none';
    this.searchData = '';
  }

  onCloseHandledforProj() {
    this.displayProjModal = 'none';
    this.searchData = '';
  }

  fetchAllEmployees() {
    // Your existing code for fetching employees
  }

  fetchAllProjects() {
    // Your existing code for fetching projects
  }

  addEmployee(employee: any) {
    // Your existing code for adding employees
  }

  addProject(project: any) {
    // Your existing code for adding projects
  }

  search() {
    // Your existing code for searching employees
  }

  searchProj() {
    // Your existing code for searching projects
  }
}
