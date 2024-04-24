import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './layout.component';

const routes: Routes = [
    {
        path: '', component: LayoutComponent,
        children: [
            { path: 'login-access-approval', loadChildren: () => import("../modules/manage-holidays-and-non-operational-days/manage-holidays-and-non-operational-days-app.module").then(m => m.ManageHolidaysAndNonOperationalDasAppModule) }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class LayoutRoutingModule { }
