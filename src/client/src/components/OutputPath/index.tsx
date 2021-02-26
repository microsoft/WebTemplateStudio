import * as React from "react";
import { InjectedIntlProps, injectIntl } from "react-intl";

import buttonStyles from "../../css/button.module.css";
import stylesInput from "../../css/input.module.css";
import { INTL_MESSAGES, KEY_EVENTS } from "../../utils/constants/constants";
import { IValidation } from "../../utils/validations/validations";
import messages from "./messages";
import styles from "./styles.module.css";

interface IProps {
  handleSaveClick: () => any;
  value: string;
  validation?: IValidation;
  isEmpty: boolean;
  placeholder?: string;
}
const OutputPath = ({ handleSaveClick, value, isEmpty, intl, placeholder }: IProps & InjectedIntlProps) => {
  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === KEY_EVENTS.ENTER || event.key === KEY_EVENTS.SPACE) {
      handleSaveClick();
    }
  };

  return (
    <div className={styles.container} tabIndex={0} onKeyDown={handleKeyDown}>
      <div className={styles.errorStack}>
        <div onClick={handleSaveClick}>
          <input
            aria-label={intl.formatMessage(messages.ariaOutputPathLabel)}
            value={value}
            placeholder={placeholder}
            disabled={true}
            className={stylesInput.input}
          />
        </div>
        {isEmpty && (
          <div className={styles.errorMessage}>
            {intl.formatMessage(INTL_MESSAGES.EMPTY_FIELD, {
              fieldId: intl.formatMessage(messages.outputPath),
            })}
          </div>
        )}
      </div>
      <button className={buttonStyles.buttonHighlighted} onClick={handleSaveClick} tabIndex={-1}>
        {intl.formatMessage(messages.browseButtonLabel)}
      </button>
    </div>
  );
};

export default injectIntl(OutputPath);
