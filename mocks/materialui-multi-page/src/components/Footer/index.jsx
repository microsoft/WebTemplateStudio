import React from "react";
import styles from "./footer.module.css";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className="container-fluid">
        <div className="row justify-content-around">
          <div className="col-8 col-md-5">
            <h5 className={styles.title}>Project Name</h5>
            <p className={styles.description}>
              This is placeholder text. Your web app description goes here.
            </p>
          </div>
          <div className="col-2">
            <ul className="list-unstyled">
              <li>
                <a className={styles.footerlink} href="/">
                  Link 1
                </a>
              </li>
              <li>
                <a className={styles.footerlink} href="/">
                  Link 2
                </a>
              </li>
              <li>
                <a className={styles.footerlink} href="/">
                  Link 3
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}
