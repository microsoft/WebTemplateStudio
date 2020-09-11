const App = () => {
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