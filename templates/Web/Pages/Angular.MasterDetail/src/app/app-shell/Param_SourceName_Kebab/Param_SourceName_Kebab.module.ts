import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AngularMasterDetailComponent } from './Param_SourceName_Kebab.component';
import { MasterList } from './master-list/master-list.component';
import { WarningMessageModule } from '../../shared/warning-message/warning-message.module';
import { PageComponent } from './page/page.component';
import { Param_SourceName_PascalRoutingModule } from './Param_SourceName_Kebab-routing.module';

@NgModule({
  declarations: [AngularMasterDetailComponent, MasterList, PageComponent],
  imports: [
    CommonModule,
    WarningMessageModule,
    Param_SourceName_PascalRoutingModule
  ]
})
export class Param_SourceName_PascalModule { }
