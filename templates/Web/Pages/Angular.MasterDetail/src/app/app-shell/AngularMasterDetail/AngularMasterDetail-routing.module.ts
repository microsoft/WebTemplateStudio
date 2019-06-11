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
export class AngularMasterDetailRoutingModule { }


/*
Copyright Google LLC. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/
