import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
//^^
//{[{
  {
    path: 'Param_SourceName_Kebab',
    loadChildren: () => import('./app-shell/Param_SourceName_Kebab/Param_SourceName_Kebab.module').then(mod => mod.Param_SourceName_PascalModule)
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

