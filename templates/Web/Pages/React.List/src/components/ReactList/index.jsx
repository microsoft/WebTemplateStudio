import React, { useState } from "react";
import ListItem from "./ListItem";
import ListForm from "./ListForm";
import WarningMessage from "../WarningMessage";
import CONSTANTS from "../../constants";

const List = () => {
  const [listItems, setListItems] = useState([]);
  const [warningMessage, setWarningMessage] = useState({warningMessageOpen: false, warningMessageText: ""});
  const getListItem = () => {
    let promiseList = fetch(CONSTANTS.ENDPOINT.LIST)
      .then(response => {
        if (!response.ok) {
          throw Error(response.statusText);
        }
        return response.json();
      })
    return promiseList;
  }

  const deleteListItem = (listItem) => {
    fetch(`${CONSTANTS.ENDPOINT.LIST}/${listItem._id}`, { method: "DELETE" })
      .then(response => {
        if (!response.ok) {
          throw Error(response.statusText);
        }
        return response.json();
      })
      .then(result => {
        setListItems(listItems.filter(item => item._id !== result._id));
      })
      .catch(error => {
        setWarningMessage({
          warningMessageOpen: true,
          warningMessageText: `${CONSTANTS.ERROR_MESSAGE.LIST_DELETE} ${error}`
        });
      });
  }

  const addListItem = (textField) => {
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
        setListItems([itemAdded, ...listItems]);
      })
      .catch(error =>
        setWarningMessage({
          warningMessageOpen: true,
          warningMessageText: `${CONSTANTS.ERROR_MESSAGE.LIST_ADD} ${error}`
        })
      );
  };

  const handleWarningClose = () => {
    setWarningMessage({
      warningMessageOpen: false,
      warningMessageText: ""
    });
  };

  React.useEffect(() => {
    getListItem()
      .then(list => {setListItems(list)})
      .catch(error =>
        setWarningMessage({
          warningMessageOpen: true,
          warningMessageText: `${CONSTANTS.ERROR_MESSAGE.LIST_GET} ${error}`
        })
      );
  }, []);

  return (
    <main id="mainContent" className="container">
      <div className="row">
        <div className="col mt-5 p-0">
          <h3>Bootstrap List Template</h3>
        </div>
        <div className="col-12 p-0">
          <ListForm addListItem={addListItem}/>
        </div>
        {listItems.map(listItem => (
          <ListItem
            key={listItem._id}
            listItem={listItem}
            deleteListItem={deleteListItem}
          />
        ))}
        <WarningMessage
          open={warningMessage.warningMessageOpen}
          text={warningMessage.warningMessageText}
          onWarningClose={handleWarningClose}
        />
      </div>
    </main>
  );
}

export default List;