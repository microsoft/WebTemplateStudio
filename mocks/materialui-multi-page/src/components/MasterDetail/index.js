import React, { Component } from "react";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Grid from "@material-ui/core/Grid";
import { withStyles } from "@material-ui/core/styles";
import MasterDetailPage from "./MasterDetailPage";
import defaultImage from "../../images/defaultImage.jpg";
import WarningMessage from "../WarningMessage";

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
    this.state = {
      displayTab: 0,
      masterDetailText: [
        {
          paragraph: "",
          title: "",
          tabName: "",
          id: 0
        }
      ]
    };
    this.endpoint = "api/masterdetail";
    this.handleClick = this.handleClick.bind(this);
    this.handleWarningClose = this.handleWarningClose.bind(this);
  }

  handleWarningClose() {
    this.setState({
      WarningMessageOpen: false,
      WarningMessageText: ""
    });
  }

  handleClick(id) {
    this.setState({ displayTab: id });
  }

  componentDidMount() {
    fetch(this.endpoint)
      .then(response => {
        if (!response.ok) {
          throw Error(response.statusText);
        }
        return response.json();
      })
      .then(result => {
        this.setState({ masterDetailText: result });
      })
      .catch(error =>
        this.setState({
          WarningMessageOpen: true,
          WarningMessageText: `Request to get master detail text failed: ${error}`
        })
      );
  }

  render() {
    const { classes } = this.props;
    const {
      masterDetailText,
      displayTab,
      WarningMessageOpen,
      WarningMessageText
    } = this.state;
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
            {masterDetailText.map((textAssets, index) => (
              <ListItem
                button
                onClick={() => this.handleClick(index)}
                key={textAssets.id}
              >
                <ListItemText primary={textAssets.tabName} />
              </ListItem>
            ))}
          </List>
        </Drawer>
        <Grid container justify="flex-start" alignItems="flex-start">
          <MasterDetailPage
            textAssets={masterDetailText[displayTab]}
            image={defaultImage}
          />
        </Grid>
        <WarningMessage
          open={WarningMessageOpen}
          text={WarningMessageText}
          onWarningClose={this.handleWarningClose}
        />
      </div>
    );
  }
}

export default withStyles(styles)(index);
