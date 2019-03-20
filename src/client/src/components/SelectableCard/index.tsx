import classNames from "classnames";
import * as React from "react";

import { Link } from "react-router-dom";

import { IOption } from "../../types/option";

import CardBody from "../CardBody";
import CardTitle from "../CardTitle";

import grid from "../../css/grid.module.css";
import styles from "./styles.module.css";

import Check from "../../assets/check.svg";

const SelectableCard = ({
  iconPath,
  iconStyles,
  title,
  body,
  selected,
  cardNumber,
  onCardClick,
  option,
  onDetailsClick,
  disabled
}: {
  iconPath: string | undefined;
  iconStyles: string;
  title: string;
  body: string;
  selected: boolean;
  cardNumber: number;
  onCardClick: (idx: number) => void;
  option: IOption;
  onDetailsClick: (detailPageInfo: IOption) => void;
  disabled: boolean | undefined;
}) => {
  return (
    <div
      onClick={() => {
        onCardClick(cardNumber);
      }}
      className={classNames(styles.container, styles.boundingBox, {
        [styles.selected]: selected,
        [styles.unselectable]: disabled
      })}
    >
      <div>
        <div className={styles.cardHeader}>
          <div className={styles.icon}>
            {iconPath && <img src={iconPath} className={iconStyles} />}
          </div>
          <div
            className={classNames({
              [styles.title]: iconPath,
              [styles.titleLeftJustified]: iconPath === undefined ? true : false
            })}
          >
            <CardTitle title={title} />
          </div>
        </div>
        <div className={grid.row}>
          <div className={styles.body}>
            <CardBody body={body} />
          </div>
        </div>
      </div>
      <div className={styles.cardFooter}>
        <Link
          onClick={() => onDetailsClick(option)}
          className={classNames(styles.link)}
          to={"/PageDetail"}
        >
          Details
        </Link>
        <div
          className={classNames({
            [styles.hidden]: !selected,
            [styles.selectedCheckMark]: selected
          })}
        >
          <img
            src={process.env.REACT_APP_RELATIVE_PATH + Check}
            className={styles.iconCheckMark}
          />
        </div>
      </div>
    </div>
  );
};

export default SelectableCard;
