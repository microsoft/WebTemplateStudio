import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MasterDetailComponent } from './master-detail.component';
import { MasterDetailSideBarTabComponent } from './MasterDetailSideBarTab/master-detail-SideBarTab';
import { WarningMessageModule } from 'src/app/sharedComponents/warning-message.module';
import { MasterDetailPageComponent } from './MasterDetailPage/master-detail-page.component';

@NgModule({
  declarations: [
    MasterDetailComponent,
    MasterDetailSideBarTabComponent,
    MasterDetailPageComponent,
  ],
  imports: [
    CommonModule,
    WarningMessageModule,
    RouterModule.forChild([
      { path: 'AngularMasterDetail', component: MasterDetailComponent},
    ]),
  ]
})
export class AngularMasterDetailModule { }
