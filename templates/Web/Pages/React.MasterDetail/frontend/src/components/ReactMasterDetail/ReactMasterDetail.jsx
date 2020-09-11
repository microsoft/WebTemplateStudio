import React, { useState } from "react";
import classnames from "classnames";
import WarningMessage from "../WarningMessage";
import Detail from "./Detail";
import MasterList from "./MasterList";
import styles from "./styles.module.css";
import CONSTANTS from "../../constants";

const Param_SourceName_Pascal = () => {
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

  const closeWarningMessage = () => {
    setWarningMessage({warningMessageOpen: false , warningMessageText: ""});
  }

  React.useEffect(() => {
    getSampleOrders()
    .then(listSampleOrders => {
        setSampleOrders(listSampleOrders)
        setCurrentSampleOrder(listSampleOrders[0]);
    })
    .catch(error =>
    {
      setWarningMessage({warningMessageOpen: true, warningMessageText: `${CONSTANTS.ERROR_MESSAGE.MASTERDETAIL_GET} ${error}`});
    });
  }, []);

  return (
    <main id="mainContent">
      <div className="container-fluid">
        <div className="row">
          <div className={sidebarStyle}>
            <div className="list-group list-group-flush border-bottom">
              {sampleOrders.map((sampleOrder) => (
                <MasterList
                  selectSampleOrder={setCurrentSampleOrder}
                  sampleOrder={sampleOrder}
                  key={sampleOrder.id}
                  isActive={sampleOrder === currentSampleOrder}
                />
              ))}
            </div>
          </div>
          {currentSampleOrder.id && (
            <Detail
              textSampleData={currentSampleOrder}
            />
          )}
        </div>
      </div>
      <WarningMessage
        open={warningMessage.warningMessageOpen}
        text={warningMessage.warningMessageText}
        onWarningClose={closeWarningMessage}
      />
    </main>
  );
}

export default Param_SourceName_Pascal;