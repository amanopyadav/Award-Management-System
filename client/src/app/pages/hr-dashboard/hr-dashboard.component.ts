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

interface EmployeeDetails {
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
  dob: Date;
  projectCode: number;
  projectName: string;
  client: string;
  industryName: string;
}



interface EmployeeDetailsNew {
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
  dob: Date;
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
  employeeDetails: EmployeeDetails;
  employeeDetailsnew: EmployeeDetailsNew;
  displayEmpModal: boolean = false;
  displayRatingModal: boolean;
  displayDetailsModal: boolean;

  constructor(private hrService: HrService) { }


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


  // openModal(employee: EmployeeTableRow) {
  //   console.log("Emp dialogbox Opened");
  //   this.selectedEmployee = employee;  // Set the selectedEmployee
  //   this.displayEmpModal = true;  // Show the modal
  // }

  // onCloseHandled() {
  //   console.log("Emp dialogbox Closed");
  //   this.displayEmpModal = false;  // Hide the modal
  //   this.selectedEmployee = null;
  // }

  // onCloseHandledforRating() {
  //   console.log("rating dialogbox Closed");
  //   this.displayRatingModal = false;  // Hide the modal
  //   this.selectedEmployee = null;
  // }

  viewRatings(employee: EmployeeTableRow) {
    console.log("Rating dialogbox Opened");
    this.selectedEmployee = employee;
    this.displayRatingModal = true;
    this.displayDetailsModal = false; // Close the View Details modal
  }

  viewDetails(employee: EmployeeTableRow) {
    console.log("Details dialogbox Opened");

    // Fetch detailed information for the selected employee
    this.hrService.getEmployeeDetails(employee.empCode).subscribe(
      (details: EmployeeDetailsNew) => {
        console.log("Yes fetched");



        this.employeeDetailsnew = details;
        console.log("Emp data fetched: " + JSON.stringify(this.employeeDetailsnew));


        // Open the details modal after fetching the details
        this.displayDetailsModal = true;
        this.displayRatingModal = false; // Close the View Ratings modal
      },
      (error) => {
        console.error('Error fetching employee details:', error);
      }
    );

    // this.selectedEmployee = employee;
    this.displayDetailsModal = true;
    this.displayRatingModal = false; // Close the View Ratings modal
  }


  onCloseDetailsModal() {
    console.log("Emp Details Modal Closed");
    this.displayRatingModal = false;
    this.displayDetailsModal = false;
    this.selectedEmployee = null;
  }


  onCloseHandled() {
    console.log("Rating Model Closed");
    this.displayRatingModal = false;
    this.displayDetailsModal = false;
    this.selectedEmployee = null;
  }




}