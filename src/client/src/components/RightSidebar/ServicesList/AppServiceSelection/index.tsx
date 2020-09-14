import * as React from "react";
import { useDispatch } from "react-redux";
import SidebarItem from "../SidebarItem";
import { IAppService } from "../../../../store/userSelection/services/appService/model";
import { ReactComponent as EditIcon } from "../../../../assets/edit.svg";
import styles from "./styles.module.css";
import { injectIntl, InjectedIntlProps } from "react-intl";
import { removeAppServiceAction } from "../../../../store/userSelection/services/appService/action";
import { openAppServiceModalAction } from "../../../../store/navigation/modals/action";
import messages from "./messages";

interface IProps {
  appServiceSelection: IAppService | null;
}

type Props = IProps & InjectedIntlProps;

const AppServiceSelection = ({
  appServiceSelection,
  intl
}: Props) => {
  const dispatch = useDispatch();


  return (
    <React.Fragment>
      {appServiceSelection && (
        <React.Fragment>
          <div className={styles.headerContainer}>
            <div>{intl.formatMessage(messages.title)}</div>
          </div>
          <SidebarItem
            appService={true}
            editable={false}
            configurable={true}
            customInputStyle={styles.input}
            key={appServiceSelection.siteName}
            text={appServiceSelection.siteName}
            withIndent={true}
            handleCloseClick={() => dispatch(removeAppServiceAction())}
            handleConfigClick={() => dispatch(openAppServiceModalAction())}
            idx={1}
          />
        </React.Fragment>
      )}
    </React.Fragment>
  );
};

export default injectIntl(AppServiceSelection);