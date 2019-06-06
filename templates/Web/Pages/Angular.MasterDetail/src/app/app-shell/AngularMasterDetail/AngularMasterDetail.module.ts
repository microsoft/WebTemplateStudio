import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MasterDetailComponent } from './master-detail.component';
import { MasterDetailSideBarTabComponent } from './MasterDetailSideBarTab/master-detail-SideBarTab';
import { WarningMessageModule } from 'src/app/shared/warning-message/warning-message.module';
import { MasterDetailPageComponent } from './MasterDetailPage/master-detail-page.component';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  declarations: [
    MasterDetailComponent,
    MasterDetailSideBarTabComponent,
    MasterDetailPageComponent,
  ],
  imports: [
    CommonModule,
    WarningMessageModule,
    MatIconModule,
    RouterModule.forChild([
      { path: 'AngularMasterDetail', component: MasterDetailComponent},
    ]),
  ]
})
export class AngularMasterDetailModule { }
