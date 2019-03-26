import React, { Component } from "react";
import ListItem from "./ListItem";
import ListForm from "./ListForm";
import WarningMessage from "../WarningMessage";

export default class List extends Component {
  constructor(props) {
    super(props);
    this.state = {
      list: [],
      WarningMessageOpen: false,
      WarningMessageText: ""
    };

    this.endpoint = "/api/list";
    this.handleWarningClose = this.handleWarningClose.bind(this);
    this.handleDeleteListItem = this.handleDeleteListItem.bind(this);
    this.handleChangeInputText = this.handleChangeInputText.bind(this);
    this.handleAddListItem = this.handleAddListItem.bind(this);
  }

  handleDeleteListItem(listItem) {
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

  handleAddListItem() {
    // Warning Pop Up if the user submits an empty message
    if (!this.state.multilineTextField) {
      this.setState({
        WarningMessageOpen: true,
        WarningMessageText: "Please enter a valid message"
      });
      return;
    }

    fetch(this.endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        text: this.state.multilineTextField
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
  }

  handleChangeInputText(event, name) {
    this.setState({ [name]: event.target.value });
  }

  handleWarningClose() {
    this.setState({
      WarningMessageOpen: false,
      WarningMessageText: ""
    });
  }

  // Get the sample data from the back end
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
    const {
      multilineTextField,
      list,
      WarningMessageOpen,
      WarningMessageText
    } = this.state;
    return (
      <div className="container">
        <div className="row">
          <div className="col mt-5 p-0">
            <h3>Bootstrap List Template</h3>
          </div>
          <div className="col-12 p-0">
            <ListForm
              onAddListItem={this.handleAddListItem}
              onChangeInputText={this.handleChangeInputText}
              multilineTextField={multilineTextField}
            />
          </div>
          {list.map(listItem => (
            <ListItem
              key={listItem._id}
              listItem={listItem}
              onDeleteListItem={this.handleDeleteListItem}
            />
          ))}
          <WarningMessage
            open={WarningMessageOpen}
            text={WarningMessageText}
            onWarningClose={this.handleWarningClose}
          />
        </div>
      </div>
    );
  }
}
