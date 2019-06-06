import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MasterDetailComponent } from './master-detail.component';
import { MasterDetailSidebarTabComponent } from './master-detail-sidebar-tab/master-detail-sidebar-tab';
import { WarningMessageModule } from 'src/app/shared/warning-message/warning-message.module';
import { MasterDetailPageComponent } from './master-detail-page/master-detail-page.component';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  declarations: [
    MasterDetailComponent,
    MasterDetailSidebarTabComponent,
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
