import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
//^^
//{[{
  {
    path: 'wts.ItemName',
    loadChildren: () => import('./app-shell/wts.ItemName/wts.ItemName.module').then(mod => mod.wts.ItemNameModule)
  },
//}]}
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule],
  providers: []
})
export class AppRoutingModule { }

