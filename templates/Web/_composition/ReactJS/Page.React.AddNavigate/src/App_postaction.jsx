class App extends Component {
  render() {
    return (
      <React.Fragment>
        <NavBar />
        <Switch>
        //^^
        //{[{
          <Route path = "/wts.ItemName" component = { wts.ItemName } />
        //}]}
        </Switch>
        <Footer />
      </React.Fragment>
    );
  }
}