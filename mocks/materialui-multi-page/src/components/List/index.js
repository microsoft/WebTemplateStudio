import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import { withStyles } from "@material-ui/core/styles";
import ListItem from "./ListItem";
import ListForm from "./ListForm";
import WarningMessage from "../WarningMessage";

const styles = theme => ({
  layout: {
    width: "auto",
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up("lg")]: {
      width: 1000,
      marginLeft: "auto",
      marginRight: "auto"
    }
  }
});

class index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      list: [],
      WarningMessageOpen: false,
      WarningMessageText: ""
    };

    //Only include if list is selected and cosmos db is not selected
    this._id = 3;

    this.endpoint = "/api/listItems";
    this.handleWarningClose = this.handleWarningClose.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleAddListItem = this.handleAddListItem.bind(this);
  }

  handleDelete(event, listItem) {
    fetch(`${this.endpoint}/${listItem._id}`, { method: "DELETE" })
      .then(response => {
        if (!response.ok) {
          throw Error(response.statusText);
        }
        return response.json();
      })
      .then(result => {
        let list = this.state.list;
        list = list.filter(item => item._id !== result._id);
        this.setState({ list: list });
      })
      .catch(error => {
        this.setState({
          WarningMessageOpen: true,
          WarningMessageText: `Request to delete list item failed: ${error}`
        });
      });
  }

  handleAddListItem(event) {
    fetch(this.endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        text: this.state.multilineTextField,
        _id: this._id // Only include if list is selected and cosmos db is not selected
      })
    })
      .then(response => {
        if (!response.ok) {
          throw Error(response.statusText);
        }
        return response.json();
      })
      .then(result =>
        this.setState(prevState => ({
          list: [result, ...prevState.list],
          multilineTextField: ""
        }))
      )
      .catch(error =>
        this.setState({
          WarningMessageOpen: true,
          WarningMessageText: `Request to add list item failed: ${error}`
        })
      );

    // Only include if list is selected and cosmos db is not selected
    this._id++;
  }

  handleChange(event, name) {
    this.setState({ [name]: event.target.value });
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
      .then(result => this.setState({ list: result }))
      .catch(error =>
        this.setState({
          WarningMessageOpen: true,
          WarningMessageText: `Request to get list items failed: ${error}`
        })
      );
  }

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.layout}>
        <Grid container justify="center" alignItems="flex-start" spacing={24}>
          <ListForm
            onClick={this.handleAddListItem}
            onChange={this.handleChange}
            multilineTextField={this.state.multilineTextField}
          />
          {this.state.list.map(listItem => (
            <ListItem
              key={listItem._id}
              listItem={listItem}
              onDelete={this.handleDelete}
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
