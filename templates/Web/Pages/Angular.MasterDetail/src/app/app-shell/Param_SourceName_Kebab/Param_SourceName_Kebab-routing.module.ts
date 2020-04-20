import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AngularMasterDetailComponent } from './Param_SourceName_Kebab.component';

const routes: Routes = [
  {
    path: '',
    component: AngularMasterDetailComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class Param_SourceName_PascalRoutingModule { }
