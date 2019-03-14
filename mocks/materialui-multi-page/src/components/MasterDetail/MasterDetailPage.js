import React from "react";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import { withStyles } from "@material-ui/core/styles";

const styles = theme => ({
  image: {
    maxWidth: 600,
    width: "100%",
    marginBottom: theme.spacing.unit * 4
  },
  layout: {
    width: "auto",
    margin: theme.spacing.unit * 6,
    [theme.breakpoints.up("lg")]: {
      width: 800,
      margin: theme.spacing.unit * 8
    }
  },
  title: {
    marginBottom: theme.spacing.unit * 4
  }
});

function MasterDetailPage(props) {
  const { classes } = props;

  return (
    <Grid item xs>
      <div className={classes.layout}>
        <img src={props.image} alt={"Default"} className={classes.image} />
        <Typography variant="h3" color="textPrimary" className={classes.title}>
          {props.textAssets.title}
        </Typography>
        <Typography paragraph>{props.textAssets.paragraph}</Typography>
      </div>
    </Grid>
  );
}

export default withStyles(styles)(MasterDetailPage);
