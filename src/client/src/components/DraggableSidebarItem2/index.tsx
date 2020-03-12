import classnames from "classnames";
import * as React from "react";
import { connect } from "react-redux";
import Loadable from "react-loadable";

import { ReactComponent as CloseSVG } from "../../assets/cancel.svg";

import { getSvg } from "../../utils/getSvgUrl";

import { ISelected } from "../../types/selected";
import styles from "./styles.module.css";
import { KEY_EVENTS } from "../../utils/constants";

import { injectIntl, InjectedIntl, InjectedIntlProps } from "react-intl";
import { IFunctionName } from "../../containers/AzureFunctionsSelection";

import { AppState } from "../../reducers";

import messages from "./messages";
import { ThunkDispatch } from "redux-thunk";
import RootAction from "../../actions/ActionType";
import { selectPageAction } from "../../actions/wizardSelectionActions/selectPages";
import { validateItemName } from "../../utils/validations/itemName/itemName";
import { getValidations } from "../../selectors/wizardSelectionSelector/wizardSelectionSelector";
import { IValidations } from "../../reducers/wizardSelectionReducers/setValidations";

const CosmosDBIcon = Loadable({
  loader: () => import(/* webpackChunkName: "CosmosdbIcon" */  "../../utils/svgComponents/CosmosdbIcon"),
  loading:() => <div/>
});
const AppServiceIcon = Loadable({
  loader: () => import(/* webpackChunkName: "AppServiceIcon" */  "../../utils/svgComponents/AppserviceIcon"),
  loading:() => <div/>
});
const Reorder = Loadable({
  loader: () => import(/* webpackChunkName: "ReorderIcon" */  "../../utils/svgComponents/ReorderIcon"),
  loading:() => <div/>
});
/**
 * Takes in either a page (type ISelected) or text, but not both
 * If a page is given, then text prop will not be rendered
 */

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

interface ISortableDispatchProps {
  updatePage: (page: ISelected) => any;
}

type Props = IStateProps & ISortablePageListProps & InjectedIntlProps & ISortableDispatchProps;

const DraggableSidebarItem = ({
  text,
  cosmosDB,
  appService,
  idx,
  withIndent,
  handleCloseClick,
  intl,
  customInputStyle,
  updatePage,
  validations,
  selectedPages
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
              [styles.pagesTextContainer]: true,
              [styles.textContainer]: true,
              [styles.largeIndentContainer]: true
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
  selectedPages: state.selection.pages,
  validations: getValidations(state)
});

const mapDispatchToProps = (
  dispatch: ThunkDispatch<AppState, void, RootAction>
): ISortableDispatchProps => ({
  updatePage: (page: ISelected) => {
    dispatch(selectPageAction(page));
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(injectIntl(DraggableSidebarItem));
