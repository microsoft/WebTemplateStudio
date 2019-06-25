import classNames from "classnames";
import * as React from "react";
import { connect } from "react-redux";

import { Link } from "react-router-dom";

import CardBody from "../../components/CardBody";
import CardTitle from "../../components/CardTitle";
import DependencyInfo from "../DependencyInfo";
import { ReactComponent as Check } from "../../assets/check.svg";

import grid from "../../css/grid.module.css";
import styles from "./styles.module.css";

// import Check from "../../assets/check.svg";

import { IOption } from "../../types/option";
import { FormattedMessage } from "react-intl";
import { ROUTES } from "../../utils/constants";
import { getSvg } from "../../utils/getSvgUrl";

import { AppState } from "../../reducers";

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
  disabled,
  isFrameworkSelection,
  isPreview
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
  isFrameworkSelection: boolean;
  isPreview: boolean;
}) => {
  function detailsClickWrapper(
    event: React.MouseEvent<HTMLAnchorElement, MouseEvent>
  ) {
    event.stopPropagation();
    onDetailsClick(option);
  }

  const keyDownHandler = (event: any) => {
    if (event.keyCode === 13 || event.keyCode === 32) {
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
        {isPreview && isFrameworkSelection && selected && (
          <DependencyInfo
            frameworkName={option.internalName}
            installed={true}
          />
        )}
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
            <div className={styles.selectedText}>
              <div>
                <FormattedMessage
                  id="selectableCard.selected"
                  defaultMessage="Selected"
                />
              </div>
              <Check className={styles.iconCheckMark} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state: AppState): any => {
  const { previewStatus } = state.wizardContent;
  return {
    isPreview: previewStatus
  };
};

export default connect(mapStateToProps)(SelectableCard);
