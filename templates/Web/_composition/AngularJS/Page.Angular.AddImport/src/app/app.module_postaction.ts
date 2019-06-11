import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { HeaderComponent } from './app-shell/NavBar/navbar.component';
import { FooterComponent } from './app-shell/Footer/footer.component';
//{[{
import {wts.ItemNameModule} from './app-shell/wts.ItemName/wts.ItemName.module';
//}]}
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    //{[{
    wts.ItemNameModule,
    //}]}
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
