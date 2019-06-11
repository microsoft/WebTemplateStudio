import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';

import { MasterDetailComponent } from './master-detail.component';
import { MasterDetailSidebarTabComponent } from './master-detail-sidebar-tab/master-detail-sidebar-tab.component';
import { WarningMessageModule } from 'src/app/shared/warning-message/warning-message.module';
import { MasterDetailPageComponent } from './master-detail-page/master-detail-page.component';
import { AngularMasterDetailRoutingModule } from './AngularMasterDetail-routing.module';

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
    AngularMasterDetailRoutingModule
  ]
})
export class AngularMasterDetailModule { }
