import * as React from "react";
import { connect } from "react-redux";
import { injectIntl, InjectedIntl, InjectedIntlProps } from "react-intl";

import { AppState } from "../../../../store/combineReducers";
import { getValidations } from "../../../../store/userSelection/app/wizardSelectionSelector/wizardSelectionSelector";
import { IValidations } from "../../../../store/config/validations/model";
import { ISelected } from "../../../../types/selected";
import { KEY_EVENTS } from "../../../../utils/constants/constants";

import messages from "./messages";
import styles from "./styles.module.css";
import classnames from "classnames";

import { ReactComponent as EditSVG } from "../../../../assets/edit.svg";
import { ReactComponent as CloseSVG } from "../../../../assets/cancel.svg";

interface IStateProps {
  text?: string;
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
  cosmosDB,
  appService,
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
          {/* 
          reorderIcon style => small property in ICON component 
          choose cosmosDB or azure from prop
          */}
        </div>
        {editable && (
          <div className={styles.errorStack}>
            <div
              className={classnames(customInputStyle, {
                [styles.pagesTextContainer]: true,
              })}
            >
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
            <div
              className={classnames({
                [styles.pagesTextContainerNoEdit]: true,
              })}
            >
              {text}
            </div>
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
