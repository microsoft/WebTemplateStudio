import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AngularGridComponent } from './Param_SourceName_Kebab.component';

const routes: Routes = [
  {
    path: '',
    component: AngularGridComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class Param_SourceName_PascalRoutingModule { }
