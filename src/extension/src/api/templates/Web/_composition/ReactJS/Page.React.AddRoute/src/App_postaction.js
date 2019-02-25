class App extends Component {
  render() {
    return (
      <React.Fragment>
        <CssBaseline />
        <NavBar />
        <Switch>
        //^^
        //{[{
          <Route path="/wts.ItemName" component={wts.ItemName} />
        //}]}
        </Switch>
      </React.Fragment>
    );
  }
}

