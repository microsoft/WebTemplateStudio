import React from "react";

//TODO Web Template Studio: Add a new link in the NavBar for your page here.
export default function NavBar() {
  return (
    <nav className="navbar navbar-expand-sm navbar-light border-bottom justify-content-between">
      <a className="navbar-brand" href="/">
        Project Name
      </a>
      <div className="navbar-nav">
        <a className="nav-item nav-link active" href="/masterdetail">
          Master Detail
        </a>
        <a className="nav-item nav-link active" href="/grid">
          Content Grid
        </a>
        <a className="nav-item nav-link active" href="/list">
          List
        </a>
        <a className="nav-item nav-link active" href="/blank">
          Blank
        </a>
      </div>
    </nav>
  );
}
