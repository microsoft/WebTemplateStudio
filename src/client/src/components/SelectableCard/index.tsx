import classNames from "classnames";
import * as React from "react";

import { Link } from "react-router-dom";

import CardBody from "../CardBody";
import CardTitle from "../CardTitle";
import DependencyInfo from "../../containers/DependencyInfo";
import { ReactComponent as Check } from "../../assets/check.svg";

import grid from "../../css/grid.module.css";
import styles from "./styles.module.css";

import { IOption } from "../../types/option";
import { FormattedMessage } from "react-intl";
import { ROUTES, KEY_EVENTS } from "../../utils/constants";
import { getSvg } from "../../utils/getSvgUrl";

import { ReactComponent as Plus } from "../../assets/plus.svg";
import { ReactComponent as Subtract } from "../../assets/subtract.svg";
import plus from "../../assets/plus.svg";
import subtract from "../../assets/subtract.svg";
import keyUpHandler from "../../utils/keyUpHandler";

const SelectableCard = ({
  iconPath,
  iconStyles,
  title,
  body,
  version,
  selected,
  cardNumber,
  onCardClick,
  option,
  onDetailsClick,
  clickCount,
  disabled,
  isFrameworkSelection,
  isPagesSelection,
  addPage,
  removePage
}: {
  iconPath: string | undefined;
  iconStyles: string;
  title: string;
  body: string;
  version?: string;
  selected: boolean;
  option: IOption;
  cardNumber: number;
  onCardClick: (idx: number) => void;
  onDetailsClick: (detailPageInfo: IOption) => void;
  clickCount?: number;
  disabled: boolean | undefined;
  isFrameworkSelection: boolean;
  isPagesSelection: boolean;
  addPage: (idx: number) => void;
  removePage: (idx: number) => void;
}) => {
  function detailsClickWrapper(
    event: React.MouseEvent<HTMLAnchorElement, MouseEvent>
  ) {
    event.stopPropagation();
    onDetailsClick(option);
  }

  const keyDownHandler = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === KEY_EVENTS.ENTER || event.key === KEY_EVENTS.SPACE) {
      onCardClick(cardNumber);
    }
  };

  return (
    <div
      role="button"
      tabIndex={0}
      onClick={() => {
        onCardClick(cardNumber);
      }}
      onKeyDown={keyDownHandler}
      className={classNames(styles.container, styles.boundingBox, {
        [styles.selected]: selected,
        [styles.unselectable]: disabled
      })}
    >
      <div>
        <div className={styles.cardHeader}>
          <div className={styles.icon}>
            {getSvg(option.internalName, iconStyles) ||
              (iconPath && (
                <img src={iconPath} className={iconStyles} alt="" />
              ))}
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
        {isFrameworkSelection && selected && (
          <DependencyInfo frameworkName={option.internalName} />
        )}
        <div className={grid.row}>
          <div className={styles.body}>
            {version ? (
              <CardBody body={body} version={version} />
            ) : (
              <CardBody body={body} />
            )}
          </div>
        </div>
      </div>
      <div className={styles.cardFooter}>
        <Link
          onClick={detailsClickWrapper}
          className={classNames(styles.link)}
          to={ROUTES.PAGE_DETAILS}
          onKeyUp={keyUpHandler}
        >
          <FormattedMessage
            id="selectableCard.details"
            defaultMessage="Details"
          />
        </Link>
        <div className={styles.pageButtons}>
          {isPagesSelection && (
            <button
              className={classNames(styles.cardCount, styles.countButton)}
              onClick={() => removePage(cardNumber)}
              disabled={!clickCount}
            >
              {subtract && <Subtract className={styles.subtractSVG} />}
            </button>
          )}
          <div
            className={classNames({
              [styles.hidden]: !selected && !isPagesSelection,
              [styles.selectedCheckMark]: selected && !clickCount,
              [styles.showCount]: isPagesSelection
            })}
          >
            {(isPagesSelection && <div>{clickCount}</div>) || (
              <div className={styles.selectedText}>
                <Check className={styles.iconCheckMark} />
              </div>
            )}
          </div>
          {isPagesSelection && (
            <button
              className={classNames(styles.cardCount, styles.countButton)}
              onClick={() => addPage(cardNumber)}
            >
              {plus && <Plus />}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default SelectableCard;
