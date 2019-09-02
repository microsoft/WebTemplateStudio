import * as React from "react";
import * as ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { HashRouter as Router } from "react-router-dom";
import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import App from "./App";
import "focus-visible";
import "./index.css";
import reducers from "./reducers";

import { IntlProvider } from "react-intl";

const createStoreWithMiddleware = applyMiddleware(thunk)(createStore);

const store = createStoreWithMiddleware(
  reducers,
  (window as any).__REDUX_DEVTOOLS_EXTENSION__ &&
    (window as any).__REDUX_DEVTOOLS_EXTENSION__()
);

ReactDOM.render(
  <IntlProvider textComponent={React.Fragment}>
    <Provider store={store}>
      <Router>
        <App />
      </Router>
    </Provider>
  </IntlProvider>,
  document.getElementById("root") as HTMLElement
);
