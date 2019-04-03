import * as React from "react";
import { connect } from "react-redux";

import Input from "../../components/Input";
import OutputPath from "../../components/OutputPath";

import {
  updateOutputPathAction,
  updateProjectNameAction
} from "../../actions/updateProjectNameAndPath";
import {
  getOutputPath,
  getProjectName
} from "../../selectors/wizardSelectionSelector";

import { IVSCodeObject } from "../../reducers/vscodeApiReducer";
import { EXTENSION_COMMANDS } from "../../utils/constants";

import styles from "./styles.module.css";

import { injectIntl, defineMessages, InjectedIntlProps } from "react-intl";

interface IStateProps {
  vscode: IVSCodeObject;
  outputPath: string;
  projectName: string;
}

interface IDispatchProps {
  updateProjectName: (projectName: string) => any;
  updateOutputPath: (outputPath: string) => any;
}

type Props = IStateProps & IDispatchProps & InjectedIntlProps;

const messages = defineMessages({
  projectNameTitle: {
    id: "projectName.projectNameTitle",
    defaultMessage: "Project Name:"
  },
  projectName: {
    id: "projectName.projectName",
    defaultMessage: "Project Name"
  },
  outputPathTitle: {
    id: "projectName.outputPathTitle",
    defaultMessage: "Output Path:"
  },
  outputPath: {
    id: "projectName.outputPath",
    defaultMessage: "Output Path"
  }
});

const ProjectNameAndOutput = (props: Props) => {
  const handleProjectNameChange = (
    e: React.SyntheticEvent<HTMLInputElement>
  ) => {
    const element = e.currentTarget as HTMLInputElement;
    props.updateProjectName(element.value);
  };
  const handleOutputPathChange = (
    e: React.SyntheticEvent<HTMLInputElement>
  ) => {
    const element = e.currentTarget as HTMLInputElement;
    props.updateOutputPath(element.value);
  };
  const handleSaveClick = () => {
    props.vscode.postMessage({
      command: EXTENSION_COMMANDS.GET_OUTPUT_PATH
    });
  };
  return (
    <React.Fragment>
      <div className={styles.inputContainer}>
        <div className={styles.inputTitle}>
          {props.intl.formatMessage(messages.projectNameTitle)}
        </div>
        <Input
          handleChange={handleProjectNameChange}
          value={props.projectName}
          placeholder={props.intl.formatMessage(messages.projectName)}
        />
      </div>
      <div className={styles.inputContainer}>
        <div className={styles.inputTitle}>
          {props.intl.formatMessage(messages.outputPathTitle)}
        </div>
        <div className={styles.outputPathContainer}>
          <OutputPath
            handleChange={handleOutputPathChange}
            handleSaveClick={handleSaveClick}
            value={props.outputPath}
            placeholder={props.intl.formatMessage(messages.outputPath)}
          />
        </div>
      </div>
    </React.Fragment>
  );
};

const mapStateToProps = (state: any): IStateProps => ({
  vscode: state.vscode.vscodeObject,
  outputPath: getOutputPath(state),
  projectName: getProjectName(state)
});

const mapDispatchToProps = (dispatch: any): IDispatchProps => ({
  updateProjectName: (projectName: string) => {
    dispatch(updateProjectNameAction(projectName));
  },
  updateOutputPath: (outputPath: string) => {
    dispatch(updateOutputPathAction(outputPath));
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProjectNameAndOutput);
