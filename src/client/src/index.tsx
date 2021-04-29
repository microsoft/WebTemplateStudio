import "focus-visible";
import "./index.css";

import * as React from "react";
import * as ReactDOM from "react-dom";
import { IntlProvider } from "react-intl";
import { Provider } from "react-redux";
import { applyMiddleware, createStore } from "redux";
import reduxSaga from "redux-saga";

import App from "./App";
import { AppContext } from "./AppContext";
import mockVsCodeApi from "./mockData/mockVsCodeApi";
import reducers from "./store/combineReducers";
import runSagaMiddleware from "./store/rootSaga";
import { ENVIRONMENT } from "./utils/constants/constants";

const sagaMiddleware = reduxSaga();
const createStoreWithMiddleware = applyMiddleware(sagaMiddleware)(createStore);

const store = createStoreWithMiddleware(
  reducers,
  (window as any).__REDUX_DEVTOOLS_EXTENSION__ && (window as any).__REDUX_DEVTOOLS_EXTENSION__()
);

const vscode =
  process.env.NODE_ENV === ENVIRONMENT.PRODUCTION
    ? // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore because function does not exist in dev environment
      acquireVsCodeApi()
    : mockVsCodeApi();

runSagaMiddleware(vscode, sagaMiddleware);

ReactDOM.render(
  <IntlProvider textComponent={React.Fragment}>
    <Provider store={store}>
      <AppContext.Provider value={{ vscode }}>
        <App />
      </AppContext.Provider>
    </Provider>
  </IntlProvider>,
  document.getElementById("root") as HTMLElement
);
