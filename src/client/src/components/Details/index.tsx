import classnames from "classnames";
import * as React from "react";

import buttonStyles from "../../css/buttonStyles.module.css";
import grid from "../../css/grid.module.css";
import styles from "./styles.module.css";
import backArrow from "../../assets/backarrow.svg";

import { IOption } from "../../types/option";

interface IProps {
  options: IOption;
  handleBackClick: () => void;
}

const Card = ({ options, handleBackClick }: IProps) => {
  return (
    <React.Fragment>
      <div className={styles.container}>
        <div className={styles.backContainer}>
          <div>
            {!!backArrow && <img className={styles.backIcon} src={backArrow} />}
          </div>
          <div className={styles.details} onClick={handleBackClick}>
            Back
          </div>
        </div>
        <div className={styles.detailsContainer}>
          <div>
            {!!options.svgUrl && (
              <img className={styles.icon} src={options.svgUrl} />
            )}
          </div>
          <div>
            <div className={styles.detailsTitle}>{options.title}</div>
            <div className={styles.detailsDescription}>{options.body}</div>

            <div className={styles.col}>
              <div className={styles.categoriesContainer}>
                <div>Author:</div>
                <div>Version:</div>
                <div>Licenses:</div>
                <div>Dependencies:</div>
              </div>
              <div>
                <div>Mircrosoft</div>
                <div>Mircrosoft</div>
                <div>Mircrosoft</div>
                <div>Mircrosoft</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

{
  /* <div className={styles.loginContainer}>
<div className={styles.cardTitleContainer}>
  {!!options.svgUrl && (
    <img className={styles.icon} src={options.svgUrl} />
  )}
  <div className={styles.cardTitle}>{options.title}</div>
</div>
<div className={styles.cardBody}>{options.body}</div>
<div className={styles.selectionContainer}>
  <div className={styles.details} onClick={handleDetailsClick}>
    Details
  </div>
</div>
</div> */
}

export default Card;
