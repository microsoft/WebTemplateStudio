import classnames from "classnames";
import * as React from "react";

import { FormattedMessage, injectIntl, InjectedIntlProps } from "react-intl";

import CardBody from "../CardBody";

import buttonStyles from "../../css/buttonStyles.module.css";
import styles from "./styles.module.css";
import { IOption } from "../../types/option";
import { Link } from "react-router-dom";
import { ROUTES } from "../../utils/constants";

interface IProps {
  buttonText: string;
  option: IOption;
  disabled?: boolean;
  handleButtonClick: () => void;
  handleDetailsClick: (detailPageInfo: IOption) => void;
  useNormalButtons?: boolean;
}

type Props = IProps & InjectedIntlProps;

const Card = ({
  option,
  buttonText,
  disabled,
  handleButtonClick,
  handleDetailsClick,
  useNormalButtons,
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
          <CardBody formattedBody={formattedBody} />
        </div>
        <div className={styles.selectionContainer}>
          <Link
            onClick={() => handleDetailsClick(option)}
            className={styles.details}
            to={ROUTES.PAGE_DETAILS}
            tabIndex={disabled! ? -1 : 0}
          >
            <FormattedMessage id="card.details" defaultMessage="Details" />
          </Link>
          <button
            disabled={disabled!}
            onClick={handleButtonClick}
            className={classnames(styles.signInButton, {
              [buttonStyles.buttonHighlighted]: !useNormalButtons,
              [buttonStyles.buttonDark]: useNormalButtons,
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
