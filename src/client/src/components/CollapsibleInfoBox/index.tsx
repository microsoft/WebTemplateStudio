import classnames from "classnames";
import * as React from "react";
import { ReactComponent as Down } from "../../assets/i-collapsibleDown.svg";
import { ReactComponent as Up } from "../../assets/i-collapsibleUp.svg";

import styles from "./styles.module.css";
import { KEY_EVENTS } from "../../utils/constants";

interface IProps {
  question: string;
  answer: string;
  initialAnswerShownState?: boolean;
}

type Props = IProps;

const CollapsibleInfoBox = ({
  question,
  answer,
  initialAnswerShownState = false
}: Props) => {
  const [isAnswerShown, setAnswerShown] = React.useState(
    initialAnswerShownState
  );

  const toggleAnswerShown = () => {
    setAnswerShown(!isAnswerShown);
  };

  const keyDownHandler = (event: React.KeyboardEvent<SVGSVGElement>) => {
    if (event.key === KEY_EVENTS.ENTER || event.key === KEY_EVENTS.SPACE) {
      event.preventDefault();
      event.stopPropagation();
      toggleAnswerShown();
    }
  };

  return (
    <div>
      <div className={styles.questionTitle}>
        {question}
        {isAnswerShown ? (
          <Up
            tabIndex={0}
            className={styles.toggleIcon}
            onClick={toggleAnswerShown}
            onKeyDown={keyDownHandler}
          />
        ) : (
          <Down
            tabIndex={0}
            className={styles.toggleIcon}
            onClick={toggleAnswerShown}
            onKeyDown={keyDownHandler}
          />
        )}
      </div>

      {isAnswerShown && <div className={styles.question}>{answer}</div>}
    </div>
  );
};

export default CollapsibleInfoBox;
