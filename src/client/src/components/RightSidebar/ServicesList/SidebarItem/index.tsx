import classnames from "classnames";
import * as React from "react";
import { InjectedIntl, InjectedIntlProps, injectIntl } from "react-intl";
import { connect } from "react-redux";

import { ReactComponent as CloseSVG } from "../../../../assets/cancel.svg";
import { ReactComponent as EditSVG } from "../../../../assets/edit.svg";
import { AppState } from "../../../../store/combineReducers";
import { IValidations } from "../../../../store/config/validations/model";
import { getValidations } from "../../../../store/userSelection/app/wizardSelectionSelector/wizardSelectionSelector";
import { ISelected } from "../../../../types/selected";
import { KEY_EVENTS } from "../../../../utils/constants/constants";
import Icon from "../../../Icon";
import messages from "./messages";
import styles from "./styles.module.css";

interface IStateProps {
  text: string;
  icon: string;
  cosmosDB?: boolean;
  appService?: boolean;
  idx?: number;
  withIndent?: boolean;
  handleOnCloseClick?: (idx: number) => void;
  handleConfigClick?: (idx: number) => void;
  intl: InjectedIntl;
  customInputStyle?: string;
  editable?: boolean;
  configurable?: boolean;
}

interface ISortablePageListProps {
  selectedPages: Array<ISelected>;
  validations: IValidations;
}

type Props = IStateProps & ISortablePageListProps & InjectedIntlProps;

//match name and component
const SidebarItem = ({
  text,
  icon,
  idx,
  handleConfigClick,
  handleOnCloseClick,
  intl,
  customInputStyle,
  editable,
  configurable,
}: Props) => {
  const handleKeyDown = (event: React.KeyboardEvent<SVGSVGElement>) => {
    if (event.key === KEY_EVENTS.ENTER || event.key === KEY_EVENTS.SPACE) {
      handleOnCloseClickEvent();
    }
  };
  const handleOnCloseClickEvent = () => {
    idx && handleOnCloseClick && handleOnCloseClick(idx - 1); // correction for idx + 1 to prevent 0th falsey behaviour
  };

  const handleConfigKeyDown = (event: React.KeyboardEvent<SVGSVGElement>) => {
    if (event.key === KEY_EVENTS.ENTER || event.key === KEY_EVENTS.SPACE) {
      handleConfigOnClick();
    }
  };
  const handleConfigOnClick = () => {
    idx && handleConfigClick && handleConfigClick(idx - 1); // correction for idx + 1 to prevent 0th falsey behaviour
  };

  return (
    <>
      <div className={styles.draggablePage}>
        <div className={styles.iconContainer}>
          <Icon name={text} icon={icon} small />
        </div>
        {editable && (
          <div className={styles.errorStack}>
            <div className={classnames(customInputStyle, styles.pagesTextContainer)}>
              <div className={styles.inputContainer}>
                {idx && (
                  <input
                    className={classnames(styles.disabledInput, styles.input, customInputStyle)}
                    value={text}
                    disabled={true}
                  />
                )}
              </div>
            </div>
          </div>
        )}
        {!editable && (
          <div className={styles.errorStack}>
            <div className={styles.pagesTextContainerNoEdit}>{text}</div>
          </div>
        )}
        {configurable && (
          <EditSVG
            tabIndex={0}
            onClick={handleConfigOnClick}
            onKeyDown={handleConfigKeyDown}
            className={styles.editIcon}
            aria-label={intl.formatMessage(messages.configItem)}
          />
        )}

        <CloseSVG
          tabIndex={0}
          onClick={handleOnCloseClickEvent}
          onKeyDown={handleKeyDown}
          className={styles.cancelIcon}
          aria-label={intl.formatMessage(messages.deleteItem)}
        />
      </div>
    </>
  );
};

const mapStateToProps = (state: AppState) => ({
  selectedPages: state.userSelection.pages,
  validations: getValidations(state),
});

export default connect(mapStateToProps)(injectIntl(SidebarItem));
