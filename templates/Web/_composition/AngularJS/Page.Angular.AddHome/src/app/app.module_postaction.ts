@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    //^^
    //{[{
    RouterModule.forRoot([
      { path: '**', redirectTo: 'Param_HomePageName'}
    ])
    //}]}
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
