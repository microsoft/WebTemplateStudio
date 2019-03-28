import React from "react";
import classnames from "classnames";
import styles from "./masterdetail.module.css";

export default function MasterDetailPage(props) {
  const { title, paragraph } = props.textSampleData;
  return (
    <div className="col">
      <div className={classnames("row", styles.heading)}>
        <div className="col">
          <h3 className="ml-3 mb-4">{title}</h3>
        </div>
      </div>
      <div className="row">
        <div className="col-12 mt-3">
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb bg-white">
              <li className="breadcrumb-item">
                <a className={styles.breadCrumbLink} href="/masterdetail">
                  ReactMasterDetail
                </a>
              </li>
              <li className="breadcrumb-item active" aria-current="page">
                {title}
              </li>
            </ol>
          </nav>
        </div>
        <div className="col-md-8 col-12">
          <p className="ml-3">{paragraph}</p>
        </div>
      </div>
    </div>
  );
}
