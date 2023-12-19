import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { HrService } from './hr.service';
import { FormGroup } from '@angular/forms';

declare interface EmployeeTableData {
  headerRow: string[];
  dataRows: {
    awardCategory: string;
    awardSubCategory: string;
    awardSubCategory2: string;
    empCode: string;
    empName: string;
    nominatedBy: string;
    nomByDesignation: string;
    onbehalfOf: string;
    onBehalfDesignation: string;
  }[];
}

interface EmployeeTableRow {
    awardCategory: string;
    awardSubCategory: string;
    awardSubCategory2: string;
    empCode: string;
    empName: string;
    nominatedBy: string;
    nomByDesignation: string;
    onbehalfOf: string;
    onBehalfDesignation: string;
}

interface EmployeeDetails{
  empCode: string;
  empName: string;
  doj: Date;
  unit: string;
  skill: string;
  empDesignation: string;
  mindcraftExpInMonths: number;
  totalExpInMonths: number;
  contactNumber: number;
  emailId: string;
  dob: number;
  projectCode: number;
  projectName: string;
  client: string;
  industryName: string;
}

@Component({
  selector: 'hr-dashboard-cmp',
  moduleId: module.id,
  templateUrl: 'hr-dashboard.component.html'
})
export class HrDashboardComponent implements OnInit {

  EmpForm: FormGroup

  Employees: EmployeeTableRow[];
  selectedEmployee: EmployeeTableRow;  // Add this line
  displayEmpModal: boolean = false;
  displayRatingModal: boolean;

  constructor( private hrService: HrService){}


onScroll() {
throw new Error('Method not implemented.');
}
  public employeeTableData: EmployeeTableData;
  public filteredEmployeeData: EmployeeTableRow[];
  public searchTerm: string = '';


  @ViewChild('shortlistColumn') shortlistColumn: ElementRef;
  @ViewChild('selectColumn') selectColumn: ElementRef;
  @ViewChild('tableContainer') tableContainer: ElementRef;
selectData: any;
shortlistData: any;
restData: any;

  ngOnInit() {

    this.fetchNomineeList();
    // Initialize the employee data here or fetch it from a service
    this.employeeTableData = {
      headerRow: [
        'Shortlist',
        'Award Category',
        'Award Sub Category',
        'Award Sub Category2',
        'Emp Code',
        'Emp Name',
        'Nominated By Designation',
        'On Behalf Of',
        'Designation',
        'Actions'
      ],
      dataRows: [ 
        // Add more employee data as needed
      ]
    };
    this.filteredEmployeeData = [...this.employeeTableData.dataRows];

    // Add a scroll event listener to the tableContainer
    this.tableContainer.nativeElement.addEventListener('scroll', this.onScroll.bind(this));
  
  }

  applyFilter() {
    this.filteredEmployeeData = this.employeeTableData.dataRows.filter(row =>
      Object.values(row).some(value =>
        value.toString().toLowerCase().includes(this.searchTerm.toLowerCase())
      )
    );
  }

  fetchNomineeList() {
    this.hrService.getNomineeList().subscribe(
      (data: any[]) => {
        console.log('Nominee List Data:', data);
        this.employeeTableData.dataRows = data.map(item => ({
          awardCategory: item.award_category,
          awardSubCategory: item.award_sub_category,
          awardSubCategory2: item.award_sub_category2,
          empCode: item.emp_code,
          empName: item.emp_name,
          nominatedBy: item.nominated_by,
          nomByDesignation: item.nom_by_designation,
          onbehalfOf: item.onbehalf_of,
          onBehalfDesignation: item.on_behalf_designation
        }));
        this.filteredEmployeeData = [...this.employeeTableData.dataRows];
      },
      (error) => {
        console.error('Error fetching nominee list:', error);
      }
    );
  }

  
  openModal(employee: EmployeeTableRow) {
    console.log("Emp dialogbox Opened");
    this.selectedEmployee = employee;  // Set the selectedEmployee
    this.displayEmpModal = true;  // Show the modal
  }

  onCloseHandled() {
    console.log("Emp dialogbox Closed");
    this.displayEmpModal = false;  // Hide the modal
    this.selectedEmployee = null;
  }

  // onCloseHandledforRating() {
  //   console.log("rating dialogbox Closed");
  //   this.displayRatingModal = false;  // Hide the modal
  //   this.selectedEmployee = null;
  // }

  // viewRatings(employee: EmployeeTableRow) {
  //   console.log("Rating dialogbox Opened");
  //   this.selectedEmployee = employee;  // Set the selectedEmployee
  //   this.displayRatingModal = true;  // Show the modal
  // }
  


  
}