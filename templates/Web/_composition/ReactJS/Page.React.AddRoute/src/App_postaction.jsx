class App extends Component {
  render() {
    return (
      <React.Fragment>
        <NavBar />
        <BrowserRouter>
          <Switch>
          //^^
          //{[{
            <Route path = "/wts.ItemName" component = { wts.ItemName } />
          //}]}
          </Switch>
        </BrowserRouter>
        <Footer />
      </React.Fragment>
    );
  }
}