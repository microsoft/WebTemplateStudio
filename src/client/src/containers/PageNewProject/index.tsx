import * as React from "react";
import { connect } from "react-redux";

import styles from "./styles.module.css";

import { setVisitedWizardPageAction } from "../../actions/wizardInfoActions/setVisitedWizardPage";
import ProjectNameAndOutput from "./ProjectNameAndOutput";
import QuickStart from "./QuickStart";
import { FormattedMessage } from "react-intl";
import { getVSCodeApiSelector } from "../../selectors/vscodeApiSelector";
import { AppState } from "../../reducers";
import { Dispatch } from "redux";
import RootAction from "../../actions/ActionType";
import { IOption } from "../../types/option";
import { setBackendFrameworksAction } from "../../actions/wizardContentActions/setBackendFrameworks";
import { setFrontendFrameworksAction } from "../../actions/wizardContentActions/setFrontendFrameworks";
import { getFrameworks } from "../../utils/extensionService/extensionService";
import { parseFrameworksPayload } from "../../utils/parseFrameworksPayload";
import { FRAMEWORK_TYPE } from "../../utils/constants";

interface IDispatchProps {
  setRouteVisited: (route: string) => any;
  setBackendFrameworks: (frameworks: IOption[]) => any;
  setFrontendFrameworks: (frameworks: IOption[]) => any;
}

interface IStateProps {
  vscode: any;
  isPreview: boolean;
}

type Props = IStateProps & IDispatchProps;

const NewProject = (props: Props) => {
  const { vscode, isPreview, setFrontendFrameworks, setBackendFrameworks } = props;
  setTimeout(getFrameworksListAndSetToStore,500);

  function getFrameworksListAndSetToStore(){
    getFrameworks(vscode, isPreview).then((event:any)=>{
      let message = event.data;
      setFrontendFrameworks(
        parseFrameworksPayload(
          message.payload.frameworks,
          FRAMEWORK_TYPE.FRONTEND,
          message.payload.isPreview
        )
      );
      setBackendFrameworks(
        parseFrameworksPayload(
          message.payload.frameworks,
          FRAMEWORK_TYPE.BACKEND,
          message.payload.isPreview
        )
      );
    });
  }

  return (
    <div className={styles.container}>
      <div className={styles.newProjectInfo}>
        <h1 className={styles.header}>
          <FormattedMessage
            id="newProject.header"
            defaultMessage="Create Your Web App in Seconds"
          />
        </h1>
        <div className={styles.body}>
          <FormattedMessage
            id="newProject.body"
            defaultMessage="Give your full-stack project a name, choose where to create it, then click 'Next' to get started."
          />
        </div>
        <div className={styles.projectDetailsContainer}>
          <ProjectNameAndOutput />
        </div>
        <div className={styles.quickStartContainer}>
          <QuickStart />
        </div>
      </div>
    </div>
  );
};

const mapDispatchToProps = (
  dispatch: Dispatch<RootAction>
): IDispatchProps => ({
  setRouteVisited: (route: string) => {
    dispatch(setVisitedWizardPageAction(route));
  },
  setBackendFrameworks: (frameworks: IOption[]) => {
    dispatch(setBackendFrameworksAction(frameworks));
  },
  setFrontendFrameworks: (frameworks: IOption[]) => {
    dispatch(setFrontendFrameworksAction(frameworks));
  }
});

const mapStateToProps = (state: AppState): IStateProps => ({
  vscode: getVSCodeApiSelector(state),
  isPreview:  state.wizardContent.previewStatus
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NewProject);
