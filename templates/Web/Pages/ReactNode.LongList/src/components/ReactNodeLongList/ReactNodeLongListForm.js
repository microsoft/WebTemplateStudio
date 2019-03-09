import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

const styles = themes => ({});

function ReactNodeLongListForm(props) {
  const { classes } = props;

  return (
    <React.Fragment>
      <Grid item xs={12}>
        <TextField
          id="multilineTextField"
          label="Add Message"
          multiline
          value={props.multilineTextField}
          onChange={event => props.onChange(event, "multilineTextField")}
          fullWidth
          margin="normal"
          variant="filled"
        />
      </Grid>
      <Grid item xs>
        <Button
          variant="contained"
          color="primary"
          onClick={event => props.onClick(event)}
        >
          Add
        </Button>
      </Grid>
    </React.Fragment>
  );
}

export default withStyles(styles)(ReactNodeLongListForm);
