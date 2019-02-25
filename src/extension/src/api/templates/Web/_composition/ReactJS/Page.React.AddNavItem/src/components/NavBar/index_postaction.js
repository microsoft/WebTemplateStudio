  return (
    <React.Fragment>
      <CssBaseline />
      <AppBar position="sticky" color="default" className={classes.appBar}>
        <Toolbar>
          <Typography variant="h6" className={classes.toolbarTitle}>
            Company name
          </Typography>
          //^^
          //{[{
          <Button href="/wts.ItemName">wts.ItemName</Button>
          //}]}
        </Toolbar>
      </AppBar>
    </React.Fragment>
  );