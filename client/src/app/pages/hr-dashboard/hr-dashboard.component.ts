import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { HrService } from './hr.service';
import { FormGroup } from '@angular/forms';
import { NgZone } from '@angular/core';
import { forkJoin } from 'rxjs';

declare interface EmployeeTableData {
  headerRow: string[];
  dataRows: {
    awardCategory: string;
    awardSubCategory: string;
    awardSubCategory2: string;
    empCode: string;
    empName: string;
    emp_designation: string;
    dob: Date;
    project_code: number;
    client: string;
    doj: Date;
    unit: string;
    skill: string;
    total_exp_in_months: number;
    mindcraft_exp_in_months: number;
    nominatedBy: string;
  }[];
}

interface EmployeeTableRow {
    awardCategory: string;
    awardSubCategory: string;
    awardSubCategory2: string;
    empCode: string;
    empName: string;
    emp_designation: string;
    dob: Date;
    project_code: number;
    client: string;
    doj: Date;
    unit: string;
    skill: string;
    total_exp_in_months: number;
    mindcraft_exp_in_months: number;
    nominatedBy: string;
}

interface EmployeeDetails {
  empCode: string;
  empName: string;
  doj: Date;
  unit: string;
  skill: string;
  emp_designation: string;
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

interface EmpratingData{
  empCode : string;
  empName : string
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

interface EmployeeDetailsNew1{
  award_category: string;
  award_sub_category: string;
  award_sub_category2: string;
  nominated_by: string;
  nom_by_designation: string;
  onbehalf_of: string;
  on_behalf_designation: string;
}

@Component({
  selector: 'hr-dashboard-cmp',
  moduleId: module.id,
  templateUrl: 'hr-dashboard.component.html'
})
export class HrDashboardComponent implements OnInit {


  EmpForm: FormGroup
  
  // EmpRand: EmpratingData;
  EmpRand = {
    empCode : {},
    empName : {}
  }

  Employees: EmployeeTableRow[];
  
  EmployeeRatings: any[]=[];
  // nom1: EmployeeDetailsNew1;
  selectedEmployee: EmployeeTableRow;  // Add this line
  employeeDetails: EmployeeDetails;
  employeeDetailsnew: EmployeeDetailsNew;
  // employeeDetailsnew1: EmployeeDetailsNew1;
  employeeDetailsnew1 = {
    award_category: {},
    award_sub_category: {},
    award_sub_category2: {},
    nominated_by: {},
    nom_by_designation: {},
    onbehalf_of: {},
    on_behalf_designation: {}
  }
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
        'Emp Code',
        'Emp Name',
        'Designation',
        'DOB',
        'Project Code',
        'Client',
        'DOJ',
        'Unit',
        'Skill',
        'Total Experience',
        'MindCraft Experience',
        'Nominated By',
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
            emp_designation: item.emp_designation,
            dob: item.dob,
            project_code: item.project_code,
            client: item.client,
            doj: item.doj,
            unit: item.unit,
            skill: item.skill,
            total_exp_in_months: item.total_exp_in_months,
            mindcraft_exp_in_months: item.mindcraft_exp_in_months,
            nominatedBy: item.nominated_by,
            
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
  

  viewRatings(empCode: string,empName: string,awardCategory: string,awardSubCategory: string,awardSubCategory2: string) {
    console.log("Rating dialogbox Opened");

    console.log("Empcode : ", empCode);
    console.log("EmpName : ", empName);
    console.log("AwardCategory : ", awardCategory);
    console.log("AwardSubCategory : ", awardSubCategory);
    console.log("AwardSubCategory2 : ", awardSubCategory2);

    if(this.dataLoaded){

      if(awardCategory != '' && awardSubCategory != '' && awardSubCategory2 != ''){
        this.hrService.fetchNominationIDThree(empCode,awardCategory,awardSubCategory,awardSubCategory2).subscribe(
          (res)=>{
            console.log("Nomination Id: ",res);
            this.hrService.getRatingDetails(res).subscribe(
              (data) => {
                this.EmployeeRatings = data; 
                this.EmpRand.empCode = empCode
                this.EmpRand.empName = empName;
                console.log("Employee rating data : ",this.EmployeeRatings);
              },
              (error) => {
                console.error(error);
              }
            )
            
          },
          (err)=>{
            console.error("Errro fetching nominee details: ",err);
          }
        )
      }
      else if(awardCategory != '' && awardSubCategory != ''){
        this.hrService.fetchNominationIDTwo(empCode,awardCategory,awardSubCategory).subscribe(
          (res)=>{
            console.log("Nomination Id: ",res);
            this.hrService.getRatingDetails(res).subscribe(
              (data) => {
                this.EmployeeRatings = data; 
                this.EmpRand.empCode = empCode
                this.EmpRand.empName = empName;
                console.log("Employee rating data : ",this.EmployeeRatings);
              },
              (error) => {
                console.error(error);
              }
            )
            
          },
          (err)=>{
            console.error("Errro fetching nominee details: ",err);
          }
        )
      }
      else if(awardCategory != ''){
        console.log("hey this is me");
        
        this.hrService.fetchNominationIDOne(empCode,awardCategory).subscribe(
          (res)=>{
            console.log("Nomination Id: ",res);
            this.hrService.getRatingDetails(res).subscribe(
              (data) => {
                this.EmployeeRatings = data; 
                this.EmpRand.empCode = empCode
                this.EmpRand.empName = empName;
                
                console.log("Employee rating data : ",this.EmployeeRatings);
              },
              (error) => {
                console.error(error);
              }
            )
            
          },
          (err)=>{
            console.error("Errro fetching nominee details: ",err);
          }
        )
      }
    }

    // this.selectedEmployee = employee;
    this.displayRatingModal = true;
    this.displayDetailsModal = false; // Close the View Details modal
  }

