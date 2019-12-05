import React, { Component } from "react";
import classnames from "classnames";
import WarningMessage from "../WarningMessage";
import MasterDetailPage from "./MasterDetailPage";
import MasterDetailSideBarTab from "./MasterDetailSideBarTab";
import styles from "./masterdetail.module.css";
import CONSTANTS from "../../constants";

export default class ReactMasterDetail extends Component {
  state = {
    currentSampleOrder: {},
    sampleOrders: []
  }

  sidebarStyle = classnames(
    "col-2",
    "p-0",
    "border-right",
    styles.sidebar
  )

  // Get the sample data from the back end
  componentDidMount() {
    fetch(CONSTANTS.ENDPOINT.MASTERDETAIL)
      .then(response => {
        if (!response.ok) {
          throw Error(response.statusText);
        }
        return response.json();
      })
      .then(listSampleOrders => {
        this.setState({ sampleOrders: listSampleOrders });
        this.setState({ currentSampleOrder: listSampleOrders[0] });
      })
      .catch(error =>
        this.setState({
          warningMessageOpen: true,
          warningMessageText: `${
            CONSTANTS.ERROR_MESSAGE.MASTERDETAIL_GET
            } ${error}`
        })
      );
  }

  handleWarningClose = () => {
    this.setState({
      warningMessageOpen: false,
      warningMessageText: ""
    });
  }

  selectSampleOrder = (sampleOrder) => {
    this.setState({ currentSampleOrder: sampleOrder });
  }

  render() {
    const {
      sampleOrders,
      currentSampleOrder,
      warningMessageOpen,
      warningMessageText
    } = this.state;
    return (
      <main id="mainContent">
        <div className="container-fluid">
          <div className="row">
            <div
              className={this.sidebarStyle}
            >
              <div className="list-group list-group-flush border-bottom">
                {sampleOrders.map((sampleOrder) => (
                  <MasterDetailSideBarTab
                    selectSampleOrder={this.selectSampleOrder}
                    sampleOrder={sampleOrder}
                    key={sampleOrder.id}
                  />
                ))}
              </div>
            </div>
            {currentSampleOrder.id && (
              <MasterDetailPage
                textSampleData={currentSampleOrder}
              />
            )}
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
