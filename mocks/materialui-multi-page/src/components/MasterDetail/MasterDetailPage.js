import React from "react";
import classnames from "classnames";
import styles from "./masterdetail.module.css";

export default function MasterDetailPage(props) {
  return (
    <div className="col">
      <div className={classnames("row", styles.heading)}>
        <div className="col">
          <h3 className="ml-3 mb-4">{props.textSampleData.title}</h3>
        </div>
      </div>
      <div className="row">
        <div className="col-12 mt-3">
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb bg-white">
              <li className="breadcrumb-item">
                <a className={styles.breadCrumbLink} href="/masterdetail">
                  Master Detail
                </a>
              </li>
              <li className="breadcrumb-item active" aria-current="page">
                {props.textSampleData.title}
              </li>
            </ol>
          </nav>
        </div>
        <div className="col-md-8 col-12">
          <p className="ml-3">{props.textSampleData.paragraph}</p>
        </div>
      </div>
    </div>
  );
}
