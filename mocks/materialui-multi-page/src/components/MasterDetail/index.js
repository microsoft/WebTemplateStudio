import React, { Component } from "react";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Grid from "@material-ui/core/Grid";
import { withStyles } from "@material-ui/core/styles";
import MasterDetailPage from "./MasterDetailPage";
import { Assets } from "./Assets";

const drawerWidth = 240;

const styles = theme => ({
  root: {
    display: "flex"
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0
  },
  drawerPaper: {
    width: drawerWidth
  },
  toolbar: theme.mixins.toolbar
});

class index extends Component {
  constructor(props) {
    super(props);

    // The index of the current tab being displayed
    this.state = { displayTab: 0 };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(id) {
    this.setState({ displayTab: id });
  }

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <Drawer
          variant="permanent"
          className={classes.drawer}
          classes={{
            paper: classes.drawerPaper
          }}
        >
          <div className={classes.toolbar} />
          <List>
            {Assets.map((Asset, index) => (
              <ListItem
                button
                onClick={() => this.handleClick(index)}
                key={Asset.id}
              >
                <ListItemText primary={Asset.tabName} />
              </ListItem>
            ))}
          </List>
        </Drawer>
        <Grid container justify="flex-start" alignItems="flex-start">
          <MasterDetailPage
            Asset={
              // this.state.displayTab indexes the assests contained in assets.js file
              Assets[this.state.displayTab]
            }
          />
        </Grid>
      </div>
    );
  }
}

export default withStyles(styles)(index);
