import classnames from "classnames";
import * as React from "react";
import { connect } from "react-redux";
import loadable from '@loadable/component'
import { ReactComponent as CloseSVG } from "../../../../assets/cancel.svg";
import { ISelected } from "../../../../types/selected";
import styles from "./styles.module.css";
import { KEY_EVENTS } from "../../../../utils/constants/constants";
import { injectIntl, InjectedIntl, InjectedIntlProps } from "react-intl";
import { AppState } from "../../../../store/combineReducers";
import messages from "./messages";
import { getValidations } from "../../../../store/userSelection/app/wizardSelectionSelector/wizardSelectionSelector";
import { IValidations } from "../../../../store/config/validations/model";

const CosmosDBIcon = loadable(() => import(/* webpackChunkName: "CosmosdbIcon" */  "../../../../utils/svgComponents/CosmosdbIcon"));
const AppServiceIcon = loadable(() => import(/* webpackChunkName: "AppServiceIcon" */  "../../../../utils/svgComponents/AppserviceIcon"));

interface IStateProps {
  text?: string;
  cosmosDB?: boolean;
  appService?: boolean;
  idx?: number;
  withIndent?: boolean;
  handleCloseClick?: (idx: number) => void;
  intl: InjectedIntl;
  customInputStyle?: string;
}

interface ISortablePageListProps {
  selectedPages: Array<ISelected>;
  validations: IValidations;
}

type Props = IStateProps & ISortablePageListProps & InjectedIntlProps;

const DraggableSidebarItem = ({
  text,
  cosmosDB,
  appService,
  idx,
  handleCloseClick,
  intl,
  customInputStyle
}: Props) => {
  const handleKeyDown = (event: React.KeyboardEvent<SVGSVGElement>) => {
    if (event.key === KEY_EVENTS.ENTER || event.key === KEY_EVENTS.SPACE) {
      handleCloseOnClick();
    }
  };

  const handleCloseOnClick = () => {
    idx && handleCloseClick && handleCloseClick(idx - 1); // correction for idx + 1 to prevent 0th falsey behaviour
  };

  return (
    <div>
      <div className={styles.draggablePage}>
        <div className={styles.iconContainer}>
          {cosmosDB && <CosmosDBIcon style={styles.reorderIcon}/>}
          {appService && <AppServiceIcon style={styles.reorderIcon}/>}
        </div>
        <div className={styles.errorStack}>
          <div
            className={classnames(customInputStyle, {
              [styles.pagesTextContainer]: true
            })}
          >
            <div className={styles.inputContainer}>
              {idx && (
                <input
                  className={classnames(
                    styles.disabledInput,
                    styles.input,
                    customInputStyle
                  )}
                  value={text}
                  disabled={true}
                />
              )}
            </div>
          </div>

        </div>
          <CloseSVG
            tabIndex={0}
            onClick={handleCloseOnClick}
            onKeyDown={handleKeyDown}
            className={styles.cancelIcon}
            aria-label={intl.formatMessage(messages.deleteItem)}
          />
      </div>
    </div>
  );
};

const mapStateToProps = (state: AppState) => ({
  selectedPages: state.userSelection.pages,
  validations: getValidations(state)
});


export default connect(
  mapStateToProps
)(injectIntl(DraggableSidebarItem));
