import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
//{[{
import { Param_SourceName_PascalModule } from './app-shell/Param_SourceName_Kebab/Param_SourceName_Kebab.module';
//}]}
import { NavBarComponent } from './app-shell/nav-bar/nav-bar.component';
import { FooterComponent } from './app-shell/footer/footer.component';

@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    //{[{
    Param_SourceName_PascalModule,
    //}]}
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
