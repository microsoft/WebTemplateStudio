import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Param_SourceName_PascalComponent } from './Param_SourceName_Kebab.component';

const routes: Routes = [
  {
    path: '',
    component: Param_SourceName_PascalComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class Param_SourceName_PascalRoutingModule { }
