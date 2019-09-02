import classnames from "classnames";
import * as React from "react";

import { FormattedMessage, injectIntl, InjectedIntlProps } from "react-intl";

import CardBody from "../CardBody";

import buttonStyles from "../../css/buttonStyles.module.css";
import styles from "./styles.module.css";
import { IOption } from "../../types/option";
import { Link } from "react-router-dom";
import { ROUTES } from "../../utils/constants";
import keyUpHandler from "../../utils/keyUpHandler";

interface IProps {
  buttonText: string;
  option: IOption;
  disabled?: boolean;
  handleButtonClick: () => void;
  handleDetailsClick: (detailPageInfo: IOption) => void;
}

type Props = IProps & InjectedIntlProps;

export const Card = ({
  option,
  buttonText,
  disabled,
  handleButtonClick,
  handleDetailsClick,
  intl
}: Props) => {
  const formattedBody = option.body as FormattedMessage.MessageDescriptor;
  const formattedTitle = option.title as FormattedMessage.MessageDescriptor;
  return (
    <div className={styles.loginContainer}>
      <div className={styles.cardTitleContainer}>
        {option.svgUrl && (
          <img className={styles.icon} src={option.svgUrl} alt="" />
        )}
        <div className={styles.cardTitle}>
          {intl.formatMessage(formattedTitle)}
        </div>
      </div>
      <div className={styles.cardContent}>
        <div className={styles.cardBody}>
          <CardBody
            formattedBody={formattedBody}
            expectedTime={
              option.expectedTime as FormattedMessage.MessageDescriptor
            }
            expectedPrice={
              option.expectedPrice as FormattedMessage.MessageDescriptor
            }
          />
        </div>
        <div className={styles.selectionContainer}>
          <Link
            onClick={() => handleDetailsClick(option)}
            className={styles.details}
            to={ROUTES.PAGE_DETAILS}
            tabIndex={disabled! ? -1 : 0}
            onKeyUp={keyUpHandler}
          >
            <FormattedMessage id="card.details" defaultMessage="Learn more" />
          </Link>
          <button
            disabled={disabled!}
            onClick={handleButtonClick}
            className={classnames(styles.signInButton, {
              [buttonStyles.buttonDark]: disabled,
              [buttonStyles.buttonHighlighted]: !disabled,
              [buttonStyles.buttonCursorDefault]: disabled,
              [buttonStyles.buttonCursorPointer]: !disabled
            })}
            tabIndex={disabled! ? -1 : 0}
          >
            {buttonText}
          </button>
        </div>
      </div>
    </div>
  );
};

export default injectIntl(Card);
