import classNames from "classnames";
import * as React from "react";

import { Link } from "react-router-dom";

import CardBody from "../CardBody";
import CardTitle from "../CardTitle";

import grid from "../../css/grid.module.css";
import styles from "./styles.module.css";

import Check from "../../assets/check.svg";

import { IOption } from "../../types/option";
import { FormattedMessage } from "react-intl";
import { ROUTES } from "../../utils/constants";

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
  clickCount,
  disabled
}: {
  iconPath: string | undefined;
  iconStyles: string;
  title: string;
  body: string;
  selected: boolean;
  option: IOption;
  cardNumber: number;
  onCardClick: (idx: number) => void;
  onDetailsClick: (detailPageInfo: IOption) => void;
  clickCount?: number;
  disabled: boolean | undefined;
}) => {
  function detailsClickWrapper(
    event: React.MouseEvent<HTMLAnchorElement, MouseEvent>
  ) {
    event.stopPropagation();
    onDetailsClick(option);
  }

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
            {iconPath && (
              <img src={iconPath} className={iconStyles} alt="icon" />
            )}
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
          onClick={detailsClickWrapper}
          className={classNames(styles.link)}
          to={ROUTES.PAGE_DETAILS}
        >
          <FormattedMessage
            id="selectableCard.details"
            defaultMessage="Details"
          />
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
              alt="Check mark confirming item has been selected"
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default SelectableCard;
