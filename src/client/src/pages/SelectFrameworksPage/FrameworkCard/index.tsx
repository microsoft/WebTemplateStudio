import classNames from "classnames";
import * as React from "react";
import { connect, useDispatch } from "react-redux";
import { ISelectProps, IStateProps } from "./interfaces";
import { mapStateToProps } from "./store";
import DependencyInfo from "./DependencyInfo";
import messages from "./messages";
import { KEY_EVENTS, ROUTE } from "../../../utils/constants/constants";
import { injectIntl, InjectedIntlProps } from "react-intl";
import { ReactComponent as Check } from "../../../assets/check.svg";
import { getLatestVersion } from "../../../utils/extensionService/extensionService";
import { AppContext } from "../../../AppContext";
import { updateFrameworksAction } from "../../../store/templates/frameworks/action";
import { IOption } from "../../../types/option";
import {
  setSelectedBackendFrameworkAction,
  setSelectedFrontendFrameworkAction,
} from "../../../store/userSelection/frameworks/action";
import { setDetailPageAction } from "../../../store/config/detailsPage/action";
import Icon from "../../../components/Icon";

import styles from "./styles.module.css";
import cardStyles from "../../cardStyles.module.css";
import buttonStyles from "../../../css/button.module.css";

type Props = ISelectProps & IStateProps & InjectedIntlProps;

const FrameworkCard = (props: Props) => {
  const { framework, frontEndSelect, backEndSelect, isFrontEnd, intl } = props;

  const [selected, setSelected] = React.useState(false);
  const [latestVersion, setLatestVersion] = React.useState(framework.latestVersion);
  const { vscode } = React.useContext(AppContext);
  const dispatch = useDispatch();

  React.useEffect(() => {
    selectWhenLoadWithoutSelection();
    if (!framework.latestVersionLoaded) {
      getLatestVersion(vscode, framework.checkVersionPackage).then((latestVersionValidation: boolean) => {
        framework.latestVersion = latestVersionValidation;
        framework.latestVersionLoaded = true;
        dispatch(updateFrameworksAction([framework]));
        setLatestVersion(latestVersionValidation);
      });
    }
  }, []);

  React.useEffect(() => {
    if (isFrontEnd) setSelected(frontEndSelect.internalName === framework.internalName);
  }, [frontEndSelect]);

  React.useEffect(() => {
    if (!isFrontEnd) setSelected(backEndSelect.internalName === framework.internalName);
  }, [backEndSelect]);

  const setDetailPage = (detailPageInfo: IOption) => {
    dispatch(setDetailPageAction(detailPageInfo, false, ROUTE.SELECT_FRAMEWORKS));
  };
  const selectWhenLoadWithoutSelection = () => {
    const frameworkSelectableFirstTime = isFrontEnd
      ? frontEndSelect.internalName === "" && framework.internalName === "React"
      : backEndSelect.internalName === "" && framework.internalName === "Node";

    if (frameworkSelectableFirstTime) selectCard();
  };

  const selectCard = () => {
    const { title, internalName, licenses, author, version, icon } = framework;
    const shorthandVersionLabel = `v${version || "1.0"}`;
    const selectedFramework = {
      internalName,
      icon,
      title: title as string,
      version: shorthandVersionLabel,
      licenses,
      author,
    };
    if (isFrontEnd) {
      dispatch(setSelectedFrontendFrameworkAction(selectedFramework));
    } else {
      dispatch(setSelectedBackendFrameworkAction(selectedFramework));
    }
  };

  const selectCardIfEnterOrSpace = (event: React.KeyboardEvent<HTMLDivElement>) => {
    const isSelectableCard = event.key === KEY_EVENTS.ENTER || event.key === KEY_EVENTS.SPACE;
    if (isSelectableCard) {
      event.preventDefault();
      selectCard();
    }
  };

  const showMoreInfo = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent> | React.KeyboardEvent<HTMLButtonElement>
  ) => {
    event.stopPropagation();
    setDetailPage(framework);
  };

  const showMoreInfoIfEnterOrSpace = (event: React.KeyboardEvent<HTMLButtonElement>) => {
    const isPressed = event.key === KEY_EVENTS.ENTER || event.key === KEY_EVENTS.SPACE;
    if (isPressed) {
      event.preventDefault();
      showMoreInfo(event);
    }
  };

  return (
    <div
      role="button"
      tabIndex={0}
      onClick={selectCard}
      onKeyDown={selectCardIfEnterOrSpace}
      className={classNames(cardStyles.container, cardStyles.boundingBox, {
        [cardStyles.selected]: selected,
      })}
    >
      <div>
        <div className={cardStyles.gridLayoutCardHeader}>
          <div>{framework.internalName && <Icon name={framework.internalName} icon={framework.icon} />}</div>
          <div className={classNames(cardStyles.title)}>{framework.title}</div>
        </div>

        <div className={styles.gridLayoutVersion}>
          <div className={cardStyles.version}>v{framework.version}</div>
          {latestVersion === framework.version && <div className={styles.latestVersion}>(Latest)</div>}
        </div>
        <div className={styles.description}>{framework.body}</div>
        <div className={cardStyles.DependencyInfo}>
          {selected && !framework.requirement?.isInstalled && <DependencyInfo requirement={framework.requirement} />}
        </div>
        <div className={cardStyles.gridLayoutCardFooter}>
          <div>
            <button
              onClick={showMoreInfo}
              onKeyDown={showMoreInfoIfEnterOrSpace}
              className={buttonStyles.buttonLink}
              tabIndex={0}
            >
              {intl.formatMessage(messages.learnMore)}
            </button>
          </div>
          {selected && <Check role="figure" className={cardStyles.iconCheckMark} />}
        </div>
      </div>
    </div>
  );
};

export default connect(mapStateToProps)(injectIntl(FrameworkCard));
