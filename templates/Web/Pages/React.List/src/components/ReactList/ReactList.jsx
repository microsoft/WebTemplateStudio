import React, { useState } from "react";
import ListItem from "./ListItem";
import Form from "./Form";
import WarningMessage from "../WarningMessage";
import CONSTANTS from "../../constants";

const Param_SourceName_Pascal = () => {
  const [items, setItems] = useState([]);
  const [warningMessage, setWarningMessage] = useState({warningMessageOpen: false, warningMessageText: ""});

  const getItems = () => {
    let promiseList = fetch(CONSTANTS.ENDPOINT.LIST)
      .then(response => {
        if (!response.ok) {
          throw Error(response.statusText);
        }
        return response.json();
      })
    return promiseList;
  }

  const deleteItem = (item) => {
    fetch(`${CONSTANTS.ENDPOINT.LIST}/${item.id}`, { method: "DELETE" })
      .then(response => {
        if (!response.ok) {
          throw Error(response.statusText);
        }
        return response.json();
      })
      .then(result => {
        setItems(items.filter(item => item.id !== result.id));
      })
      .catch(error => {
        setWarningMessage({
          warningMessageOpen: true,
          warningMessageText: `${CONSTANTS.ERROR_MESSAGE.LIST_DELETE} ${error}`
        });
      });
  }

  const addItem = (textField) => {
    // Warning Pop Up if the user submits an empty message
    if (!textField) {
      setWarningMessage({
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
      .then(itemAdded =>{
        setItems([itemAdded, ...items]);
      })
      .catch(error =>
        setWarningMessage({
          warningMessageOpen: true,
          warningMessageText: `${CONSTANTS.ERROR_MESSAGE.LIST_ADD} ${error}`
        })
      );
  };

  const closeWarningMessage = () => {
    setWarningMessage({
      warningMessageOpen: false,
      warningMessageText: ""
    });
  };

  React.useEffect(() => {
    getItems()
      .then(list => {setItems(list)})
      .catch(error =>
        setWarningMessage({
          warningMessageOpen: true,
          warningMessageText: `${CONSTANTS.ERROR_MESSAGE.LIST_GET} ${error}`
        })
      );
  }, []);

  return (
    <main id="mainContent" className="container">
      <div className="row justify-content-center py-5">
        <h3>ReactList</h3>
      </div>
      <div className="row">
        <div className="col-12 p-0">
          <Form addItem={addItem}/>
        </div>
        {items.map(listItem => (
          <ListItem
            key={listItem.id}
            item={listItem}
            deleteItem={deleteItem}
          />
        ))}
        <WarningMessage
          open={warningMessage.warningMessageOpen}
          text={warningMessage.warningMessageText}
          onWarningClose={closeWarningMessage}
        />
      </div>
    </main>
  );
}

export default Param_SourceName_Pascal;