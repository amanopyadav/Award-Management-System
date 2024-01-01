  import { Component, Inject, OnInit, ChangeDetectorRef, ChangeDetectionStrategy } from '@angular/core';
  import { FormBuilder, FormGroup, Validators } from '@angular/forms';
  import { DateService } from './date.service';
  import { FormService } from './form.service';
  import { NotificationService } from './notification.service'; 
  import { Route, Router } from '@angular/router';
  // import { forkJoin } from 'rxjs';

  @Component({
    selector: 'app-user',
    templateUrl: 'form.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
  })
  export class FormComponent implements OnInit {

      private fetchedAwardId: number;

      nominationForm: FormGroup;
      parameterForm: FormGroup;
      EmpForm: FormGroup;
      ProjectForm: FormGroup;
      NominatedByForm: FormGroup;
      OnBehalfOfForm: FormGroup;
      mainForm: FormGroup;

      filteredEmployees: any[] = [];
      filteredProjects: any[]=[];
      

      FetchAllProjectsForTeam: any[] = [];
      TeamMembersOfProjects: any[] = [];

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

      FetchAllProjectsData = {
        project_code : {},
        project_desc : {},
      }

    

    constructor(
      // private toastr: ToastrService,
      private fb: FormBuilder,
      @Inject(DateService) private dateService: DateService,
      private cdRef: ChangeDetectorRef, // Inject ChangeDetectorRef
      private formService: FormService,
      private notificationService: NotificationService,
      private router: Router
    ) {
      this.nominationForm = this.fb.group({
        award_category: ['choose sample', Validators.required],
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
        empDesignation: [''],  // FormControl for designation

        // Description
        exceedingexpectations: [''],
        processoriented: [''],
        timemanagement: [''],
        workefficiency: [''],
        punctuality: [''],
        quicklearner: [''],
        proactiveness: [''],
        customersatisfaction: [''],
        ownership: [''],
        teamplayer: [''],
        contributiontomindcraftbusiness: [''],
        peopleleadership: [''],
        customerrelationshipandsatisfaction: [''],
        excellenceinthecorefunction: [''],
        resultorachievementorientations: [''],
        ordergeneration: [''],
        customerconnect: [''],
        operationalefficiency: [''],
        collectionefficiency: [''],
        qualityandinnovation: [''],
        ownershipandcommitment: [''],
        peopleorientation: [''],


        // Rating
        exceedingexpectationsrating: [''],
        processorientedrating: [''],
        timemanagementrating: [''],
        workefficiencyrating: [''],
        punctualityrating: [''],
        quicklearnerrating: [''],
        proactivenessrating: [''],
        customersatisfactionrating: [''],
        ownershiprating: [''],
        teamplayerrating: [''],
        contributiontomindcraftbusinessrating: [''],
        peopleleadershiprating: [''],
        customerrelationshipandsatisfactionrating: [''],
        excellenceinthecorefunctionrating: [''],
        resultorachievementorientationsrating: [''],
        ordergenerationrating: [''],
        customerconnectrating: [''],
        operationalefficiencyrating: [''],
        collectionefficiencyrating: [''],
        qualityandinnovationrating: [''],
        ownershipandcommitmentrating: [''],
        peopleorientationrating: [''],

      });
      
      this.parameterForm = this.fb.group({
        exceedingexpectations: [''],
      })

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

            parameterForm : this.fb.group({
              exceedingexpectations: [''],
            })
        
      });
  
    
    }

    handleCheckboxClick() {
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
      this.fetchAllProjectsForTeam();
      // this.fetchTeamMembersForProjects(this.ProjectForm['project_code'].value)
    
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

       this.formService.addNominee(formData).subscribe(
        (response) => {
          // window.alert("Done")
          console.log('Nominee data submitted successfully:', response);
          

          
      if(awardCategory != '' && awardSubCategory != '' && awardSubCategory2 != ''){

        this.formService.getNominationIdAndLatestAwardId3(awardCategory, awardSubCategory, awardSubCategory2).subscribe(
          (data) => {
            console.log("Nomination and award id fetched");
            
            const { nominationId, latestAwardId } = data;
            console.log("Nomination id: "+nominationId);
            console.log("Award id: "+latestAwardId)
            

            // // let paramFormDataArray = []
            let paramFormDataArray = [];

            if (awardCategory == "Half Yearly Award" && awardSubCategory == "Lead Award" && awardSubCategory2 == "sales") {
                const paramFormData = {
                    ordergeneration : this.OnBehalfOfForm.get('ordergeneration').value,
                    ordergenerationrating : this.OnBehalfOfForm.get('ordergenerationrating').value,
                    customerconnect : this.OnBehalfOfForm.get('customerconnect').value,
                    customerconnectrating : this.OnBehalfOfForm.get('customerconnectrating').value,
                    operationalefficiency : this.OnBehalfOfForm.get('operationalefficiency').value,
                    operationalefficiencyrating : this.OnBehalfOfForm.get('operationalefficiencyrating').value,
                    collectionefficiency : this.OnBehalfOfForm.get('collectionefficiency').value,
                    collectionefficiencyrating : this.OnBehalfOfForm.get('collectionefficiencyrating').value
                };
                paramFormDataArray.push(paramFormData);
            }
            
            else if(awardCategory == "Half Yearly Award" && awardSubCategory == "Lead Award"){
              const paramFormData = {
                contributiontomindcraftbusiness : this.OnBehalfOfForm.get('contributiontomindcraftbusiness').value,
                contributiontomindcraftbusinessrating : this.OnBehalfOfForm.get('contributiontomindcraftbusinessrating').value,
                peopleleadership : this.OnBehalfOfForm.get('peopleleadership').value,
                peopleleadershiprating : this.OnBehalfOfForm.get('peopleleadershiprating').value,
                customerrelationshipandsatisfaction : this.OnBehalfOfForm.get('customerrelationshipandsatisfaction').value,
                customerrelationshipandsatisfactionrating : this.OnBehalfOfForm.get('customerrelationshipandsatisfactionrating').value,
                excellenceinthecorefunction : this.OnBehalfOfForm.get('excellenceinthecorefunction').value,
                excellenceinthecorefunctionrating : this.OnBehalfOfForm.get('excellenceinthecorefunctionrating').value,
                resultorachievementorientations : this.OnBehalfOfForm.get('resultorachievementorientations').value,
                resultorachievementorientationsrating : this.OnBehalfOfForm.get('resultorachievementorientationsrating').value
              };
              paramFormDataArray.push(paramFormData);
            }

            else if(awardCategory == "Half Yearly Award" && awardSubCategory == "Individual Award"){
              const paramFormData = {
                exceedingexpectations : this.OnBehalfOfForm.get('exceedingexpectations').value,
                exceedingexpectationsrating : this.OnBehalfOfForm.get('exceedingexpectationsrating').value,
                qualityandinnovation : this.OnBehalfOfForm.get('qualityandinnovation').value,
                qualityandinnovationrating : this.OnBehalfOfForm.get('qualityandinnovationrating').value,
                ownershipandcommitment : this.OnBehalfOfForm.get('ownershipandcommitment').value,
                ownershipandcommitmentrating : this.OnBehalfOfForm.get('ownershipandcommitmentrating').value,
                peopleorientation : this.OnBehalfOfForm.get('peopleorientation').value,
                peopleorientationrating : this.OnBehalfOfForm.get('peopleorientationrating').value,
              };
              paramFormDataArray.push(paramFormData);
            }

            else if(awardCategory == "Promising newcomer"){
              const paramFormData = {
                exceedingexpectations : this.OnBehalfOfForm.get('exceedingexpectations').value,
                exceedingexpectationsrating : this.OnBehalfOfForm.get('exceedingexpectationsrating').value,
                processoriented : this.OnBehalfOfForm.get('processoriented').value,
                processorientedrating : this.OnBehalfOfForm.get('processorientedrating').value,
                timemanagement : this.OnBehalfOfForm.get('timemanagement').value,
                timemanagementrating : this.OnBehalfOfForm.get('timemanagementrating').value,
                workefficiency : this.OnBehalfOfForm.get('workefficiency').value,
                workefficiencyrating : this.OnBehalfOfForm.get('workefficiencyrating').value,
                punctuality : this.OnBehalfOfForm.get('punctuality').value,
                punctualityrating : this.OnBehalfOfForm.get('punctualityrating').value,
                quicklearner : this.OnBehalfOfForm.get('quicklearner').value,
                quicklearnerrating : this.OnBehalfOfForm.get('quicklearnerrating').value,
                proactiveness : this.OnBehalfOfForm.get('proactiveness').value,
                proactivenessrating : this.OnBehalfOfForm.get('proactivenessrating').value
               
              };
              paramFormDataArray.push(paramFormData);
            }


            else if(awardCategory == "Quarterly Award"){
              const paramFormData = {
                exceedingexpectations : this.OnBehalfOfForm.get('exceedingexpectations').value,
                exceedingexpectationsrating : this.OnBehalfOfForm.get('exceedingexpectationsrating').value,
                processoriented : this.OnBehalfOfForm.get('processoriented').value,
                processorientedrating : this.OnBehalfOfForm.get('processorientedrating').value,
                timemanagement : this.OnBehalfOfForm.get('timemanagement').value,
                timemanagementrating : this.OnBehalfOfForm.get('timemanagementrating').value,
                workefficiency : this.OnBehalfOfForm.get('workefficiency').value,
                workefficiencyrating : this.OnBehalfOfForm.get('workefficiencyrating').value,
                punctuality : this.OnBehalfOfForm.get('punctuality').value,
                punctualityrating : this.OnBehalfOfForm.get('punctualityrating').value,
                customersatisfaction : this.OnBehalfOfForm.get('customersatisfaction').value,
                customersatisfactionrating : this.OnBehalfOfForm.get('customersatisfactionrating').value,
                ownership : this.OnBehalfOfForm.get('ownership').value,
                ownershiprating : this.OnBehalfOfForm.get('ownershiprating').value,
                teamplayer : this.OnBehalfOfForm.get('teamplayer').value,
                teamplayerrating : this.OnBehalfOfForm.get('teamplayerrating').value
              };
              paramFormDataArray.push(paramFormData);
            }


            else if(awardCategory == "Rising Star Award"){
              const paramFormData = {
                exceedingexpectations : this.OnBehalfOfForm.get('exceedingexpectations').value,
                exceedingexpectationsrating : this.OnBehalfOfForm.get('exceedingexpectationsrating').value,
                processoriented : this.OnBehalfOfForm.get('processoriented').value,
                processorientedrating : this.OnBehalfOfForm.get('processorientedrating').value,
                timemanagement : this.OnBehalfOfForm.get('timemanagement').value,
                timemanagementrating : this.OnBehalfOfForm.get('timemanagementrating').value,
                workefficiency : this.OnBehalfOfForm.get('workefficiency').value,
                workefficiencyrating : this.OnBehalfOfForm.get('workefficiencyrating').value,
                punctuality : this.OnBehalfOfForm.get('punctuality').value,
                punctualityrating : this.OnBehalfOfForm.get('punctualityrating').value,
                quicklearner : this.OnBehalfOfForm.get('quicklearner').value,
                quicklearnerrating : this.OnBehalfOfForm.get('quicklearnerrating').value,
                proactiveness : this.OnBehalfOfForm.get('proactiveness').value,
                proactivenessrating : this.OnBehalfOfForm.get('proactivenessrating').value
              };
              paramFormDataArray.push(paramFormData);
            }

      

            this.formService.addNomieeParam(nominationId, latestAwardId, paramFormDataArray).subscribe(
              (response: any) => {
                  console.log('Nominee parameter data submitted successfully:', response);
          
                  // Check the status field in the response
                  if (response && response.status === 'success') {
                      // window.alert('Nominee parameter added');  
                      this.onSave()

                  } else {
                      window.alert('Failed to add nominee parameter');  
                  }
              },
              (error) => {
                  window.alert('Failed');
                  console.error('Error submitting nominee parameter data:', error);
                  // Additional error handling if needed
              }
          );
          

          },
          (error) => {
            console.error('Error fetching nominationId and latestAwardId:', error);
          }
        );

      
      }
      else if(awardCategory != '' && awardSubCategory != '' ){

        this.formService.getNominationIdAndLatestAwardId2(awardCategory, awardSubCategory).subscribe(
          (data) => {
            console.log("Nomination and award id fetched");
            
            const { nominationId, latestAwardId } = data;
            console.log("Nomination id: "+nominationId);
            console.log("Award id: "+latestAwardId)
            

            // // let paramFormDataArray = []
            let paramFormDataArray = [];

            if (awardCategory == "Half Yearly Award" && awardSubCategory == "Lead Award" && awardSubCategory2 == "sales") {
                const paramFormData = {
                     ordergeneration : this.OnBehalfOfForm.get('ordergeneration').value,
                    ordergenerationrating : this.OnBehalfOfForm.get('ordergenerationrating').value,
                    customerconnect : this.OnBehalfOfForm.get('customerconnect').value,
                    customerconnectrating : this.OnBehalfOfForm.get('customerconnectrating').value,
                    operationalefficiency : this.OnBehalfOfForm.get('operationalefficiency').value,
                    operationalefficiencyrating : this.OnBehalfOfForm.get('operationalefficiencyrating').value,
                    collectionefficiency : this.OnBehalfOfForm.get('collectionefficiency').value,
                    collectionefficiencyrating : this.OnBehalfOfForm.get('collectionefficiencyrating').value
                };
                paramFormDataArray.push(paramFormData);
            }
            
            else if(awardCategory == "Half Yearly Award" && awardSubCategory == "Lead Award"){
              const paramFormData = {
                contributiontomindcraftbusiness : this.OnBehalfOfForm.get('contributiontomindcraftbusiness').value,
                contributiontomindcraftbusinessrating : this.OnBehalfOfForm.get('contributiontomindcraftbusinessrating').value,
                peopleleadership : this.OnBehalfOfForm.get('peopleleadership').value,
                peopleleadershiprating : this.OnBehalfOfForm.get('peopleleadershiprating').value,
                customerrelationshipandsatisfaction : this.OnBehalfOfForm.get('customerrelationshipandsatisfaction').value,
                customerrelationshipandsatisfactionrating : this.OnBehalfOfForm.get('customerrelationshipandsatisfactionrating').value,
                excellenceinthecorefunction : this.OnBehalfOfForm.get('excellenceinthecorefunction').value,
                excellenceinthecorefunctionrating : this.OnBehalfOfForm.get('excellenceinthecorefunctionrating').value,
                resultorachievementorientations : this.OnBehalfOfForm.get('resultorachievementorientations').value,
                resultorachievementorientationsrating : this.OnBehalfOfForm.get('resultorachievementorientationsrating').value
              };
              paramFormDataArray.push(paramFormData);
            }

            else if(awardCategory == "Half Yearly Award" && awardSubCategory == "Individual Award"){
              const paramFormData = {
                exceedingexpectations : this.OnBehalfOfForm.get('exceedingexpectations').value,
                exceedingexpectationsrating : this.OnBehalfOfForm.get('exceedingexpectationsrating').value,
                qualityandinnovation : this.OnBehalfOfForm.get('qualityandinnovation').value,
                qualityandinnovationrating : this.OnBehalfOfForm.get('qualityandinnovationrating').value,
                ownershipandcommitment : this.OnBehalfOfForm.get('ownershipandcommitment').value,
                ownershipandcommitmentrating : this.OnBehalfOfForm.get('ownershipandcommitmentrating').value,
                peopleorientation : this.OnBehalfOfForm.get('peopleorientation').value,
                peopleorientationrating : this.OnBehalfOfForm.get('peopleorientationrating').value,
              };
              paramFormDataArray.push(paramFormData);
            }

            else if(awardCategory == "Promising newcomer"){
              const paramFormData = {
                exceedingexpectations : this.OnBehalfOfForm.get('exceedingexpectations').value,
                exceedingexpectationsrating : this.OnBehalfOfForm.get('exceedingexpectationsrating').value,
                processoriented : this.OnBehalfOfForm.get('processoriented').value,
                peopleorientationrating : this.OnBehalfOfForm.get('peopleorientationrating').value,
                timemanagement : this.OnBehalfOfForm.get('timemanagement').value,
                timemanagementrating : this.OnBehalfOfForm.get('timemanagementrating').value,
                workefficiency : this.OnBehalfOfForm.get('workefficiency').value,
                workefficiencyrating : this.OnBehalfOfForm.get('workefficiencyrating').value,
                punctuality : this.OnBehalfOfForm.get('punctuality').value,
                punctualityrating : this.OnBehalfOfForm.get('punctualityrating').value,
                quicklearner : this.OnBehalfOfForm.get('quicklearner').value,
                quicklearnerrating : this.OnBehalfOfForm.get('quicklearnerrating').value,
                proactiveness : this.OnBehalfOfForm.get('proactiveness').value,
                proactivenessrating : this.OnBehalfOfForm.get('proactivenessrating').value
               
              };
              paramFormDataArray.push(paramFormData);
            }


            else if(awardCategory == "Quarterly Award"){
              const paramFormData = {
                 exceedingexpectations : this.OnBehalfOfForm.get('exceedingexpectations').value,
                exceedingexpectationsrating : this.OnBehalfOfForm.get('exceedingexpectationsrating').value,
                processoriented : this.OnBehalfOfForm.get('processoriented').value,
                processorientedrating : this.OnBehalfOfForm.get('processorientedrating').value,
                timemanagement : this.OnBehalfOfForm.get('timemanagement').value,
                timemanagementrating : this.OnBehalfOfForm.get('timemanagementrating').value,
                workefficiency : this.OnBehalfOfForm.get('workefficiency').value,
                workefficiencyrating : this.OnBehalfOfForm.get('workefficiencyrating').value,
                punctuality : this.OnBehalfOfForm.get('punctuality').value,
                punctualityrating : this.OnBehalfOfForm.get('punctualityrating').value,
                customersatisfaction : this.OnBehalfOfForm.get('customersatisfaction').value,
                customersatisfactionrating : this.OnBehalfOfForm.get('customersatisfactionrating').value,
                ownership : this.OnBehalfOfForm.get('ownership').value,
                ownershiprating : this.OnBehalfOfForm.get('ownershiprating').value,
                teamplayer : this.OnBehalfOfForm.get('teamplayer').value,
                teamplayerrating : this.OnBehalfOfForm.get('teamplayerrating').value
              };
              paramFormDataArray.push(paramFormData);
            }


            else if(awardCategory == "Rising Star Award"){
              const paramFormData = {
                exceedingexpectations : this.OnBehalfOfForm.get('exceedingexpectations').value,
                exceedingexpectationsrating : this.OnBehalfOfForm.get('exceedingexpectationsrating').value,
                processoriented : this.OnBehalfOfForm.get('processoriented').value,
                peopleorientationrating : this.OnBehalfOfForm.get('peopleorientationrating').value,
                timemanagement : this.OnBehalfOfForm.get('timemanagement').value,
                timemanagementrating : this.OnBehalfOfForm.get('timemanagementrating').value,
                workefficiency : this.OnBehalfOfForm.get('workefficiency').value,
                workefficiencyrating : this.OnBehalfOfForm.get('workefficiencyrating').value,
                punctuality : this.OnBehalfOfForm.get('punctuality').value,
                punctualityrating : this.OnBehalfOfForm.get('punctualityrating').value,
                quicklearner : this.OnBehalfOfForm.get('quicklearner').value,
                quicklearnerrating : this.OnBehalfOfForm.get('quicklearnerrating').value,
                proactiveness : this.OnBehalfOfForm.get('proactiveness').value,
                proactivenessrating : this.OnBehalfOfForm.get('proactivenessrating').value
              };
              paramFormDataArray.push(paramFormData);
            }

      

            this.formService.addNomieeParam(nominationId, latestAwardId, paramFormDataArray).subscribe(
                (response) => {
                    // window.alert("Done");
                    this.onSave();
                    console.log('Nominee parameter data submitted successfully:', response);

                },
                (error) => {
                    window.alert("Failed");
                    console.error('Error submitting nominee parameter data:', error);
                }
            );

          },
          (error) => {
            console.error('Error fetching nominationId and latestAwardId:', error);
          }
        );

      }
      
      else if(awardCategory != '' ){

        this.formService.getNominationIdAndLatestAwardId1(awardCategory).subscribe(
          (data) => {
            console.log("Nomination and award id fetched");
            
            const { nominationId, latestAwardId } = data;
            console.log("Nomination id: "+nominationId);
            console.log("Award id: "+latestAwardId)
            

            // // let paramFormDataArray = []
            let paramFormDataArray = [];

            if (awardCategory == "Half Yearly Award" && awardSubCategory == "Lead Award" && awardSubCategory2 == "sales") {
                const paramFormData = {
                    ordergeneration : this.OnBehalfOfForm.get('ordergeneration').value,
                    ordergenerationrating : this.OnBehalfOfForm.get('ordergenerationrating').value,
                    customerconnect : this.OnBehalfOfForm.get('customerconnect').value,
                    customerconnectrating : this.OnBehalfOfForm.get('customerconnectrating').value,
                    operationalefficiency : this.OnBehalfOfForm.get('operationalefficiency').value,
                    operationalefficiencyrating : this.OnBehalfOfForm.get('operationalefficiencyrating').value,
                    collectionefficiency : this.OnBehalfOfForm.get('collectionefficiency').value,
                    collectionefficiencyrating : this.OnBehalfOfForm.get('collectionefficiencyrating').value
                };
                paramFormDataArray.push(paramFormData);
            }
            
            else if(awardCategory == "Half Yearly Award" && awardSubCategory == "Lead Award"){
              const paramFormData = {
                contributiontomindcraftbusiness : this.OnBehalfOfForm.get('contributiontomindcraftbusiness').value,
                contributiontomindcraftbusinessrating : this.OnBehalfOfForm.get('contributiontomindcraftbusinessrating').value,
                peopleleadership : this.OnBehalfOfForm.get('peopleleadership').value,
                peopleleadershiprating : this.OnBehalfOfForm.get('peopleleadershiprating').value,
                customerrelationshipandsatisfaction : this.OnBehalfOfForm.get('customerrelationshipandsatisfaction').value,
                customerrelationshipandsatisfactionrating : this.OnBehalfOfForm.get('customerrelationshipandsatisfactionrating').value,
                excellenceinthecorefunction : this.OnBehalfOfForm.get('excellenceinthecorefunction').value,
                excellenceinthecorefunctionrating : this.OnBehalfOfForm.get('excellenceinthecorefunctionrating').value,
                resultorachievementorientations : this.OnBehalfOfForm.get('resultorachievementorientations').value,
                resultorachievementorientationsrating : this.OnBehalfOfForm.get('resultorachievementorientationsrating').value
              };
              paramFormDataArray.push(paramFormData);
            }

            else if(awardCategory == "Half Yearly Award" && awardSubCategory == "Individual Award"){
              const paramFormData = {
                exceedingexpectations : this.OnBehalfOfForm.get('exceedingexpectations').value,
                exceedingexpectationsrating : this.OnBehalfOfForm.get('exceedingexpectationsrating').value,
                qualityandinnovation : this.OnBehalfOfForm.get('qualityandinnovation').value,
                qualityandinnovationrating : this.OnBehalfOfForm.get('qualityandinnovationrating').value,
                ownershipandcommitment : this.OnBehalfOfForm.get('ownershipandcommitment').value,
                ownershipandcommitmentrating : this.OnBehalfOfForm.get('ownershipandcommitmentrating').value,
                peopleorientation : this.OnBehalfOfForm.get('peopleorientation').value,
                peopleorientationrating : this.OnBehalfOfForm.get('peopleorientationrating').value,
              };
              paramFormDataArray.push(paramFormData);
            }

            else if(awardCategory == "Promising newcomer"){
              const paramFormData = {
                exceedingexpectations : this.OnBehalfOfForm.get('exceedingexpectations').value,
                exceedingexpectationsrating : this.OnBehalfOfForm.get('exceedingexpectationsrating').value,
                processoriented : this.OnBehalfOfForm.get('processoriented').value,
                peopleorientationrating : this.OnBehalfOfForm.get('peopleorientationrating').value,
                timemanagement : this.OnBehalfOfForm.get('timemanagement').value,
                timemanagementrating : this.OnBehalfOfForm.get('timemanagementrating').value,
                workefficiency : this.OnBehalfOfForm.get('workefficiency').value,
                workefficiencyrating : this.OnBehalfOfForm.get('workefficiencyrating').value,
                punctuality : this.OnBehalfOfForm.get('punctuality').value,
                punctualityrating : this.OnBehalfOfForm.get('punctualityrating').value,
                quicklearner : this.OnBehalfOfForm.get('quicklearner').value,
                quicklearnerrating : this.OnBehalfOfForm.get('quicklearnerrating').value,
                proactiveness : this.OnBehalfOfForm.get('proactiveness').value,
                proactivenessrating : this.OnBehalfOfForm.get('proactivenessrating').value
               
              };
              paramFormDataArray.push(paramFormData);
            }


            else if(awardCategory == "Quarterly Award"){
              const paramFormData = {
                exceedingexpectations : this.OnBehalfOfForm.get('exceedingexpectations').value,
                exceedingexpectationsrating : this.OnBehalfOfForm.get('exceedingexpectationsrating').value,
                processoriented : this.OnBehalfOfForm.get('processoriented').value,
                processorientedrating : this.OnBehalfOfForm.get('processorientedrating').value,
                timemanagement : this.OnBehalfOfForm.get('timemanagement').value,
                timemanagementrating : this.OnBehalfOfForm.get('timemanagementrating').value,
                workefficiency : this.OnBehalfOfForm.get('workefficiency').value,
                workefficiencyrating : this.OnBehalfOfForm.get('workefficiencyrating').value,
                punctuality : this.OnBehalfOfForm.get('punctuality').value,
                punctualityrating : this.OnBehalfOfForm.get('punctualityrating').value,
                customersatisfaction : this.OnBehalfOfForm.get('customersatisfaction').value,
                customersatisfactionrating : this.OnBehalfOfForm.get('customersatisfactionrating').value,
                ownership : this.OnBehalfOfForm.get('ownership').value,
                ownershiprating : this.OnBehalfOfForm.get('ownershiprating').value,
                teamplayer : this.OnBehalfOfForm.get('teamplayer').value,
                teamplayerrating : this.OnBehalfOfForm.get('teamplayerrating').value
              };
              paramFormDataArray.push(paramFormData);
            }


            else if(awardCategory == "Rising Star Award"){
              const paramFormData = {
                exceedingexpectations : this.OnBehalfOfForm.get('exceedingexpectations').value,
                exceedingexpectationsrating : this.OnBehalfOfForm.get('exceedingexpectationsrating').value,
                processoriented : this.OnBehalfOfForm.get('processoriented').value,
                peopleorientationrating : this.OnBehalfOfForm.get('peopleorientationrating').value,
                timemanagement : this.OnBehalfOfForm.get('timemanagement').value,
                timemanagementrating : this.OnBehalfOfForm.get('timemanagementrating').value,
                workefficiency : this.OnBehalfOfForm.get('workefficiency').value,
                workefficiencyrating : this.OnBehalfOfForm.get('workefficiencyrating').value,
                punctuality : this.OnBehalfOfForm.get('punctuality').value,
                punctualityrating : this.OnBehalfOfForm.get('punctualityrating').value,
                quicklearner : this.OnBehalfOfForm.get('quicklearner').value,
                quicklearnerrating : this.OnBehalfOfForm.get('quicklearnerrating').value,
                proactiveness : this.OnBehalfOfForm.get('proactiveness').value,
                proactivenessrating : this.OnBehalfOfForm.get('proactivenessrating').value
              };
              paramFormDataArray.push(paramFormData);
            }


            else if(awardCategory == "Team Award"){
              const paramFormData = {
                exceedingexpectations : this.OnBehalfOfForm.get('exceedingexpectations').value,
                exceedingexpectationsrating : this.OnBehalfOfForm.get('exceedingexpectationsrating').value,
                processoriented : this.OnBehalfOfForm.get('processoriented').value,
                peopleorientationrating : this.OnBehalfOfForm.get('peopleorientationrating').value,
                timemanagement : this.OnBehalfOfForm.get('timemanagement').value,
                timemanagementrating : this.OnBehalfOfForm.get('timemanagementrating').value,
                workefficiency : this.OnBehalfOfForm.get('workefficiency').value,
                workefficiencyrating : this.OnBehalfOfForm.get('workefficiencyrating').value,
                punctuality : this.OnBehalfOfForm.get('punctuality').value,
                punctualityrating : this.OnBehalfOfForm.get('punctualityrating').value,
                proactiveness : this.OnBehalfOfForm.get('proactiveness').value,
                proactivenessrating : this.OnBehalfOfForm.get('proactivenessrating').value
              };
              paramFormDataArray.push(paramFormData);
            }

      

            this.formService.addNomieeParam(nominationId, latestAwardId, paramFormDataArray).subscribe(
                (response) => {
                    // window.alert("Done");
                    this.onSave();
                    console.log('Nominee parameter data submitted successfully:', response);
                },
                (error) => {
                    window.alert("Failed");
                    console.error('Error submitting nominee parameter data:', error);
                }
            );

          },
          (error) => {
            console.error('Error fetching nominationId and latestAwardId:', error);
          }
        );

        }


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
        (awardCategory === 'Promising newcomer') ||
        (awardCategory === 'Quarterly Award') ||
        (awardCategory === 'Rising Star Award') ||
        (awardCategory === 'Spot Award') ||
        (awardCategory === 'Half Yearly Award') ||
        (awardCategory === 'Team Award')
        
      ) {
        this.setAwardForm = true;
      } else {
        this.setAwardForm = false;
      }

      return this.setAwardForm;
    }


    checkIfItsTeamWard(): boolean {
      const award_category = this.nominationForm.get('award_category').value;
      if(award_category == "Team Award"){
        return true;
      }else{
        return false;
      }
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

        // Fetch all projects for team awards
        openModalToFetchAllProjects(){
          this.fetchAllProjectsForTeam();
          this.displayProjModal = "block";
        }
        
      



    onCloseHandled() {
      this.displayEmpModal = 'none';
      this.searchData = '';
    }

        onCloseHandledforProj(){
          // this.fetchTeamMembersForProjects(this.ProjectForm['project_code'].value);
          console.log("close proj dialog box");
          // this.ngOnInit();
          this.displayProjModal = "none";
          // this.searchData = ''; 
        }

        onCloseHandledforProjTeam(){
          // this.fetchTeamMembersForProjects(projCode);
          // this.ngOnInit()
          console.log("close proj dialog box");
          // this.ngOnInit();
          this.displayProjModal = "none";
          this.ngOnInit()
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



        fetchAllProjectsForTeam() {
          this.formService.getAllProjectsDetails().subscribe(
            (data) => {
              console.log("All Projects Data : ", data);
              this.FetchAllProjectsForTeam = data; 
              console.log("Team data : ", this.FetchAllProjectsForTeam);
            },
            (error) => {
              console.error(error);
            }
          );
        }

        fetchTeamMembersForProjects(projCode: string){
          this.formService.fetchTeamMembersForProjects(projCode).subscribe(
            (data) => {
              console.log("All team members of projects: ",data);
              this.TeamMembersOfProjects = data;
              this.ngOnInit()
              console.log("Team members : ",this.TeamMembersOfProjects);

              this.onCloseHandledforProjTeam()
              
            },
            (error) => {
              console.error(error);
            }
          )
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

          this.onCloseHandledforProj();
        }


        addTeamProject(project: any){
          console.log("Adding team projects");

          const projectFormValues = {
            project_code: project.project_code,
            project_name: project.project_desc,
            client: project.client_name,
            industry: project.indstry_name,
          };

          this.ProjectForm.patchValue(projectFormValues)
          this.fetchTeamMembersForProjects(projectFormValues.project_code);
          this.onCloseHandledforProjTeam();
          // this.fetchTeamMembersForProjects(projectFormValues.project_code);
          
        }

    addNominatedBy(selectedEmpName: string) {
      const selectedEmployee = this.nominatedByOptions.find(emp => emp.emp_name === selectedEmpName);
    
      if (selectedEmployee) {
        const nominatedbyFormValues = {
          empName: selectedEmployee.emp_name,
          empDesignation: selectedEmployee.designation_name,
        };
        this.NominatedByForm.patchValue(nominatedbyFormValues);
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
      // this.nominationForm.reset();
      this.EmpForm.reset();
      this.ProjectForm.reset();
      this.NominatedByForm.reset();
      this.OnBehalfOfForm.reset();
      this.mainForm.reset();

      this.nominationForm.get('award_category').setValue('choose sample');
      this.ngOnInit();
      this.nominationForm.get('spot_award_subcategory').setValue('');
      this.nominationForm.get('half_yearly_award_subcategory').setValue('');
      this.nominationForm.get('half_yearly_award_isSales').setValue('');
    
      // Notify user
      this.notificationService.showNotification('Nomination form filled successfully.');
    
      // Log to console
      console.log('Form saved and reset successfully.');
    }
      

    cancel(){
      this.EmpForm.reset();
      this.ProjectForm.reset();
      this.NominatedByForm.reset();
      this.OnBehalfOfForm.reset();
      this.mainForm.reset();

      this.nominationForm.get('award_category').setValue('choose sample');
      this.ngOnInit();
      this.nominationForm.get('spot_award_subcategory').setValue('');
      this.nominationForm.get('half_yearly_award_subcategory').setValue('');
      this.nominationForm.get('half_yearly_award_isSales').setValue('');

      this.notificationService.clearNotification('Form reset.');
      console.log("Form reset successfully");
      
    }

    
    
  }



