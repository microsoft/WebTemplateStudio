import React from "react";
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
import { withStyles } from "@material-ui/core/styles";
import defaultAvatarImage from "../../images/DefaultAvatar.png";

const styles = theme => ({});

function ListItem(props) {
  return (
    <Grid item xs={12}>
      <Card>
        <CardHeader
          avatar={<Avatar alt="Default Avatar" src={defaultAvatarImage} />}
          action={
            <IconButton
              aria-label="Delete"
              onClick={e => props.onDeleteListItem(e, props.listItem)}
            >
              <ClearIcon />
            </IconButton>
          }
          title="Jimmy Jones"
          subheader="January 1, 2019"
        />
        <CardContent>
          <Typography variant="h6" component="h2">
            {props.listItem.text}
          </Typography>
        </CardContent>
        <CardActions>
          <Button color="primary">Action 1</Button>
          <Button color="primary">Action 2</Button>
        </CardActions>
      </Card>
    </Grid>
  );
}

export default withStyles(styles)(ListItem);
