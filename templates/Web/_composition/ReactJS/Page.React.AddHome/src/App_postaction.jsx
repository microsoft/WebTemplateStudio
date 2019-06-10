class App extends Component {
  render() {
    return (
      <React.Fragment>
        <NavBar />
        <BrowserRouter>
          <Switch>
          //{[{
            <Redirect exact path = "/" to = "/Param_HomePageName" />
          //}]}
          </Switch>
        </BrowserRouter>
        <Footer />
      </React.Fragment>
    );
  }
}