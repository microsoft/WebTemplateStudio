import React, { useState } from "react";
import classnames from "classnames";
import WarningMessage from "../WarningMessage";
import styles from "./styles.module.css";
import CONSTANTS from "../../constants";
import GridItem from "./GridItem";

const ReactGrid = () => {
  const [items, setItems] = useState([]);
  const [warningMessage, setWarningMessage] = useState({warningMessageOpen: false, warningMessageText: ""});
  const centeredHeaderStyle = classnames("text-center", styles.header);

  const getItems = () => {
    const promiseItems = fetch(CONSTANTS.ENDPOINT.GRID)
    .then(response => {
      if (!response.ok) {
        throw Error(response.statusText);
      }
      return response.json();
    });

    return promiseItems;
  }
  const closeWarningMessage = () => {
    setWarningMessage({
      warningMessageOpen: false,
      warningMessageText: ""
    });
  }

  React.useEffect(() => {
    getItems()
    .then(newItems => {setItems(newItems)})
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
          {items.map(item => (
            <GridItem
            key={item.id}
            item={item}
            />
          ))}
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

export default ReactGrid;