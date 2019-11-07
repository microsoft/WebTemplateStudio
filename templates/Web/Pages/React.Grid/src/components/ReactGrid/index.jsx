import React, { Component } from "react";
import classnames from "classnames";
import GridComponent from "./GridComponent";
import WarningMessage from "../WarningMessage";
import GreyBox from "../../images/GreyBox.svg";
import styles from "./grid.module.css";
import CONSTANTS from "../../constants";

export default class ReactGrid extends Component {
  state = {
    gridTextAssets: [{ description: "", header: "", id: 0 }],
    warningMessageOpen: false,
    warningMessageText: ""
  }

  centeredHeaderStyle = classnames("text-center", styles.header)

  // Get the text sample data from the back end
  componentDidMount() {
    fetch(CONSTANTS.ENDPOINT.GRID)
      .then(response => {
        if (!response.ok) {
          throw Error(response.statusText);
        }
        return response.json();
      })
      .then(result => this.setState({ gridTextAssets: result }))
      .catch(error =>
        this.setState({
          warningMessageOpen: true,
          warningMessageText: `Request to get grid text failed: ${error}`
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
      gridTextAssets,
      warningMessageOpen,
      warningMessageText
    } = this.state;
    return (
      <main id="mainContent">
        <div className={this.centeredHeaderStyle}>
          <h1>Param_ProjectName</h1>
          <p>This is placeholder text. Your web app description goes here.</p>
          <a
            href="https://github.com/Microsoft/WebTemplateStudio"
            className="btn btn-primary my-2"
          >
            Link to our Github
          </a>
        </div>

        <div className="container">
          <div className="row justify-content-center py-5">
            <h1>Bootstrap ReactGrid Template</h1>
          </div>

          <div className="row justify-content-around text-center pb-5">
            {gridTextAssets.map(textAssets => (
              <GridComponent
                key={textAssets.id}
                header={textAssets.title}
                description={textAssets.shortDescription}
                image={GreyBox}
              />
            ))}
          </div>
        </div>
        <WarningMessage
          open={warningMessageOpen}
          text={warningMessageText}
          onWarningClose={this.handleWarningClose}
        />
      </main>
    );
  }
}
