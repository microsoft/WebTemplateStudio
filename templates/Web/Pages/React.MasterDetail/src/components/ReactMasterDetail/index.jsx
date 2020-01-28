import React, { useState } from "react";
import classnames from "classnames";
import WarningMessage from "../WarningMessage";
import MasterDetailPage from "./MasterDetailPage";
import MasterDetailSideBarTab from "./MasterDetailSideBarTab";
import styles from "./masterdetail.module.css";
import CONSTANTS from "../../constants";

const Master_Detail = () => {
  const [sampleOrders, setSampleOrders] = useState([]);
  const [currentSampleOrder, setCurrentSampleOrder] = useState({});
  const [warningMessage, setWarningMessage] = useState({warningMessageOpen: false, warningMessageText: ""});
  const sidebarStyle = classnames("col-2","p-0","border-right", styles.sidebar);
  const getSampleOrders = () => {
    let promiseSampleOrders = fetch(CONSTANTS.ENDPOINT.MASTERDETAIL)
      .then(response => {
        if (!response.ok) {
          throw Error(response.statusText);
        }
        return response.json();
      })

    return promiseSampleOrders;
  }

  const handleWarningClose = () => {
    setWarningMessage({warningMessageOpen: false , warningMessageText: ""});
  }

  const selectSampleOrder = (sampleOrder) => {
    setCurrentSampleOrder(sampleOrder);
  }

  React.useEffect(() => {
    getSampleOrders()
    .then(listSampleOrders => {
        setSampleOrders(listSampleOrders)
        setCurrentSampleOrder(listSampleOrders[0]);
    })
    .catch(error =>
      {
        console.log('error' + error)
        setWarningMessage({warningMessageOpen: true, warningMessageText: `${CONSTANTS.ERROR_MESSAGE.MASTERDETAIL_GET} ${error}`});
      }
     )
  }, []);

  return (
    <main id="mainContent">
      <div className="container-fluid">
        <div className="row">
          <div className={sidebarStyle}>
            <div className="list-group list-group-flush border-bottom">
              {sampleOrders.map((sampleOrder) => (
                <MasterDetailSideBarTab
                  selectSampleOrder={selectSampleOrder}
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
        open={warningMessage.warningMessageOpen}
        text={warningMessage.warningMessageText}
        onWarningClose={handleWarningClose}
      />
    </main>
  );
}

export default Master_Detail;