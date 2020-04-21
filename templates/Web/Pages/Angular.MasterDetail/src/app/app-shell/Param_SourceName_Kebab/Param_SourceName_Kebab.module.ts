import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Param_SourceName_PascalComponent } from './Param_SourceName_Kebab.component';
import { MasterListComponent } from './master-list/master-list.component';
import { WarningMessageModule } from '../../shared/warning-message/warning-message.module';
import { PageComponent } from './page/page.component';
import { Param_SourceName_PascalRoutingModule } from './Param_SourceName_Kebab-routing.module';

@NgModule({
  declarations: [Param_SourceName_PascalComponent, MasterListComponent, PageComponent],
  imports: [
    CommonModule,
    WarningMessageModule,
    Param_SourceName_PascalRoutingModule
  ]
})
export class Param_SourceName_PascalModule { }
