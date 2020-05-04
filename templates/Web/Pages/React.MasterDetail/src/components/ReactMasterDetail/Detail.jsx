import React from "react";
import classnames from "classnames";
import styles from "./styles.module.css";
import PropTypes from "prop-types";

const Detail = ({ textSampleData }) => {
  const {
    longDescription,
    title,
    status,
    shipTo,
    orderTotal,
    orderDate
  } = textSampleData;

  return (
    <div className="col">
      <div className={classnames("row", styles.heading)}>
        <div className="col">
          <h3 className="ml-3 mb-4">{title}</h3>
        </div>
      </div>
      <div className="row">
        <div className="col-md-8 col-12 ml-3 mb-5 mt-3">
          <p className={styles.title}>Status</p>
          <p>{status}</p>
          <p className={styles.title}>Order Date</p>
          <p>{orderDate}</p>
          <p className={styles.title}>Ship To</p>
          <p>{shipTo}</p>
          <p className={styles.title}>Order Total</p>
          <p>{orderTotal}</p>
          <p className={styles.title}>Description</p>
          <p>{longDescription}</p>
        </div>
      </div>
    </div>
  );
}

Detail.propTypes = {
  textSampleData: PropTypes.any
}

export default Detail;