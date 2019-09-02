import * as React from "react";
import { connect } from "react-redux";

import * as getSvg from "../../utils/getSvgUrl";

import DraggableSidebarItem from "../../components/DraggableSidebarItem";

import { removeAppServiceSettingsAction } from "../../actions/azureActions/appServiceActions";
import { IAppServiceSelection } from "../../reducers/wizardSelectionReducers/services/appServiceReducer";
import { ReactComponent as EditIcon } from "../../assets/edit.svg";

import { openAppServiceModalAction } from "../../actions/modalActions/modalActions";

import styles from "./styles.module.css";
import { KEY_EVENTS } from "../../utils/constants";

import { injectIntl, InjectedIntlProps } from "react-intl";
import { ThunkDispatch } from "redux-thunk";
import { AppState } from "../../reducers";
import RootAction from "../../actions/ActionType";

interface IProps {
  appServiceSelection: IAppServiceSelection;
}

interface IDispatchProps {
  removeAppServiceResource: () => any;
  openAppServiceModalAction: () => any;
}

type Props = IProps & IDispatchProps & InjectedIntlProps;

const AppServiceSelection = ({
  appServiceSelection,
  removeAppServiceResource,
  openAppServiceModalAction,
  intl
}: Props) => {
  const { serviceType } = appServiceSelection.wizardContent;
  const onEditKeyDownHandler = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === KEY_EVENTS.ENTER || event.key === KEY_EVENTS.SPACE) {
      openAppServiceModalAction();
    }
  };
  return (
    <React.Fragment>
      {appServiceSelection.selection && (
        <React.Fragment>
          <div className={styles.headerContainer}>
            <div>{intl.formatMessage(serviceType)}</div>
            <div
              role="button"
              tabIndex={0}
              className={styles.edit}
              onClick={openAppServiceModalAction}
              onKeyDown={onEditKeyDownHandler}
            >
              <EditIcon className={styles.editIcon} />
            </div>
          </div>
          <DraggableSidebarItem
            appService={true}
            customInputStyle={styles.input}
            key={appServiceSelection.selection.siteName}
            text={appServiceSelection.selection.siteName}
            closeSvgUrl={getSvg.getCancelSvg()}
            withIndent={true}
            handleCloseClick={removeAppServiceResource}
            idx={1}
          />
        </React.Fragment>
      )}
    </React.Fragment>
  );
};

const mapDispatchToProps = (
  dispatch: ThunkDispatch<AppState, void, RootAction>
) => ({
  removeAppServiceResource: () => {
    dispatch(removeAppServiceSettingsAction());
  },
  openAppServiceModalAction: () => {
    dispatch(openAppServiceModalAction());
  }
});

export default connect(
  null,
  mapDispatchToProps
)(injectIntl(AppServiceSelection));
