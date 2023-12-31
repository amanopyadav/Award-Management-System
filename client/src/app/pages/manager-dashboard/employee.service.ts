// <div class="row">
//   <div class="col-md-12">
//     <div class="card card-user">
//       <div class="card-header">
//         <h5 class="card-title">Nomination Form</h5>
//       </div>
//       <div class="card-body">
//         <form [formGroup]="nominationForm">
//           <div class="row">
//             <div class="col-md-4 pr-1">
//               <div class="form-group">
//                 <label>Award Category</label>
//                 <select class="form-control" id="award_category" name="award_category" formControlName="award_category"
//                   required>
//                   <option value="" selected>Choose Award Category</option>
//                   <option value="promising_newcomer">Promising Newcomer</option>
//                   <option value="quaterly_award">Quarterly Award</option>
//                   <option value="rising_star">Rising Star Award</option>
//                   <option value="spot_award">Spot Award</option>
//                   <option value="half_yearly_award">Half Yearly Award</option>
//                   <option value="team_award">Team Award</option>
//                 </select>
//               </div>
//             </div>
//           </div>

//           <!-- Spot Award Subcategory Dropdown -->
//           <div class="row">
//             <div class="col-md-4 pr-1" *ngIf="nominationForm.get('award_category').value === 'spot_award'">
//               <div class="form-group">
//                 <label>Spot Award Subcategory</label>
//                 <select class="form-control" id="spot_award_subcategory" name="spot_award_subcategory"
//                   formControlName="spot_award_subcategory" required>
//                   <option value="" selected>Choose Subcategory</option>
//                   <option value="in_recognition_of">InRecognition Of</option>
//                   <option value="going_extra_mile">Going Extra Mile</option>
//                 </select>
//               </div>
//             </div>
//           </div>

//           <!-- Half Yearly Award Subcategory Dropdown -->
//           <div class="row">
//             <div class="col-md-4 pr-1" *ngIf="nominationForm.get('award_category').value === 'half_yearly_award'">
//               <div class="form-group">
//                 <label>Half Yearly Award Subcategory</label>
//                 <select class="form-control" id="half_yearly_award_subcategory" name="half_yearly_award_subcategory"
//                   formControlName="half_yearly_award_subcategory" required>
//                   <option value="" selected>Choose Subcategory</option>
//                   <option value="lead_award">Lead Award</option>
//                   <option value="individual_award">Individual Award</option>
//                 </select>
//               </div>
//             </div>
//           </div>

//           <div class="card-body">
//             <!-- <form> -->

//               <h5 class="card-title">Nominee Details</h5>
//               <div class="row">
//                 <div class="col-md-3 px-1">
//                   <div class="form-group">
//                     <label>Employee/Nominee Name</label>
//                     <div class="input-group">
//                       <!-- Your specified icon inside the input group -->
//                       <div class="input-group-prepend">
//                         <span class="input-group-text cursor-pointer">
//                           <i (click)="openModal()" class="nc-icon nc-bullet-list-67"></i>
//                         </span>
//                       </div>
//                       <div class="modal" tabindex="-1" role="dialog" [ngStyle]="{'display':display}">
//                         <div class="modal-dialog modal-xl" role="document">
//                           <div class="modal-content">
//                             <div class="modal-header">
                              
//                               <div class="modal-header">
//                                 <input type="text" class="form-control" placeholder="Search..." [(ngModel)]="searchData" />
//                                 <button (click)="search()">Search</button>
//                               </div>
                              

//                               <button type="button" class="close" aria-label="Close" (click)="onCloseHandled()">
//                                 <i class="fa-sharp fa-regular fa-circle-xmark  fa-2xs"></i>
//                               </button>
//                             </div>

//                             <div class="modal-body">
//                               <div class="row">
//                                 <div class="col-md-12">
//                                   <div class="card">
//                                     <div class="card-header">
//                                       <h4 class="card-title"> Employee Details</h4>
//                                     </div>
//                                     <div class="card-body">
//                                       <div class="table-responsive" style="max-height: 300px; overflow-y: auto;">
//                                         <table class="table">
//                                           <thead class="text-primary">
//                                             <th>Emp ID</th>
//                                             <th>Emp Name</th>
//                                             <th>Actions</th>
//                                           </thead>
//                                           <tbody>
//                                             <tr *ngFor="let employee of filteredEmployees"> 
//                                               <td>{{employee.emp_id}}</td>
//                                               <td>{{employee.emp_name}}</td>
//                                               <td>
//                                                 <button class="btn btn-primary" (click)="addEmployee(employee)">
//                                                   Add
//                                                 </button>
//                                               </td>
//                                             </tr>

//                                           </tbody>
//                                         </table>
//                                       </div>
//                                     </div>
//                                   </div>
//                                 </div>
//                               </div>


