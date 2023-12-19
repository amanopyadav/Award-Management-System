import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgModel } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { ToastrModule } from 'ngx-toastr';

import { AdminLayoutRoutes } from './admin-layout.routing';

import { DashboardComponent } from '../../pages/manager-dashboard/dashboard.component';
import { UserComponent } from '../../pages/user/user.component';
import { TableComponent } from '../../pages/table/table.component';
import { TypographyComponent } from '../../pages/typography/typography.component';

import { MapsComponent } from '../../pages/maps/maps.component';
import { NotificationsComponent } from '../../pages/notifications/notifications.component';
import { UpgradeComponent } from '../../pages/upgrade/upgrade.component';
import { AddAssetComponent } from '../../pages/addasset/addasset.component';
import { LoginComponent } from '../../pages/login/login.component';
import { HrDashboardComponent } from '../../pages/hr-dashboard/hr-dashboard.component';



import { UserService } from '../../pages/login/login.service';
import { MAT_DIALOG_DEFAULT_OPTIONS } from '@angular/material/dialog';
import { FormComponent } from 'app/pages/form/form.component';
import { DateService } from 'app/pages/form/date.service';
import { BrowserModule } from '@angular/platform-browser';
// import { RatingsTableComponent } from 'app/pages/ratings-table/ratings-table.component';

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    ToastrModule.forRoot(),
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(AdminLayoutRoutes),
    NgbModule,
    MatDialogModule
  ],
  declarations: [
    DashboardComponent,
    UserComponent,
    TableComponent,
    UpgradeComponent,
    TypographyComponent,
    MapsComponent,
    NotificationsComponent,
    AddAssetComponent,
    LoginComponent,
    HrDashboardComponent,
    FormComponent
  ],
  providers: [UserService,DateService, { provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue: { hasBackdrop: true } },],
})
export class AdminLayoutModule { }