  viewDetails(empCode: string,awardCategory: string,awardSubCategory: string,awardSubCategory2: string) {
    console.log("Empcode : ", empCode);
    console.log("AwardCategory : ", awardCategory);
    console.log("AwardSubCategory : ", awardSubCategory);
    console.log("AwardSubCategory2 : ", awardSubCategory2);

  
    // Fetch detailed information for the selected employee
    if (this.dataLoaded) {
      this.hrService.getEmployeeDetails(empCode).subscribe(
        (details: EmployeeDetailsNew) => {
          console.log("Employee details fetched: ", details);
  
          this.employeeDetailsnew = details;
          console.log("Emp data fetched: " + JSON.stringify(this.employeeDetailsnew));


          // for 1
          if(awardSubCategory == '' && awardSubCategory2 == ''){
            this.hrService.getNominationDetails1(empCode,awardCategory).subscribe(
              (data) => {
                console.log("data : ",data);
                const firstElement = data[0];

                this.employeeDetailsnew1 = {
                  award_category: firstElement.award_category,
                  award_sub_category: firstElement.award_sub_category,
                  award_sub_category2: firstElement.award_sub_category2,
                  nominated_by: firstElement.nominated_by,
                  nom_by_designation: firstElement.nom_by_designation,
                  onbehalf_of: firstElement.onbehalf_of,
                  on_behalf_designation: firstElement.on_behalf_designation,
                };

                console.log("Form data : ",this.employeeDetailsnew1);

              },
              (err)=>{
                console.error("Error fetching nominee details",err)
              }
            )
          }

          // for 2
          else if(awardSubCategory2 == ''){
            this.hrService.getNominationDetails2(empCode,awardCategory,awardSubCategory).subscribe(
              (data) => {
                console.log("data : ",data);

                const firstElement = data[0];

                this.employeeDetailsnew1 = {
                  award_category: firstElement.award_category,
                  award_sub_category: firstElement.award_sub_category,
                  award_sub_category2: firstElement.award_sub_category2,
                  nominated_by: firstElement.nominated_by,
                  nom_by_designation: firstElement.nom_by_designation,
                  onbehalf_of: firstElement.onbehalf_of,
                  on_behalf_designation: firstElement.on_behalf_designation,
                };

                console.log("Form data : ",this.employeeDetailsnew1);
              },
              (err)=>{
                console.error("Error fetching nominee details",err)
              }
            )
          }

          // for 3
          else if(awardSubCategory != '' && awardSubCategory2 != ''){
            this.hrService.getNominationDetails3(empCode,awardCategory,awardSubCategory,awardSubCategory2).subscribe(
              (data) => {
                console.log("data : ",data);

                const firstElement = data[0];

                this.employeeDetailsnew1 = {
                  award_category: firstElement.award_category,
                  award_sub_category: firstElement.award_sub_category,
                  award_sub_category2: firstElement.award_sub_category2,
                  nominated_by: firstElement.nominated_by,
                  nom_by_designation: firstElement.nom_by_designation,
                  onbehalf_of: firstElement.onbehalf_of,
                  on_behalf_designation: firstElement.on_behalf_designation,
                };

                console.log("Form data : ",this.employeeDetailsnew1);
              },
              (err)=>{
                console.error("Error fetching nominee details",err)
              }
            )
          }
  
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



  // viewDetails(empCode: string) {
  //   console.log("Empcode : ", empCode);
  
  //   // Fetch detailed information for the selected employee
  //   if (this.dataLoaded) {
  //     // Use forkJoin to make multiple requests in parallel
  //     forkJoin([
  //       this.hrService.getEmployeeDetails(empCode),
  //       // this.hrService.getNominationDetails(empCode)
  //     ]).subscribe(
  //       (results: [EmployeeDetailsNew, EmployeeDetailsNew1]) => {
  //         console.log("Employee details fetched: ", results[0]);
  //         console.log("Employee details fetched 1: ", results[1]);
  
  //         this.employeeDetailsnew = results[0];
  //         this.employeeDetailsnew1 = results[1];
  
  //         console.log("Emp data fetched: " + JSON.stringify(this.employeeDetailsnew));
  
  //         // Open the details modal after fetching the details
  //         this.displayDetailsModal = true;
  //         this.displayRatingModal = false; // Close the View Ratings modal
  //       },
  //       (error) => {
  //         console.error('Error fetching employee details:', error);
  //       }
  //     );
  //   }
  // }
  
  


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

// Add this method to your TypeScript file
shouldShowViewRatings(awardCategory: string): boolean {
  // Replace 'Spot Award' with the actual value that should disable the button
  return awardCategory !== 'Spot Award';
}



}