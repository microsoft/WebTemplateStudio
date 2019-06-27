import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MasterDetailComponent } from './master-detail.component';

const routes: Routes = [
  {
    path: '',
    component: MasterDetailComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MasterDetailRoutingModule { }
