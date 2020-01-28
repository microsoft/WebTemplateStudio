import React, { useState } from "react";
import classnames from "classnames";
import GridComponent from "./GridComponent";
import WarningMessage from "../WarningMessage";
import styles from "./grid.module.css";
import CONSTANTS from "../../constants";

const ReactGrid = () => {
  const [gridItems, setGridItems] = useState([]);
  const [warningMessage, setWarningMessage] = useState({warningMessageOpen: false, warningMessageText: ""});
  const centeredHeaderStyle = classnames("text-center", styles.header);
  const getListGrids = () => {
    const promiseListGrids = fetch(CONSTANTS.ENDPOINT.GRID)
    .then(response => {
      if (!response.ok) {
        throw Error(response.statusText);
      }
      return response.json();
    });

    return promiseListGrids;
  }
  const handleWarningClose = () => {
    setWarningMessage({
      warningMessageOpen: false,
      warningMessageText: ""
    });
  }

  React.useEffect(() => {
    getListGrids()
    .then(listGrids => {setGridItems(listGrids)})
    .catch(error =>
      setWarningMessage({
        warningMessageOpen: true,
        warningMessageText: `Request to get grid text failed: ${error}`
      })
    );
  }, []);

  return (
    <main id="mainContent">
      <div className={centeredHeaderStyle}>
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
          <h1>Bootstrap Grid Template</h1>
        </div>

        <div className="row justify-content-around text-center pb-5">
          {gridItems.map(gridItem => (
            <GridComponent
            key={gridItem.id}
            gridItem={gridItem}
            />
          ))}
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

export default ReactGrid;