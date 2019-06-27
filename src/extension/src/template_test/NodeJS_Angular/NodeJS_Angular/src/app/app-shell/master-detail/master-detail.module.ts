import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MasterDetailComponent } from './master-detail.component';
import { MasterDetailSidebarTabComponent } from './master-detail-sidebar-tab/master-detail-sidebar-tab.component';
import { WarningMessageModule } from '../../shared/warning-message/warning-message.module';
import { MasterDetailPageComponent } from './master-detail-page/master-detail-page.component';
import { MasterDetailRoutingModule } from './master-detail-routing.module';

@NgModule({
  declarations: [
    MasterDetailComponent,
    MasterDetailSidebarTabComponent,
    MasterDetailPageComponent
  ],
  imports: [
    CommonModule,
    WarningMessageModule,
    MasterDetailRoutingModule
  ]
})
export class MasterDetailModule { }
