import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import classnames from "classnames";
import { InjectedIntlProps, injectIntl } from "react-intl";
import styles from "./styles.module.css";
import buttonStyles from "../../css/buttonStyles.module.css";
import messages from "./messages";
import { AppState } from "../../store/combineReducers";
import AzureStudent from "./AzureStudent";
import Title from "../../components/Title";
import { azureLogout } from "../../utils/extensionService/extensionService";
import { logOutAzureAction } from "../../store/config/azure/action";
import { AppContext } from "../../AppContext";
import { isLoggedInSelector } from "../../store/config/azure/selector";
import { getServicesByTypeSelector } from "../../store/templates/features/selector";
import ServiceGroup from "./ServiceGroup";

type Props = InjectedIntlProps;

const PageAddServices = ({ intl }: Props) => {
  const { formatMessage } = intl;
  const { vscode } = React.useContext(AppContext);
  const dispatch = useDispatch();
  const email = useSelector((state: AppState) => state.config.azureProfileData.email);
  const isLoggedIn = useSelector((state: AppState) => isLoggedInSelector(state));

  const groupedServices = useSelector(getServicesByTypeSelector);

  const signOutAzure = async () => {
    const event = await azureLogout(vscode);
    if (event.data.payload.success) {
      dispatch(logOutAzureAction());
    }
  };

  const renderServiceGroups = () => {
    const renderElements: any[] = [];
    groupedServices.forEach((services, serviceType) => {
      renderElements.push(<ServiceGroup services={services} serviceType={serviceType} key={serviceType}/>);
    });
    return renderElements;
  };

  return (
    <div className={styles.centerView}>
      <div className={styles.optionalBox}>{formatMessage(messages.optionalBoxMessage)}</div>
      <div className={classnames(styles.container)}>
        <div className={styles.logInInfoBar}>
          <Title>{formatMessage(messages.title)}</Title>
          {isLoggedIn && (
            <div className={styles.azureProfile}>
              {email}
              <button className={classnames(buttonStyles.buttonLink, styles.signOutButton)} onClick={signOutAzure}>
                {intl.formatMessage(messages.signOut)}
              </button>
            </div>
          )}
        </div>
        {!isLoggedIn && <AzureStudent />}
        <div className={styles.servicesContainer}>
          {renderServiceGroups()}
        </div>
      </div>
    </div>
  );
};

export default injectIntl(PageAddServices);
