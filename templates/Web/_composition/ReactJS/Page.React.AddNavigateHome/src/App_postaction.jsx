class App extends Component {
  render() {
    return (
      <React.Fragment>
        <NavBar />
        <Switch>
        //^^
        //{[{
          <Route exact path = "/" component = { wts.ItemName } />
        //}]}
        </Switch>
        <Footer />
      </React.Fragment>
    );
  }
}