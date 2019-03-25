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
  iconStyles,
  selected,
  cardNumber,
  onCardClick,
  option,
  onDetailsClick,
  clickCount
}: {
  iconStyles: string;
  selected: boolean;
  cardNumber: number;
  onCardClick: (idx: number) => void;
  option: IOption;
  onDetailsClick: (detailPageInfo: IOption) => void;
  clickCount?: number;
}) => {
  return (
    <div
      onClick={() => {
        onCardClick(cardNumber);
      }}
      className={classNames(styles.container, styles.boundingBox, {
        [styles.selected]: selected,
        [styles.unselectable]: option.unselectable
      })}
    >
      <div>
        <div className={styles.cardHeader}>
          <div className={styles.icon}>
            {option.svgUrl && (
              <img src={option.svgUrl} className={iconStyles} />
            )}
          </div>
          <div
            className={classNames({
              [styles.title]: option.svgUrl,
              [styles.titleLeftJustified]:
                option.svgUrl === undefined ? true : false
            })}
          >
            <CardTitle title={option.title} />
          </div>
        </div>
        <div className={grid.row}>
          <div className={styles.body}>
            <CardBody body={option.body} />
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
            [styles.selectedCheckMark]: selected && !clickCount,
            [styles.cardCount]: selected && clickCount
          })}
        >
          {clickCount || (
            <img
              src={process.env.REACT_APP_RELATIVE_PATH + Check}
              className={styles.iconCheckMark}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default SelectableCard;
