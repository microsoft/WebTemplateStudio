import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Toolbar from "@material-ui/core/Toolbar";
import CssBaseline from "@material-ui/core/CssBaseline";
import { withStyles } from "@material-ui/core";

const styles = theme => ({
  appBar: {
    zIndex: theme.zIndex.drawer + 1
  },
  toolbarTitle: {
    flex: 1
  }
});

function index(props) {
  const { classes } = props;
  return (
    <React.Fragment>
      <CssBaseline />
      <AppBar position="static" color="default" className={classes.appBar}>
        <Toolbar>
          <Typography variant="h6" className={classes.toolbarTitle}>
            Company name
          </Typography>
          <Button>Link</Button>
          <Button>Link</Button>
          <Button>Link</Button>
        </Toolbar>
      </AppBar>
    </React.Fragment>
  );
}

export default withStyles(styles)(index);
