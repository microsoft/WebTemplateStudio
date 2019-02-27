import React from "react";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import { withStyles } from "@material-ui/core/styles";

const styles = theme => ({
  cardMedia: {
    paddingTop: "56.25%" // 16:9
  }
});

function ReactGridComponent(props) {
  const { classes } = props;
  return (
    <Grid item sm={6} md={4}>
      <Card>
        <CardMedia
          className={classes.cardMedia}
          image={props.Asset.image}
          title="Image title"
        />
        <CardContent>
          <Typography gutterBottom variant="h5">
            {props.Asset.header}
          </Typography>
          <Typography>{props.Asset.description}</Typography>
        </CardContent>
        <Divider />
        <CardActions>
          <Button size="small" color="primary">
            Action 1
          </Button>
          <Button size="small" color="primary">
            Action 2
          </Button>
        </CardActions>
      </Card>
    </Grid>
  );
}

export default withStyles(styles)(ReactGridComponent);
