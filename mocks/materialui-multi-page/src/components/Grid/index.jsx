import React, { Component } from "react";
import GridComponent from "./GridComponent";
import WarningMessage from "../WarningMessage";
import GreyBox from "../../images/GreyBox.svg";
import styles from "./grid.module.css";
import classnames from "classnames";
import CONSTANTS from "../../constants";

export default class Grid extends Component {
  constructor(props) {
    super(props);
    this.state = {
      gridTextAssets: [{ description: "", header: "", id: 0 }],
      WarningMessageOpen: false,
      WarningMessageText: ""
    };

    this.handleWarningClose = this.handleWarningClose.bind(this);
  }

  handleWarningClose() {
    this.setState({
      WarningMessageOpen: false,
      WarningMessageText: ""
    });
  }

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
          WarningMessageOpen: true,
          WarningMessageText: `${CONSTANTS.ERROR_MESSAGE.GRID_GET} ${error}`
        })
      );
  }

  render() {
    return (
      <React.Fragment>
        <div className={classnames("text-center", styles.header)}>
          <h1>Project Acorn</h1>
          <p>Full Stack boiler plate powered by Bootstrap 4.3</p>
          <a
            href="https://github.com/Microsoft/WebTemplateStudio"
            className="btn btn-primary my-2"
          >
            Link to our Github
          </a>
        </div>

        <div className="container">
          <div className="row justify-content-center py-5">
            <h1>Bootstrap Grid Template</h1>
          </div>

          <div className="row justify-content-around text-center pb-5">
            {this.state.gridTextAssets.map(textAssets => (
              <GridComponent
                key={textAssets.id}
                header={textAssets.header}
                description={textAssets.description}
                image={GreyBox}
              />
            ))}
          </div>
        </div>
        <WarningMessage
          open={this.state.WarningMessageOpen}
          text={this.state.WarningMessageText}
          onWarningClose={this.handleWarningClose}
        />
      </React.Fragment>
    );
  }
}
