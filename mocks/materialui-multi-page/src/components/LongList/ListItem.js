import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import IconButton from "@material-ui/core/IconButton";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Avatar from "@material-ui/core/Avatar";
import ClearIcon from "@material-ui/icons/Clear";
import defaultAvatarImage from "../../images/DefaultAvatar.png";

const styles = theme => ({});

function ListItem(props) {
  const { classes } = props;

  return (
    <Grid item xs={12}>
      <Card>
        <CardHeader
          avatar={<Avatar alt="Default Avatar" src={defaultAvatarImage} />}
          action={
            <IconButton aria-label="Delete">
              <ClearIcon onClick={e => props.onDelete(e, props.listItem)} />
            </IconButton>
          }
          title="Jimmy Jones"
          subheader="September 14, 2016"
        />
        <CardContent>
          <Typography variant="h5" component="h2">
            {props.listItem.text}
          </Typography>
        </CardContent>
        <CardActions>
          <Button color="primary">Reply</Button>
          <Button color="primary">Edit</Button>
        </CardActions>
      </Card>
    </Grid>
  );
}

export default withStyles(styles)(ListItem);
