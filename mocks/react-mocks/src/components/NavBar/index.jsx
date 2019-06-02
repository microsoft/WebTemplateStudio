import React from "react";
import { Link } from "react-router-dom";
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
        <Link className="navbar-brand" to="/">
          Project Name
        </Link>
        <div className="navbar-nav">
          <Link className="nav-item nav-link active" to="/masterdetail">
            Master Detail
          </Link>
          <Link className="nav-item nav-link active" to="/grid">
            Content Grid
          </Link>
          <Link className="nav-item nav-link active" to="/list">
            List
          </Link>
          <Link className="nav-item nav-link active" to="/blank">
            Blank
          </Link>
        </div>
      </nav>
    </React.Fragment>
  );
}