//                             </div>
//                             <div class="modal-footer">
//                               <button type="button" class="btn btn-danger" (click)="onCloseHandled()">Close</button>
//                             </div>
//                           </div>
//                         </div>
//                       </div>
//                       <input type="text" class="form-control" placeholder="" [value]="nominationForm.get('empName').value">
//                     </div>
//                   </div>
//                 </div>

//                 <div class="col-md-3 px-1">
//                   <div class="form-group">
//                     <label>Employee Code</label>
//                     <input type="text" class="form-control" placeholder="" [value]="nominationForm.get('emp_id').value">
//                   </div>
//                 </div>
//                 <div class="col-md-3 px-1">
//                   <div class="form-group">
//                     <label>Employee Designation</label>
//                     <input type="text" class="form-control" placeholder="" [value]="nominationForm.get('empDesignation').value">
//                   </div>
//                 </div>
//                 <div class="col-md-3 px-1">
//                   <div class="form-group">
//                     <label>Unit</label>
//                     <input type="text" class="form-control" placeholder="" [value]="nominationForm.get('function_name').value">
//                   </div>
//                 </div>
//                 <div class="col-md-3 px-1">
//                   <div class="form-group">
//                     <label for="primarySkillName">Skill</label>
//                     <input type="text" class="form-control" placeholder="" [value]="nominationForm.get('primarySkillName').value">
//                   </div>
//                 </div>
//                 <div class="col-md-3 px-1">
//                   <div class="form-group">
//                     <label for="mindcraftExpMon">MindCraft Experience in months</label>
//                     <input type="text" class="form-control" placeholder="" [value]="nominationForm.get('mindcraftExpMon').value">
//                   </div>
//                 </div>
//                 <div class="col-md-3 px-1">
//                   <div class="form-group">
//                     <label for="totalExpMon">Total Experience in months</label>
//                     <input type="text" class="form-control" placeholder="" [value]="nominationForm.get('totalExpMon').value">
//                   </div>
//                 </div>
//                 <div class="col-md-3 pl-1">
//                   <div class="form-group">
//                     <label for="email">Email address</label>
//                     <input type="email" class="form-control" placeholder="" [value]="nominationForm.get('email').value">
//                   </div>
//                 </div>
//                 <div class="col-md-3 pl-1">
//                   <div class="form-group">
//                     <label for="mobileNo">Contact Number</label>
//                     <input type="tel" class="form-control" placeholder="" [value]="nominationForm.get('mobileNo').value">
//                   </div>
//                 </div>
//                 <div class="col-md-4 pl-1">
//                   <div class="form-group">
//                     <label for="dob">DOB</label>
//                     <input type="date" class="form-control" placeholder="" [value]="nominationForm.get('dob').value">
//                   </div>
//                 </div>
//                 <div class="col-md-4 pl-1">
//                   <div class="form-group">
//                     <label for="joiningDate">DOJ</label>
//                     <input type="date" class="form-control" placeholder="" [value]="nominationForm.get('joiningDate').value">
//                   </div>
//                 </div>
//               </div>
//             </form>


//             <form [formGroup]="projectForm">
//               <h5 class="card-title">Nominee Project Details</h5>
//               <div class="row">
//                 <div class="col-md-3 px-1">
//                   <div class="form-group">
//                     <label>Project Name</label>
                    
//                     <div class="input-group">
                       
//                       <div class="input-group-prepend">
//                         <span class="input-group-text cursor-pointer">
//                           <i (click)="openModalforproj()" class="nc-icon nc-bullet-list-67"></i>
//                         </span>
//                       </div>
//                       <div class="modal" tabindex="-1" role="dialog" [ngStyle]="{'display':display}">
//                         <div class="modal-dialog modal-xl" role="document">
//                           <div class="modal-content">
//                             <div class="modal-header">
                              
//                               <div class="modal-header">
//                                 <input type="text" class="form-control" placeholder="Search..." [(ngModel)]="searchData" />
//                                 <button (click)="searchproj()">Search</button>
//                               </div>
                              

//                               <button type="button" class="close" aria-label="Close" (click)="onCloseHandledforProj()">
//                                 <i class="fa-sharp fa-regular fa-circle-xmark  fa-2xs"></i>
//                               </button>
//                             </div>

//                             <div class="modal-body">
//                               <div class="row">
//                                 <div class="col-md-12">
//                                   <div class="card">
//                                     <div class="card-header">
//                                       <h4 class="card-title"> Employee Project Details</h4>
//                                     </div>
//                                     <div class="card-body">
//                                       <div class="table-responsive" style="max-height: 300px; overflow-y: auto;">
//                                         <table class="table">
//                                           <thead class="text-primary">
//                                             <th>Project Id</th>
//                                             <th>Project Name</th>
//                                             <th>Client</th>
//                                             <th>Industry Name</th>
//                                             <th>Actions</th>
//                                           </thead>
//                                           <tbody>
//                                             <tr *ngFor="let project of filteredProjects"> 
//                                               <td>{{project.project_id}}</td>
//                                               <td>{{project.project_name}}</td>
//                                               <td>{{project.client}}</td>
//                                               <td>{{project.industry_name}}</td>
//                                               <td>
//                                                 <button class="btn btn-primary" (click)="addProject(project)">
//                                                   Add
//                                                 </button>
//                                               </td>
//                                             </tr>

