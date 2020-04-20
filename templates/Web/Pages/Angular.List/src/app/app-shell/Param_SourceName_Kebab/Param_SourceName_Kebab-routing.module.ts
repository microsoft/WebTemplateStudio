import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AngularListComponent } from './Param_SourceName_Kebab.component';

const routes: Routes = [
  {
    path: '',
    component: AngularListComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class Param_SourceName_PascalRoutingModule { }
