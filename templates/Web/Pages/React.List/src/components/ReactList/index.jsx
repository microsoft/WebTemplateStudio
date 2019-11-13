import React, { Component } from "react";
import ListItem from "./ListItem";
import ListForm from "./ListForm";
import WarningMessage from "../WarningMessage";
import CONSTANTS from "../../constants";

export default class ReactList extends Component {
  state = {
    listItems: [],
    warningMessageOpen: false,
    warningMessageText: ""
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
      .then(result => this.setState({ listItems: result }))
      .catch(error =>
        this.setState({
          warningMessageOpen: true,
          warningMessageText: `${CONSTANTS.ERROR_MESSAGE.LIST_GET} ${error}`
        })
      );
  }

  handleDeleteListItem = (listItem) => {
    fetch(`${CONSTANTS.ENDPOINT.LIST}/${listItem._id}`, { method: "DELETE" })
      .then(response => {
        if (!response.ok) {
          throw Error(response.statusText);
        }
        return response.json();
      })
      .then(result => {
        let list = this.state.listItems.filter(item => item._id !== result._id);
        this.setState({ listItems: list });
      })
      .catch(error => {
        this.setState({
          warningMessageOpen: true,
          warningMessageText: `${CONSTANTS.ERROR_MESSAGE.LIST_DELETE} ${error}`
        });
      });
  }

  handleAddListItem = (textField) => {
    // Warning Pop Up if the user submits an empty message
    if (!textField) {
      this.setState({
        warningMessageOpen: true,
        warningMessageText: CONSTANTS.ERROR_MESSAGE.LIST_EMPTY_MESSAGE
      });
      return;
    }

    fetch(CONSTANTS.ENDPOINT.LIST, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        text: textField
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
          listItems: [result, ...prevState.listItems]
        }))
      )
      .catch(error =>
        this.setState({
          warningMessageOpen: true,
          warningMessageText: `${CONSTANTS.ERROR_MESSAGE.LIST_ADD} ${error}`
        })
      );
  }

  handleWarningClose = () => {
    this.setState({
      warningMessageOpen: false,
      warningMessageText: ""
    });
  }

  render() {
    const {
      listItems,
      warningMessageOpen,
      warningMessageText
    } = this.state;
    return (
      <main id="mainContent" className="container">
        <div className="row">
          <div className="col mt-5 p-0">
            <h3>Bootstrap ReactList Template</h3>
          </div>
          <div className="col-12 p-0">
            <ListForm
              onAddListItem={this.handleAddListItem}
            />
          </div>
          {listItems.map(listItem => (
            <ListItem
              key={listItem._id}
              listItem={listItem}
              onDeleteListItem={this.handleDeleteListItem}
            />
          ))}
          <WarningMessage
            open={warningMessageOpen}
            text={warningMessageText}
            onWarningClose={this.handleWarningClose}
          />
        </div>
      </main>
    );
  }
}