//                                           </tbody>
//                                         </table>
//                                       </div>
//                                     </div>
//                                   </div>
//                                 </div>
//                               </div>


//                             </div>
//                             <div class="modal-footer">
//                               <button type="button" class="btn btn-danger" (click)="onCloseHandledforProj()">Close</button>
//                             </div>
//                           </div>
//                         </div>
//                       </div>

//                       <input type="text" class="form-control" placeholder="" [value]="projectForm.get('project_name')?.value">
//                     </div>
//                   </div>
//                 </div>
                    
//                    </div>
//                     <input type="text" class="form-control" placeholder="" [value]="projectForm.get('project_name')?.value">
//                   </div>
//                 </div>
              
//                 <div class="col-md-3 pl-1">
//                   <div class="form-group">
//                     <label>Project Code</label>

                    
//                     <input type="text" class="form-control" placeholder="" [value]="projectForm.get('project_id')?.value">
//                   </div>
//                 </div>
              
//                 <div class="col-md-3 pl-1">
//                   <div class="form-group">
//                     <label>Client</label>
//                     <input type="text" class="form-control" placeholder="" [value]="projectForm.get('client')?.value">
//                   </div>
//                 </div>
              
//                 <div class="col-md-3 pl-1">
//                   <div class="form-group">
//                     <label>Project Description</label>
//                     <input type="text" class="form-control" placeholder="" [value]="projectForm.get('industry_name')?.value">
//                   </div>
//                 </div>
//               </div>
//             </form>
              
            
               

                  
                
                
              
//               <div class="row">
//                 <div class="col-md-6 px-1">
//                   <div class="form-group">
//                     <label>Nominated By</label>
//                     <input type="text" class="form-control" placeholder="" value="">
//                   </div>
//                 </div>
//                 <div class="col-md-6 pl-1">
//                   <div class="form-group">
//                     <label>Designation</label>
//                     <input type="text" class="form-control" placeholder="" value="">
//                   </div>
//                 </div>
//               </div>
//               <div class="row">
//                 <div class="col-md-6 px-1">
//                   <div class="form-group">
//                     <label>On Behalf of</label>
//                     <input type="text" class="form-control" placeholder="" value="">
//                   </div>
//                 </div>
//                 <div class="col-md-6 pl-1">
//                   <div class="form-group">
//                     <label>Designation</label>
//                     <input type="text" class="form-control" placeholder="" value="">
//                   </div>
//                 </div>
//               </div>

//               <div class="row">
//                 <div class="col-md-5 px-1">
//                   <div class="form-group">
//                     <label>Nomination Date</label>
//                     <input type="date" class="form-control" placeholder="" value="">
//                   </div>
//                 </div>
//               </div>

//               <div class="row">
//                 <div class="col-md-12 px-1">
//                   <div class="form-group">
//                     <label>Reason for nomination</label>
//                     <textarea class="form-control textarea">Enter reason for nomination here</textarea>
//                   </div>
//                 </div>
//               </div>

//               <div class="row" *ngIf="nominationForm.get('award_category').value === 'team_award'">
//                 <div class="col-md-12 pr-1">
//                   <div class="form-group">
//                     <button class="btn btn-primary" (click)="addEmp()">Add</button>
//                   </div>
//                 </div>
//               </div>
 

//               <div class="row" *ngIf="addedEmployees.length > 0 && nominationForm.get('award_category').value === 'team_award'">
//                 <div class="col-md-12 pr-1">
//                   <div class="form-group">
//                     <h5>Added Employees</h5>
//                     <table class="table">
//                       <thead class="text-primary">
//                         <th>Emp Code</th>
//                         <th>Emp Name</th>
//                         <th>Actions</th>
//                       </thead>
//                       <tbody>
//                                   <!-- Modify the table row to include the removal button -->
//                       <tr *ngFor="let employee of addedEmployees">
//                         <td>{{ employee.empCode }}</td>
//                         <td>{{ employee.empName }}</td>
//                         <td>
//                           <button class="btn btn-danger" (click)="removeEmployee(employee)">Remove</button>
//                         </td>
//                       </tr>

//                       </tbody>
//                     </table>
//                   </div>
//                 </div>
//               </div>

//               <div class="row justify-content-end align-items-end">
//                 <div class="row">
//                   <div class="col-md-6">
//                     <button type="reset" class="btn btn-primary">Cancel</button>
//                   </div>
//                   <div class="col-md-6">
//                     <button type="submit" class="btn btn-primary ml-2">Save</button>
//                   </div>
//                 </div>
//                 </div>
            
//           </div>
                
              


            
          
