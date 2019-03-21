import React, { Component } from "react";
import GridComponent from "./GridComponent";
import Grid from "@material-ui/core/Grid";
import classNames from "classnames";
import { withStyles } from "@material-ui/core/styles";
import WarningMessage from "../WarningMessage";
import defaultImage from "../../images/defaultImage.jpg";

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
  constructor(props) {
    super(props);
    this.state = {
      gridTextAssets: [{ description: "", header: "", id: 0 }],
      WarningMessageOpen: false,
      WarningMessageText: ""
    };

    this.endpoint = "/api/grid";
    this.handleWarningClose = this.handleWarningClose.bind(this);
  }

  handleWarningClose() {
    this.setState({
      WarningMessageOpen: false,
      WarningMessageText: ""
    });
  }

  componentDidMount() {
    fetch(this.endpoint)
      .then(response => {
        if (!response.ok) {
          throw Error(response.statusText);
        }
        return response.json();
      })
      .then(result => this.setState({ gridTextAssets: result }))
      .catch(error =>
        this.setState({
          WarningMessageOpen: true,
          WarningMessageText: `Request to get grid text failed: ${error}`
        })
      );
  }

  render() {
    const { classes } = this.props;

    return (
      <div className={classNames(classes.layout, classes.cardGrid)}>
        <Grid container spacing={40}>
          {this.state.gridTextAssets.map(textAssets => (
            <GridComponent
              key={textAssets.id}
              header={textAssets.header}
              description={textAssets.description}
              image={defaultImage}
            />
          ))}
        </Grid>
        <WarningMessage
          open={this.state.WarningMessageOpen}
          text={this.state.WarningMessageText}
          onWarningClose={this.handleWarningClose}
        />
      </div>
    );
  }
}

export default withStyles(styles)(index);
