class App extends Component {
  render() {
    return (
      <React.Fragment>
        <NavBar />
        <Switch>
        //{[{
          <Redirect exact path = "/" to = "/Param_HomePageName" />
        //}]}
        </Switch>
        <Footer />
      </React.Fragment>
    );
  }
}