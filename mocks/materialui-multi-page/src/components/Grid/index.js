import React, { Component } from "react";
import GridComponent from "./GridComponent";
import Grid from "@material-ui/core/Grid";
import classNames from "classnames";
import { Assets } from "./Assets";
import { withStyles } from "@material-ui/core/styles";

const styles = theme => ({
  layout: {
    marginRight: theme.spacing.unit * 4,
    marginLeft: theme.spacing.unit * 4,
    [theme.breakpoints.up("lg")]: {
      width: 1100,
      marginLeft: "auto",
      marginRight: "auto"
    }
  },
  cardGrid: {
    padding: theme.spacing.unit * 6
  }
});

class index extends Component {
  render() {
    const { classes } = this.props;

    return (
      <div className={classNames(classes.layout, classes.cardGrid)}>
        <Grid container spacing={40}>
          {Assets.map(asset => (
            <GridComponent key={asset.id} Asset={asset} />
          ))}
        </Grid>
      </div>
    );
  }
}

export default withStyles(styles)(index);
