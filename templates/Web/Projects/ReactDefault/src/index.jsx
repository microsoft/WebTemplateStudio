import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import registerServiceWorker from "./registerServiceWorker";
import "bootstrap/dist/css/bootstrap.min.css";

ReactDOM.render(
    <BrowserRouter>
      <App />
    </BrowserRouter>,
  document.getElementById("root")
);

/**  
 * Be aware that the website will only update to the latest version on the 2nd page visit if it as already cached 
 * Learn more about service workers in React: https://create-react-app.dev/docs/making-a-progressive-web-app
 */
registerServiceWorker();
