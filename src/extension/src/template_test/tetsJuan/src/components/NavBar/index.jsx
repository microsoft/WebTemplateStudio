import React from "react";
import styles from "./navbar.module.css";

//TODO Web Template Studio: Add a new link in the NavBar for your page here.
// A skip link is included as an accessibility best practice. For more information visit https://www.w3.org/WAI/WCAG21/Techniques/general/G1.
export default function NavBar() {
  return (
    <React.Fragment>
      <div className={styles.skipLink}>
        <a href="#mainContent">Skip to Main Content</a>
      </div>
      <nav className="navbar navbar-expand-sm navbar-light border-bottom justify-content-between">
        <a className="navbar-brand" href="/">
          tetsJuan
        </a>
        <div className="navbar-nav">
          <a className="nav-item nav-link active" href="Blank">
            Blank
          </a>
          <a className="nav-item nav-link active" href="Grid">
            Grid
          </a>
          <a className="nav-item nav-link active" href="List">
            List
          </a>
          <a className="nav-item nav-link active" href="Master_Detail">
            Master_Detail
          </a>
          <a className="nav-item nav-link active" href="Master_Detail2">
            Master_Detail2
          </a>
        </div>
      </nav>
    </React.Fragment>
  );
}
