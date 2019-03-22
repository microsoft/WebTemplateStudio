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
              Project Acorn was made by a group of interns in the Microsoft
              Garage Program. This project is open source, from Microsoft with
              love.
            </p>
          </div>
          <div className="col-2">
            <ul className="list-unstyled">
              <li>
                <a
                  className={styles.footerlink}
                  href="https://github.com/Microsoft/WebTemplateStudio"
                >
                  Github Page
                </a>
              </li>
              <li>
                <a
                  className={styles.footerlink}
                  href="https://github.com/Microsoft/WebTemplateStudio/tree/dev/docs"
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
