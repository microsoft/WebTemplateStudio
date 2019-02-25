import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import { withStyles } from "@material-ui/core/styles";
import ReactNodeLongListItem from "./ReactNodeLongListItem";
import ReactNodeLongListForm from "./ReactNodeLongListForm";
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

    // Temporary I will use the id provided by the database when it is added
    this.id = 3;

    this.handleWarningClose = this.handleWarningClose.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleAddListItem = this.handleAddListItem.bind(this);
  }

  handleDelete(event, listItem) {
    fetch(`/api/ReactNodeLongListItems/${listItem.id}`, { method: "DELETE" })
      .then(response => response.json())
      .then(res => {
        let list = this.state.list;
        list = list.filter(item => item.id !== listItem.id);
        this.setState({ list: list });
      })
      .catch(error =>
        this.setState({
          WarningMessageOpen: true,
          WarningMessageText: "Request to delete list item failed."
        })
      );
  }

  handleAddListItem(event) {
    fetch("/api/ReactNodeLongListItems", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text: this.state.multilineTextField, id: this.id })
    })
      .then(resp => resp.json())
      .then(result =>
        this.setState({
          list: result,
          multilineTextField: ""
        })
      )
      .catch(error =>
        this.setState({
          WarningMessageOpen: true,
          WarningMessageText: "Request to add list item failed"
        })
      );

    this.id++;
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
    fetch("/api/ReactNodeLongListItems")
      .then(res => res.json())
      .then(result => this.setState({ list: result }))
      .catch(error =>
        this.setState({
          WarningMessageOpen: true,
          WarningMessageText: "Request to get list items failed"
        })
      );
  }

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.layout}>
        <Grid container justify="center" alignItems="flex-start" spacing={24}>
          <ReactNodeLongListForm
            onClick={this.handleAddListItem}
            onChange={this.handleChange}
            multilineTextField={this.state.multilineTextField}
          />
          {this.state.list.map(listItem => (
            <ReactNodeLongListItem
              key={listItem.id}
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
