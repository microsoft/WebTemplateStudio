import classnames from "classnames";
import * as React from "react";
import { ReactComponent as Down } from "../../assets/i-collapsibleDown.svg";
import { ReactComponent as Up } from "../../assets/i-collapsibleUp.svg";

import { injectIntl, InjectedIntlProps } from "react-intl";
import styles from "./styles.module.css";

interface IProps {
  question: string;
  answer: string;
  initialAnswerShownState?: boolean;
}

type Props = IProps & InjectedIntlProps;

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

  return (
    <div>
      <div className={styles.questionTitle}>
        {question}
        {isAnswerShown ? (
          <Up className={styles.toggleIcon} onClick={toggleAnswerShown} />
        ) : (
          <Down className={styles.toggleIcon} onClick={toggleAnswerShown} />
        )}
      </div>

      {isAnswerShown && <div className={styles.question}>{answer}</div>}
    </div>
  );
};

export default injectIntl(CollapsibleInfoBox);
