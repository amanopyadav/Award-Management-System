import { Component, OnInit } from '@angular/core';

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
  public employeeTableData: EmployeeTableData;
  public filteredEmployeeData: EmployeeTableRow[];
  public searchTerm: string = '';

  ngOnInit() {
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
        {
          empCode: '3643',
          name: 'Nelson Amaran',
          awardNominations: 'Rising Star',
          previousAwards: '0',
          doj: '01/09/2023',
          unit: 'Projects & Managed Services',
          skill: 'Java',
          designation: 'Associate Consultant',
          mindCraftExp: '4 months',
          totalExp: '4 months',
          clientProject: 'In-house project',
          nominatedBy: 'Amisha',
          contactNumber: '9082121716',
          email: 'nelson@gmail.com',
          dob: '14/08/2000'
        },
        
        {
          empCode: '3646',
          name: 'Neha Sankhe',
          awardNominations: 'Quarterly Performance Award',
          previousAwards: 'Promising Newcomer, Rising Star',
          doj: '12/08/2023',
          unit: 'Projects & Managed Services',
          skill: 'Angular & SpringBoot',
          designation: 'Associate Consultant',
          mindCraftExp: '4 months',
          totalExp: '4 months',
          clientProject: 'Client Project',
          nominatedBy: 'Deepti',
          contactNumber: '93241445632',
          email: 'neha@gmail.com',
          dob: '17/09/2000'
        },
        // Add more employee data as needed
      ]
    };
    this.filteredEmployeeData = [...this.employeeTableData.dataRows];
  }

  applyFilter() {
    this.filteredEmployeeData = this.employeeTableData.dataRows.filter(row =>
      Object.values(row).some(value =>
        value.toString().toLowerCase().includes(this.searchTerm.toLowerCase())
      )
    );
  }
}
