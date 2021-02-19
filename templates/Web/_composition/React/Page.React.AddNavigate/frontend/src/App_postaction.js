const App = () => {
    return (
      <React.Fragment>
        <NavBar />
        <Switch>
        //^^
        //{[{
          <Route path = "/Param_SourceName_Pascal" component = { Param_SourceName_Pascal } />
        //}]}
        </Switch>
        <Footer />
      </React.Fragment>
    );
}