import * as React from "react";

import styles from "./styles.module.css";
import backArrow from "../../assets/backarrow.svg";

import { IOption } from "../../types/option";

interface IProps {
  detailInfo: IOption;
  handleBackClick: () => void;
}

const Details = ({ detailInfo, handleBackClick }: IProps) => {
  return (
    <React.Fragment>
      <div className={styles.container}>
        <div className={styles.backContainer}>
          <div>
            {backArrow && (
              <img
                onClick={handleBackClick}
                className={styles.backIcon}
                src={process.env.REACT_APP_RELATIVE_PATH + backArrow}
              />
            )}
          </div>
          <div className={styles.details} onClick={handleBackClick}>
            Back
          </div>
        </div>
        <div className={styles.detailsContainer}>
          <div>
            {detailInfo.svgUrl && (
              <img className={styles.icon} src={detailInfo.svgUrl} />
            )}
          </div>
          <div>
            <div className={styles.detailsTitle}>{detailInfo.title}</div>
            <div className={styles.detailsDescription}>
              {detailInfo.longDescription}
            </div>

            <div className={styles.col}>
              <div className={styles.categoriesContainer}>
                <div>Author:</div>
                <div>Licenses:</div>
              </div>
              <div>
                <div>{detailInfo.author || "None"}</div>
                <div>{detailInfo.licenses || "None"}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Details;
