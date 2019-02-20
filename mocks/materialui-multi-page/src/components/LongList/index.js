import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import ListItem from "./ListItem";
import ListForm from "./ListForm";
import { withStyles } from "@material-ui/core/styles";

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
      list: []
    };

    this.id = 3;

    this.handleDelete = this.handleDelete.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleAddListItem = this.handleAddListItem.bind(this);
  }

  handleDelete(event, listItem) {
    fetch(`/api/listItem/${listItem.id}`, { method: "DELETE" })
      .then(response => response.json())
      .then(res => {
        console.log(res);
        let list = this.state.list;
        list = list.filter(item => item.id !== listItem.id);
        this.setState({ list: list });
      })
      .catch(error => console.error(error));
  }

  handleAddListItem(event) {
    console.log(this.state.multilineTextField);
    fetch("/api/listItems", {
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
      );
    this.id++;
  }

  handleChange(event, name) {
    this.setState({ [name]: event.target.value });
  }

  componentDidMount() {
    fetch("/api/listItems")
      .then(res => res.json())
      .then(result => this.setState({ list: result }));
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
              key={listItem.id}
              listItem={listItem}
              onDelete={this.handleDelete}
            />
          ))}
        </Grid>
      </div>
    );
  }
}

export default withStyles(styles)(index);
