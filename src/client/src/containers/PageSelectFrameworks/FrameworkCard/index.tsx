import classNames from "classnames";
import * as React from "react";
import { connect, useDispatch } from "react-redux";
import { ISelectProps, IStateProps } from "./interfaces";
import { mapStateToProps } from "./store";
import styles from "./styles.module.css";
import { getSvg } from "../../../utils/getSvgUrl";
import DependencyInfo from "./DependencyInfo";
import messages from "./messages";
import { KEY_EVENTS } from "../../../utils/constants/constants";
import { injectIntl, InjectedIntlProps } from "react-intl";
import { ReactComponent as Check } from "../../../assets/check.svg";
import { getLatestVersion } from "../../../utils/extensionService/extensionService";
import { AppContext } from "../../../AppContext";
import { updateFrameworksAction } from "../../../store/templates/frameworks/action";
import { IOption } from "../../../types/option";
import { setSelectedBackendFrameworkAction, setSelectedFrontendFrameworkAction } from "../../../store/userSelection/frameworks/action";
import { ROUTE } from "../../../utils/constants/routes";
import { setDetailPageAction } from "../../../store/config/detailsPage/action";

type Props = ISelectProps & IStateProps & InjectedIntlProps;

const FrameworkCard = (props: Props) => {
  const {
    framework,
    frontEndSelect,
    backEndSelect,
    isFrontEnd,
    intl
  } = props;

  const [selected, setSelected] = React.useState(false);
  const [latestVersion, setLatestVersion] = React.useState(framework.latestVersion);
  const { vscode } = React.useContext(AppContext);
  const dispatch = useDispatch();

  React.useEffect(() => {
    selectWhenLoadWithoutSelection();
    if (!framework.latestVersionLoaded) {
      getLatestVersion(vscode, framework.checkVersionPackageName, framework.checkVersionPackageSource).then(
        (latestVersionValidation: boolean) => {
          framework.latestVersion = latestVersionValidation;
          framework.latestVersionLoaded = true;
          dispatch(updateFrameworksAction([framework]));
          setLatestVersion(latestVersionValidation);
        }
      );
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
  }
  const selectWhenLoadWithoutSelection = () => {
    const frameworkSelectableFirstTime = isFrontEnd
      ? frontEndSelect.internalName === "" && framework.internalName === "React"
      : backEndSelect.internalName === "" && framework.internalName === "Node";

    if (frameworkSelectableFirstTime) selectCard();
  };

  const selectCard = () => {
    const { title, internalName, licenses, author, version } = framework;
    const shorthandVersionLabel = `v${version || "1.0"}`;
    const selectedFramework = {
      internalName,
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

  const showDetailIfPressEnterKey = (event: React.KeyboardEvent<HTMLAnchorElement>) => {
    event.stopPropagation();
    if (event.key === KEY_EVENTS.ENTER) {
      setDetailPage(framework);
    }
  };

  const detailsClickWrapper = (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    debugger;
    event.stopPropagation();
    setDetailPage(framework);
  };

  return (
    <div
      role="button"
      tabIndex={0}
      onClick={selectCard}
      onKeyDown={selectCardIfEnterOrSpace}
      className={classNames(styles.container, styles.boundingBox, {
        [styles.selected]: selected,
      })}
    >
      <div>
        <div className={styles.gridLayoutCardHeader}>
          <div>{getSvg(framework.internalName) || (framework.svgUrl && <img src={framework.svgUrl} alt="" />)}</div>
          <div
            className={classNames(styles.title, {
              [styles.titleLeftJustified]: framework.svgUrl === undefined ? true : false,
            })}
          >
            {framework.title}
          </div>
        </div>

        <div className={styles.gridLayoutVersion}>
          <div className={styles.version}>v{framework.version}</div>
          {latestVersion === framework.version && <div className={styles.latestVersion}>(Latest)</div>}
        </div>
        <div className={styles.description}>{framework.body}</div>
        <div className={styles.DependencyInfo}>
          {selected && <DependencyInfo frameworkName={framework.internalName} />}
        </div>
        <div className={styles.gridLayoutCardFooter}>
          <div>
            <a onClick={detailsClickWrapper} onKeyDown={showDetailIfPressEnterKey} className={styles.link} tabIndex={0}>
              {intl.formatMessage(messages.learnMore)}
            </a>
          </div>
          {selected && <Check role="figure" className={styles.iconCheckMark} />}
        </div>
      </div>
    </div>
  );
};

export default connect(mapStateToProps)(injectIntl(FrameworkCard));
