import React, { Component } from "react";
import classnames from "classnames";
import WarningMessage from "../WarningMessage";
import MasterDetailPage from "./MasterDetailPage";
import MasterDetailSideBarTab from "./MasterDetailSideBarTab";
import GreyAvatar from "../../images/GreyAvatar.svg";
import styles from "./masterdetail.module.css";
import CONSTANTS from "../../constants";

export default class MasterDetail extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentDisplayTabIndex: 0,
      masterDetailText: [
        {
          paragraph: "",
          title: "",
          tabName: "",
          id: 0
        }
      ]
    };
    this.handleDisplayTabClick = this.handleDisplayTabClick.bind(this);
    this.handleWarningClose = this.handleWarningClose.bind(this);
  }

  handleWarningClose() {
    this.setState({
      WarningMessageOpen: false,
      WarningMessageText: ""
    });
  }

  handleDisplayTabClick(id) {
    this.setState({ currentDisplayTabIndex: id });
  }

  // Get the sample data from the back end
  componentDidMount() {
    fetch(CONSTANTS.ENDPOINT.MASTERDETAIL)
      .then(response => {
        if (!response.ok) {
          throw Error(response.statusText);
        }
        return response.json();
      })
      .then(result => {
        this.setState({ masterDetailText: result });
      })
      .catch(error =>
        this.setState({
          WarningMessageOpen: true,
          WarningMessageText: `${
            CONSTANTS.ERROR_MESSAGE.MASTERDETAIL_GET
          } ${error}`
        })
      );
  }

  render() {
    const {
      masterDetailText,
      currentDisplayTabIndex,
      WarningMessageOpen,
      WarningMessageText
    } = this.state;
    return (
      <React.Fragment>
        <div className="container-fluid">
          <div className="row">
            <div
              className={classnames(
                "col-2",
                "p-0",
                "border-right",
                styles.sidebar
              )}
            >
              <div class="list-group list-group-flush border-bottom">
                {masterDetailText.map((textAssets, index) => (
                  <MasterDetailSideBarTab
                    onDisplayTabClick={this.handleDisplayTabClick}
                    tabText={textAssets.tabName}
                    image={GreyAvatar}
                    index={index}
                    key={textAssets.id}
                  />
                ))}
              </div>
            </div>
            <MasterDetailPage
              textSampleData={masterDetailText[currentDisplayTabIndex]}
            />
          </div>
        </div>
        <WarningMessage
          open={WarningMessageOpen}
          text={WarningMessageText}
          onWarningClose={this.handleWarningClose}
        />
      </React.Fragment>
    );
  }
}
