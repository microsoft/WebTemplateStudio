import classnames from "classnames";
import * as React from "react";

import { FormattedMessage, injectIntl, InjectedIntlProps } from "react-intl";


import buttonStyles from "../../../css/buttonStyles.module.css";
import styles from "./styles.module.css";
import { IOption } from "../../../types/option";
import { getSvg } from "../../../utils/getSvgUrl";
import CardBody from "../../../components/CardBody";
import keyUpHandler from "../../../utils/keyUpHandler";
import { KEY_EVENTS } from "../../../utils/constants";

interface IProps {
  option: IOption;
}

type Props = IProps & InjectedIntlProps;

export const ServiceCard = (props: Props) => {
  const { intl, option } = props;
  const { formatMessage } = intl;

/*
  const addOrEditResourceText = (internalName: string): string => {
    if (isSelectionCreated(internalName)) {
      return formatMessage(messages.editResource);
    }
    return formatMessage(messages.addResource);
  };
*/

  const handleDetailsClick = (option: IOption) => {
    console.log(option);
  };
  
  const handleButtonClick = (option: IOption) => {
    console.log(option);
  };

  const handleDetailsClickIfPressEnterKey = (event: React.KeyboardEvent<HTMLAnchorElement>, option: IOption) => {
    event.stopPropagation();
    if (event.key === KEY_EVENTS.ENTER) {
      handleDetailsClick(option);
    }
  };
  return (
    <div className={styles.container}>
    <div className={styles.loginContainer}>
      <div className={styles.cardTitleContainer}>
        {getSvg(option.internalName, styles.icon)}
        <div className={styles.cardTitle}>{option.title}</div>
      </div>
      <div className={styles.cardContent}>
        <div className={styles.cardBody}>
          <CardBody
            formattedBody={option.body as string}
            expectedTime={option.expectedTime as string|undefined}
            expectedPrice={option.expectedPrice as string|undefined}
          />
        </div>
        <div className={styles.selectionContainer}>
          <a
            onClick={() => handleDetailsClick(option)}
            onKeyPress={event => handleDetailsClickIfPressEnterKey(event, option)}
            className={styles.details}
            tabIndex={0}
            onKeyUp={keyUpHandler}
          >
            <FormattedMessage id="card.details" defaultMessage="Learn more" />
          </a>
          <button
            onClick={() => handleButtonClick}
            className={classnames(
              styles.signInButton,
              buttonStyles.buttonHighlighted,
              buttonStyles.buttonCursorPointer
            )}
            tabIndex={0}
          >
            {"VER addOrEditResourceText"}
          </button>
        </div>
      </div>
    </div>
    </div>
  );
};

export default injectIntl(ServiceCard);
