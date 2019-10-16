class App extends Component {
  render() {
    return (
      <React.Fragment>
        <NavBar />
        <Switch>
        //{[{
          <Route exact path = "/">
            <Redirect to="/Param_HomePageName" />
          </Route>
        //}]}
        </Switch>
        <Footer />
      </React.Fragment>
    );
  }
}