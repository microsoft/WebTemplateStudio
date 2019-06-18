import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { HeaderComponent } from './app-shell/NavBar/navbar.component';
import { FooterComponent } from './app-shell/Footer/footer.component';
import {Master_DetailModule} from './app-shell/Master_Detail/Master_Detail.module';
import {ListModule} from './app-shell/List/List.module';
import {GridModule} from './app-shell/Grid/Grid.module';
import {BlankModule} from './app-shell/Blank/Blank.module';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    Master_DetailModule,
    ListModule,
    GridModule,
    BlankModule,
    RouterModule.forRoot([
      { path: '**', redirectTo: 'Blank'}
    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
