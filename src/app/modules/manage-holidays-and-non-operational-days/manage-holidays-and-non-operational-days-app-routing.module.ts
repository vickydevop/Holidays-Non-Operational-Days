import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
// import { EducationSpecificLaunchScreenImagesComponent } from './education-specific-launch-screen-images/education-specific-launch-screen-images.component';
// import { GenericLaunchScreenImageComponent } from './generic-launch-screen-image/generic-launch-screen-image.component';
// import { LaunchScreenAppComponent } from './launch-screen-app/launch-screen-app.component';
import { ManageHolidaysAndNonOperationalDaysAppComponent } from './manage-holidays-and-non-operational-days-app/manage-holidays-and-non-operational-days-app.component';
import { AddEditHolidaysComponent } from './add-edit-holidays/add-edit-holidays.component';
import { AddEditNonOperationalDaysComponent } from './add-edit-non-operational-days/add-edit-non-operational-days.component';
import { AddEditCustomizeHolidaysComponent } from './add-edit-customize-holidays/add-edit-customize-holidays.component';
import { CustomizeNonOperationalDaysComponent } from './customize-non-operational-days/customize-non-operational-days.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'app-manage-holidays-and-non-operational-days-app',
    pathMatch: 'full',
  },
  {
    path: 'app-manage-holidays-and-non-operational-days-app',
    component: ManageHolidaysAndNonOperationalDaysAppComponent,
    children: [
      { path: '', redirectTo: 'app-add-edit-holidays', pathMatch: 'full' },
      { path: 'app-add-edit-holidays', component: AddEditHolidaysComponent },
      {
        path: 'app-add-edit-customize-holidays',
        component: AddEditCustomizeHolidaysComponent,
      },
      {
        path: 'app-add-edit-non-operational-days',
        component: AddEditNonOperationalDaysComponent,
      },
      {
        path: 'app-customize-non-operational-days',
        component: CustomizeNonOperationalDaysComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ManageHolidaysAndNonOperationalDasAppRoutingModule {}
