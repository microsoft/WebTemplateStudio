const App = () => {
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