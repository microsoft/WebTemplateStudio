import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Snackbar from "@material-ui/core/Snackbar";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";

const styles = theme => ({});

function WarningMessage(props) {
  return (
    <div>
      <Snackbar
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left"
        }}
        open={props.open}
        ContentProps={{
          "aria-describedby": "message-id"
        }}
        message={<span id="message-id">{props.text}</span>}
        action={[
          <IconButton
            key="close"
            aria-label="Close"
            color="inherit"
            onClick={props.onWarningClose}
          >
            <CloseIcon />
          </IconButton>
        ]}
      />
    </div>
  );
}

export default withStyles(styles)(WarningMessage);
