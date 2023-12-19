
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { HrService } from './hr.service';
import { FormGroup, FormBuilder } from '@angular/forms';

declare interface EmployeeTableData {
  headerRow: string[];
  dataRows: {
    empCode: string;
    name: string;
    awardNominations: string;
    previousAwards: string;
    doj: string;
    unit: string;
    skill: string;
    designation: string;
    mindCraftExp: string;
    totalExp: string;
    clientProject: string;
    nominatedBy: string;
    contactNumber: string;
    email: string;
    dob: string;
  }[];
}

interface EmployeeTableRow {
  empCode: string;
  name: string;
  awardNominations: string;
  previousAwards: string;
  doj: string;
  unit: string;
  skill: string;
  designation: string;
  mindCraftExp: string;
  totalExp: string;
  clientProject: string;
  nominatedBy: string;
  contactNumber: string;
  email: string;
  dob: string;
}

@Component({
  selector: 'hr-dashboard-cmp',
  moduleId: module.id,
  templateUrl: 'hr-dashboard.component.html'
})
export class HrDashboardComponent implements OnInit {
  selectedEmployee: EmployeeTableRow;
  displayRatingModal: boolean;
  displayDetailsModal: boolean;
  EmpForm: FormGroup; // Add the form group for Employee Details


  constructor(private hrService: HrService, private formBuilder: FormBuilder) {
    // Initialize the EmpForm in the constructor
    this.EmpForm = this.formBuilder.group({
      // Add form controls as needed
    });
  }


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
        'Emp Code',
        'Name',
        'Award Nominations',
        'Previous Awards',
        'DOJ',
        'Unit',
        'Skill',
        'Designation',
        'MindCraft Exp. in months',
        'Total Exp. in months',
        'Client/Project',
        'Nominated By',
        'Contact Number',
        'Email IDs',
        'DOB'
      ],
      dataRows: [
        {
          empCode: '3644',
          name: 'Christina Manakkal',
          awardNominations: 'Quarterly Performance Award',
          previousAwards: 'Promising Newcomer, Rising Star',
          doj: '01/08/2023',
          unit: 'Projects & Managed Services',
          skill: 'Angular & SpringBoot',
          designation: 'Associate Consultant',
          mindCraftExp: '4 months',
          totalExp: '4 months',
          clientProject: 'In-house project',
          nominatedBy: 'Amisha',
          contactNumber: '8108526500',
          email: 'christinajosedaya@gmail.com',
          dob: '02/06/2001'
        },
       
      
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
        // ...
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

  viewDetails(employee: EmployeeTableRow) {
    console.log("Details dialogbox Opened");
    this.selectedEmployee = employee;
    this.displayDetailsModal = true;
    this.displayRatingModal = false; // Close the View Ratings modal
  }


  onCloseDetailsModal() {
    console.log("Modal Closed");
    this.displayRatingModal = false;
    this.displayDetailsModal = false;
    this.selectedEmployee = null;
  }
  

  onCloseHandled() {
    console.log("Modal Closed");
    this.displayRatingModal = false;
    this.displayDetailsModal = false;
    this.selectedEmployee = null;
  }
  
}