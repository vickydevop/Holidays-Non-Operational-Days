import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ManageHolidaysAndNonOperationalDasAppRoutingModule } from './manage-holidays-and-non-operational-days-app-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { ManageHolidaysAndNonOperationalDaysAppComponent } from './manage-holidays-and-non-operational-days-app/manage-holidays-and-non-operational-days-app.component';
import { AddEditHolidaysComponent } from './add-edit-holidays/add-edit-holidays.component';
import { AddEditNonOperationalDaysComponent } from './add-edit-non-operational-days/add-edit-non-operational-days.component';
import { AddEditCustomizeHolidaysComponent } from './add-edit-customize-holidays/add-edit-customize-holidays.component';
// import { AddEditCustomizeNonOperationalDaysComponent } from './add-edit-non-operational-days/add-edit-customize-non-operational-days/add-edit-customize-non-operational-days.component';
import { AddEditCommonHolidayComponent } from './dialog/add-edit-common-holiday/add-edit-common-holiday.component';
import { AddEditCustomHolidayComponent } from './dialog/add-edit-custom-holiday/add-edit-custom-holiday.component';
import { AddEditCustomNonOperationalDaysComponent } from './dialog/add-edit-custom-non-operational-days/add-edit-custom-non-operational-days.component';
import { AuditTrailTableComponent } from './dialog/audit-trail-table/audit-trail-table.component';
import { LoginDialogComponent } from 'src/app/shared/dialogs/login-dialog/login-dialog.component';
import { CustomizeNonOperationalDaysComponent } from './customize-non-operational-days/customize-non-operational-days.component';
import { AddEditNonOperationalDaysPopupComponent } from './dialog/add-edit-non-operational-days-popup/add-edit-non-operational-days-popup.component';


@NgModule({
  declarations: [
    ManageHolidaysAndNonOperationalDaysAppComponent,
    AddEditHolidaysComponent,
    AddEditNonOperationalDaysComponent,
    AddEditCustomizeHolidaysComponent,
    // AddEditCustomizeNonOperationalDaysComponent,
    AddEditCommonHolidayComponent,
    AddEditCustomHolidayComponent,
    AddEditCustomNonOperationalDaysComponent,
    AuditTrailTableComponent,
    LoginDialogComponent,
    CustomizeNonOperationalDaysComponent,
    AddEditNonOperationalDaysPopupComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    ManageHolidaysAndNonOperationalDasAppRoutingModule
  ]
})
export class ManageHolidaysAndNonOperationalDasAppModule { }
