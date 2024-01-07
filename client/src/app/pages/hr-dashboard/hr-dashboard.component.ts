import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { HrService } from './hr.service';
import { FormGroup } from '@angular/forms';
import { NgZone } from '@angular/core';
import { error } from 'protractor';
import * as XLSX from 'xlsx';

declare interface EmployeeTableData {
  headerRow: string[];
  dataRows: {
    isShortList: string;
    isSelect: string;
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
    isShortList: string;
    isSelect: string;
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

interface EmployeeDetailsForTeam{
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

interface EmployeeNominationForTeam{
  award_category: string;
  nominated_by: string;
  nom_by_designation: string;
  onbehalf_of: string;
  on_behalf_designation: string;
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
  originalEmployeeData: { awardCategory: string; awardSubCategory: string; awardSubCategory2: string; empCode: string; empName: string; emp_designation: string; dob: Date; project_code: number; client: string; doj: Date; unit: string; skill: string; total_exp_in_months: number; mindcraft_exp_in_months: number; nominatedBy: string; }[];
  selectedAwardCategory: string='';
  startDate: string | number | Date;
  endDate: string | number | Date;
// filterByAwardCategory() {
// throw new Error('Method not implemented.');
// }


  selectedSubcategory: string = ''; // Property to store the selected subcategory
  isCheckboxEnabled: boolean = false; // Property to control the checkbox state
  checkboxChecked: boolean = false; // Property to track the checkbox state

  toggleCheckbox() {
    // Enable the checkbox only when "Lead Award" is selected as the subcategory
    this.isCheckboxEnabled = this.selectedSubcategory === 'Lead Award';

    // Set the checkbox state to unchecked
    this.checkboxChecked = false;
  }


  EmpForm: FormGroup
  
  // EmpRand: EmpratingData;
  EmpRand = {
    empCode : {},
    empName : {}
  }

  Employees: EmployeeTableRow[];
  
  EmployeeRatings: any[]=[];
  TeamMembersOfProjects: any[] = [];

  // nom1: EmployeeDetailsNew1;
  selectedEmployee: EmployeeTableRow;  // Add this line
  employeeDetails: EmployeeDetails;
  employeeDetailsnew: EmployeeDetailsNew;
  employeeDetailsForteam : EmployeeDetailsForTeam;
  EmployeeNominationForteam : EmployeeNominationForTeam;
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
  displayTeamDetailsModal: boolean;
  dataLoaded: boolean = false;

  checkIfItsTeam: boolean = false;

  teamRand = {
    projName : {},
    teamCount : 0
  }


  // Checkbox logic
  shortlistedEmployees: { awardCategory: string; empCode: string; projCode: number }[] = [];
  isConfirmShortlistEnabled: boolean = false;



  toggleShortlist(employee: EmployeeTableRow) {
    const index = this.shortlistedEmployees.findIndex(emp => emp.empCode === employee.empCode);
  
    if (index === -1) {
      // Employee is not shortlisted, checking it
      this.shortlistedEmployees.push({ awardCategory: employee.awardCategory, empCode: employee.empCode, projCode: employee.project_code});
    } else {
      // Employee was previously shortlisted, unchecking it
      this.shortlistedEmployees.splice(index, 1);
    }
  
    this.isConfirmShortlistEnabled = this.shortlistedEmployees.length > 0;
  }





  confirmShortlist() {
    this.hrService.updateShortlistStatus(this.shortlistedEmployees).subscribe(response => {
      console.log("Successfully updated shortlist status");
    }, error => {
      console.error("Failed to update shortlist status");
    });
    
    console.log('Shortlisted Employees:', this.shortlistedEmployees);
  }



  constructor(private hrService: HrService, private ngZone: NgZone) {
    this.isCheckboxEnabled = false;
   }


  public employeeTableData: EmployeeTableData;
  public filteredEmployeeData: EmployeeTableRow[];
  public searchTerm: string = '';

  selectedTeamMember: boolean = false;


  @ViewChild('shortlistColumn') shortlistColumn: ElementRef;
  @ViewChild('selectColumn') selectColumn: ElementRef;
  @ViewChild('tableContainer') tableContainer: ElementRef;
  selectData: any;
  shortlistData: any;
  restData: any;

  ngOnInit() {
    this.searchTerm = '';
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
    this.originalEmployeeData = [...this.employeeTableData.dataRows];
    // this.filteredEmployeeData = this.originalEmployeeData.slice();
    
  }

  checkIfShortlist(employee: EmployeeTableRow): boolean {
    // Check if employee.isShortList is 'N', return true to disable the checkbox
    if(employee.isShortList === "N" && employee.isSelect === "N"){
      return false;
    }
    else if(employee.isShortList === "Y" && employee.isSelect === "N"){
      return true;
    }
    else if(employee.isShortList === "Y" && employee.isSelect === "Y"){
      return true;
    }
    else{
      return false;
    }
  }

  checkIfSelect(employee: EmployeeTableRow): boolean{
    if(employee.isShortList === "N" && employee.isSelect === "N"){
      return true;
    }
    else if(employee.isShortList === "Y" && employee.isSelect === "N"){
      return false;
    }
    else if(employee.isShortList === "Y" && employee.isSelect === "Y"){
      return true;
    }
    else{
      return false;
    }
  }


  downloadExcel() {
    // Convert the nominee list data to Excel format
    const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(this.employeeTableData.dataRows);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Nominee List');

    // Save the Excel file
    XLSX.writeFile(wb, 'nominee_list.xlsx');
  }


  stringifyTeamProjName(): string {
    const jsonString = JSON.stringify(this.teamRand.projName['projectName']);
    return jsonString.replace(/"/g, '');
  }

  stringifyTeamNominationDetails(empDetail: string){
    const jsonString = JSON.stringify(empDetail);
    return jsonString.replace(/"/g,'');
  }

  fetchSingleMemberOfProject(empCode: string){

    let projCode : string;
    console.log("Single member code: ",empCode);
    this.selectedTeamMember = empCode !== 'ChooseTeamMember';

    // fetch employee of team details
    this.hrService.getEmployeeDetails(empCode).subscribe(
      (details: EmployeeDetailsForTeam) => {
        console.log("Employee details fetched: ", details);

        this.employeeDetailsForteam = details;
        console.log("Emp data fetched: " + JSON.stringify(this.employeeDetailsForteam));
      },
      (err) => {
        console.error("Failed to fetch employee team details")
      });

    // fetch project code
    this.hrService.getProjectCode(empCode).subscribe(
      (data)=>{
        console.log("data: ",data);
        projCode = data;
        console.log("Project Code: ",projCode);

        this.hrService.getNominationDetailsOfTeamMember('Team Award',projCode).subscribe(
          (data: EmployeeNominationForTeam) => {
            this.EmployeeNominationForteam = data;
            console.log("Employee details fetched for team: ",this.EmployeeNominationForteam);
    
          },
          (err)=>{
            console.error("Failed to fetch member details for team")
          }
        )
        
      },
      (error)=>{
        console.error("Failed to fetch project code")
      }
    )

    

  }
  
  

  applyFilter() {
    // Existing filter logic
    this.filteredEmployeeData = this.employeeTableData.dataRows.filter(row =>
      Object.values(row).some(value => {
        if (value !== null && value !== undefined) {
          return value.toString().toLowerCase().includes(this.searchTerm.toLowerCase());
        }
        return false;
      })
    );
  
    // Additional filter for the selected award category
    this.filteredEmployeeData = this.filteredEmployeeData.filter(employee => {
      return !this.selectedAwardCategory || employee.awardCategory === this.selectedAwardCategory;
    });
  
    // Add the following lines to filter by start date and end date
    this.filteredEmployeeData = this.filteredEmployeeData.filter(employee => {
      const startDate = new Date(this.startDate).getTime();
      const endDate = new Date(this.endDate).getTime();
  
      const empDate = new Date(employee.doj).getTime(); // Assuming 'doj' is the property representing the employee's start date
  
      return (!this.startDate || empDate >= startDate) && (!this.endDate || empDate <= endDate);
    });
  }

  
  


  onSearchChange(value: string) {
    console.log('Search term changed:', value);
  }


  fetchNomineeList() {
    this.hrService.getNomineeList().subscribe(
      (data: any[]) => {
        this.ngZone.run(() => {
          console.log('Nominee List Data:', data);
          this.employeeTableData.dataRows = data.map(item => ({
            isShortList: item.is_shortlist,
            isSelect: item.is_selected,
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

  fetchTeamMembersForProjects(projCode: string){
    this.hrService.fetchTeamMembersForProjects(projCode).subscribe(
      (data) => {
        console.log("All team members of projects: ",data);
        this.TeamMembersOfProjects = data;
        this.ngOnInit();
        console.log("Team members : ",this.TeamMembersOfProjects);

        // this.onCloseHandledforProjTeam()
        
      },
      (error) => {
        console.error(error);
      }
    )
  }
  

  viewRatings(empCode: string,empName: string,awardCategory: string,awardSubCategory: string,awardSubCategory2: string,projectCode: number) {
    console.log("Rating dialogbox Opened");

    console.log("Empcode : ", empCode);
    console.log("EmpName : ", empName);
    console.log("AwardCategory : ", awardCategory);
    console.log("AwardSubCategory : ", awardSubCategory);
    console.log("AwardSubCategory2 : ", awardSubCategory2);
    console.log("PProject Code: ",projectCode);
    

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
                this.checkIfItsTeam = false;
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

      else if(awardCategory == 'Team Award'){
        this.hrService.fetchNominationIDTeam(projectCode,awardCategory).subscribe(
          (res)=>{
            console.log("Nomination Id: ",res);
            this.hrService.getRatingDetails(res).subscribe(
              (data) => {
                this.EmployeeRatings = data; 
                this.EmpRand.empCode = empCode
                this.EmpRand.empName = empName;
                this.checkIfItsTeam = true;

                this.hrService.getTeamProjectName(awardCategory, projectCode).subscribe(
                  (response: any) => {
                    // Access the 'body' property to get the actual data
                    this.teamRand.projName = response;
                    console.log("Team project name: ", this.teamRand.projName);
                  },
                  (error) => {
                    console.error("Failed to fetch team project name: ", error);
                  }
                );

                this.hrService.getTeamCount(projectCode).subscribe(
                  (data)=>{
                    this.teamRand.teamCount = data;
                    console.log("Team count: ",this.teamRand.teamCount);
                    
                  },
                  (error)=>{
                    console.error("failed to fetch team count")
                  }
                )

                // console.log("Team project name: ",this.teamRand.projName);
                // console.log("Team count: ",this.teamRand.teamCount);
                
                
                
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
                this.checkIfItsTeam = false;
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
                this.checkIfItsTeam = false;
                
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


  viewDetails(empCode: string,awardCategory: string,awardSubCategory: string,awardSubCategory2: string,project_code: string) {
    console.log("Empcode : ", empCode);
    console.log("AwardCategory : ", awardCategory);
    console.log("AwardSubCategory : ", awardSubCategory);
    console.log("AwardSubCategory2 : ", awardSubCategory2);
    console.log("Project Code : ", project_code);

    
    

  
    // Fetch detailed information for the selected employee
    if (this.dataLoaded) {

      if(awardCategory == 'Team Award'){

        this.hrService.getTeamProjectName(awardCategory, parseInt(project_code)).subscribe(
          (response: any) => {
            // Access the 'body' property to get the actual data
            this.teamRand.projName = response;
            console.log("Team project name: ", this.teamRand.projName);
          },
          (error) => {
            console.error("Failed to fetch team project name: ", error);
          }
        );

        this.hrService.getTeamCount(parseInt(project_code)).subscribe(
          (data)=>{
            this.teamRand.teamCount = data;
            console.log("Team count: ",this.teamRand.teamCount);
            
          },
          (error)=>{
            console.error("failed to fetch team count")
          }
        )

        this.checkIfItsTeam = true
        this.fetchTeamMembersForProjects(project_code);
        this.displayTeamDetailsModal = true;

        console.log("Team members of projects : ",this.TeamMembersOfProjects);
        
        
      }
      else{

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
  }

  onCloseDetailsModal() {
    console.log("Emp Details Modal Closed");
    this.displayRatingModal = false;
    this.displayDetailsModal = false;
    this.selectedEmployee = null;
  }

  onCloseTeamDetailsModal() {
    console.log("Emp Details Modal Closed");
    this.displayTeamDetailsModal = false;
    this.selectedTeamMember = false;
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