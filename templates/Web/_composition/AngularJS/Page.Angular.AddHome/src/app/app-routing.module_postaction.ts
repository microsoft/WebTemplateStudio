import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
//{[{
  {
    path: 'Param_HomePageName',
    loadChildren: () => import('./app-shell/Param_HomePageName/Param_HomePageName.module').then(mod => mod.Param_HomePageNameModule)
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

