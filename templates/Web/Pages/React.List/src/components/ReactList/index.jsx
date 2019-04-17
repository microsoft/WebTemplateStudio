﻿import React, { Component } from "react";
import ListItem from "./ListItem";
import ListForm from "./ListForm";
import WarningMessage from "../WarningMessage";
import CONSTANTS from "../../constants";

export default class ReactList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      list: [],
      WarningMessageOpen: false,
      WarningMessageText: ""
    };

    this.handleWarningClose = this.handleWarningClose.bind(this);
    this.handleDeleteListItem = this.handleDeleteListItem.bind(this);
    this.handleChangeInputText = this.handleChangeInputText.bind(this);
    this.handleAddListItem = this.handleAddListItem.bind(this);
  }

  // Get the sample data from the back end
  componentDidMount() {
    fetch(CONSTANTS.ENDPOINT.LIST)
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
          WarningMessageText: `${CONSTANTS.ERROR_MESSAGE.LIST_GET} ${error}`
        })
      );
  }

  handleDeleteListItem(listItem) {
    fetch(`${CONSTANTS.ENDPOINT.LIST}/${listItem._id}`, { method: "DELETE" })
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
          WarningMessageText: `${CONSTANTS.ERROR_MESSAGE.LIST_DELETE} ${error}`
        });
      });
  }

  handleAddListItem() {
    // Warning Pop Up if the user submits an empty message
    if (!this.state.textField) {
      this.setState({
        WarningMessageOpen: true,
        WarningMessageText: CONSTANTS.ERROR_MESSAGE.LIST_EMPTY_MESSAGE
      });
      return;
    }

    fetch(CONSTANTS.ENDPOINT.LIST, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        text: this.state.textField
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
          textField: ""
        }))
      )
      .catch(error =>
        this.setState({
          WarningMessageOpen: true,
          WarningMessageText: `${CONSTANTS.ERROR_MESSAGE.LIST_ADD} ${error}`
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

  render() {
    const {
      textField,
      list,
      WarningMessageOpen,
      WarningMessageText
    } = this.state;
    return (
      <main className="container">
        <div className="row">
          <div className="col mt-5 p-0">
            <h3>Bootstrap ReactList Template</h3>
          </div>
          <ul className="col-12 p-0">
            <ListForm
              onAddListItem={this.handleAddListItem}
              onChangeInputText={this.handleChangeInputText}
              textField={textField}
            />
          </ul>
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
      </main>
    );
  }
}
