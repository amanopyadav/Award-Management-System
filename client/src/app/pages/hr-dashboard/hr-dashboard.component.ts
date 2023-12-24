import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { HrService } from './hr.service';
import { FormGroup } from '@angular/forms';
import { NgZone } from '@angular/core';

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
  dataLoaded: boolean = false;

  constructor(private hrService: HrService, private ngZone: NgZone) { }


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
    this.dataLoaded = true;


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
        this.ngZone.run(() => {
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
          this.dataLoaded = true;
        });
      },
      (error) => {
        console.error('Error fetching nominee list:', error);
      }
    );
  }
  

  viewRatings(employee: EmployeeTableRow) {
    console.log("Rating dialogbox Opened");
    this.selectedEmployee = employee;
    this.displayRatingModal = true;
    this.displayDetailsModal = false; // Close the View Details modal
  }

  viewDetails(empCode: string) {
    console.log("Details dialogbox Opened for empCode: ", empCode);
  
    // Fetch detailed information for the selected employee
    if (this.dataLoaded) {
      this.hrService.getEmployeeDetails(empCode).subscribe(
        (details: EmployeeDetailsNew) => {
          console.log("Employee details fetched: ", details);
  
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
    }
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