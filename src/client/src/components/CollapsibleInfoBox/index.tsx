import * as React from "react";
import { InjectedIntlProps, injectIntl } from "react-intl";

import { ReactComponent as DownSVG } from "../../assets/i-collapsibleDown.svg";
import { ReactComponent as UpSVG } from "../../assets/i-collapsibleUp.svg";

import { KEY_EVENTS } from "../../utils/constants/constants";

import styles from "./styles.module.css";
import messages from "./messages";

interface IProps {
  question: string;
  answer: string;
  initialAnswerShownState?: boolean;
}

type Props = IProps & InjectedIntlProps;

const CollapsibleInfoBox = ({ question, answer, initialAnswerShownState = false, intl }: Props) => {
  const { formatMessage } = intl;

  const [isAnswerShown, setAnswerShown] = React.useState(initialAnswerShownState);

  const toggleAnswerShown = () => {
    setAnswerShown(!isAnswerShown);
  };

  const keyDownHandler = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === KEY_EVENTS.ENTER || event.key === KEY_EVENTS.SPACE) {
      event.preventDefault();
      event.stopPropagation();
      toggleAnswerShown();
    }
  };

  return (
    <div>
      <div
        role="button"
        tabIndex={0}
        onClick={toggleAnswerShown}
        onKeyDown={keyDownHandler}
        className={styles.questionTitle}
      >
        {question}
        {isAnswerShown ? (
          <UpSVG
            className={styles.toggleIcon}
            title={formatMessage(messages.up)}
            aria-label={formatMessage(messages.up)}
          />
        ) : (
          <DownSVG
            className={styles.toggleIcon}
            title={formatMessage(messages.down)}
            aria-label={formatMessage(messages.down)}
          />
        )}
      </div>

      {isAnswerShown && <div className={styles.question}>{answer}</div>}
    </div>
  );
};

export default injectIntl(CollapsibleInfoBox);
