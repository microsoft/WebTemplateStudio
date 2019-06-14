import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { NavBarComponent } from './app-shell/nav-bar/nav-bar.component';
import { FooterComponent } from './app-shell/footer/footer.component';
//{[{
import {wts.ItemNameModule} from './app-shell/wts.ItemName/wts.ItemName.module';
//}]}

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
    wts.ItemNameModule,
    //}]}
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
