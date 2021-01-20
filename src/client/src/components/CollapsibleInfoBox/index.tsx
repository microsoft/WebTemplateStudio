import * as React from "react";
import { ReactComponent as Down } from "../../assets/i-collapsibleDown.svg";
import { ReactComponent as Up } from "../../assets/i-collapsibleUp.svg";

import styles from "./styles.module.css";
import { KEY_EVENTS } from "../../utils/constants/constants";

interface IProps {
  question: string;
  answer: string;
  initialAnswerShownState?: boolean;
}

type Props = IProps;

const CollapsibleInfoBox = ({ question, answer, initialAnswerShownState = false }: Props) => {
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
        {isAnswerShown ? <Up className={styles.toggleIcon} /> : <Down className={styles.toggleIcon} />}
      </div>

      {isAnswerShown && <div className={styles.question}>{answer}</div>}
    </div>
  );
};

export default CollapsibleInfoBox;
