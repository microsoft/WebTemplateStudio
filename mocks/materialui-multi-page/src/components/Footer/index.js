import React from "react";
import styles from "./footer.module.css";
import classnames from "classnames";

export default function index() {
  return (
    <footer className={styles.footer}>
      <div className="container-fluid">
        <div class="row justify-content-around">
          <div class="col-8 col-md-5">
            <h5 className={styles.title}>Project Name</h5>
            <p className={styles.description}>
              Project Acorn was made by a group of interns in the Microsoft
              Garage Program. This project is open source, from Microsoft with
              love.
            </p>
          </div>
          <div class="col-2">
            <ul className="list-unstyled">
              <li>
                <a
                  className={styles.footerlink}
                  href="https://getbootstrap.com/"
                >
                  Github Page
                </a>
              </li>
              <li>
                <a
                  className={styles.footerlink}
                  href="https://getbootstrap.com/"
                >
                  Resources
                </a>
              </li>
              <li>
                <a
                  className={styles.footerlink}
                  href="https://www.microsoft.com/en-us/garage/"
                >
                  Microsoft Garage
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}
