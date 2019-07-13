import React, { Component } from "react";
import { connect } from "react-redux";
import { ThunkDispatch } from "redux-thunk";
import { RouteComponentProps, withRouter } from "react-router";

import RootAction from "../../actions/ActionType";
import { selectFrontendFramework as selectFrontendAction } from "../../actions/wizardSelectionActions/selectFrontEndFramework";
import { selectBackendFrameworkAction } from "../../actions/wizardSelectionActions/selectBackEndFramework";
import { selectPagesAction } from "../../actions/wizardSelectionActions/selectPages";
import { setVisitedWizardPageAction } from "../../actions/wizardInfoActions/setVisitedWizardPage";

import { getVSCodeApiSelector } from "../../selectors/vscodeApiSelector";
import { isValidNameAndProjectPathSelector } from "../../selectors/wizardSelectionSelector";

import { AppState } from "../../reducers";
import { IVSCodeObject } from "../../reducers/vscodeApiReducer";

import { ISelected } from "../../types/selected";

import {
  EXTENSION_MODULES,
  EXTENSION_COMMANDS,
  WIZARD_CONTENT_INTERNAL_NAMES,
  ROUTES,
  ROUTES_ARRAY
} from "../../utils/constants";

interface IStateProps {
  vscode: IVSCodeObject;
  isPreview: boolean;
  isValidNameAndProjectPath: boolean;
}

interface IDispatchProps {
  selectFrontendFramework: (framework: ISelected) => void;
  selectBackendFramework: (backendFramework: ISelected) => void;
  selectPages: (pages: ISelected[]) => void;
  setRouteVisited: (route: string) => void;
}

type Props = IStateProps & IDispatchProps & RouteComponentProps;

const FRONT_END_SELECTION: ISelected = {
  author: "Facebook",
  internalName: "ReactJS",
  licenses:
    "[ReactJS](https://github.com/facebook/react/blob/master/LICENSE)  \n[Create React App](https://github.com/facebook/create-react-app/blob/master/LICENSE)",
  title: "React",
  version: "v16.8.4"
};

const BACK_END_SELECTION: ISelected = {
  author: "Various",
  internalName: "NodeJS",
  licenses:
    "[NodeJS](https://github.com/nodejs/node/blob/master/LICENSE)  \n[ExpressJS](https://github.com/expressjs/express/blob/master/LICENSE)  \n[ExpressJS Generator](https://github.com/expressjs/generator/blob/master/LICENSE)",
  title: "Node.js/Express",
  version: "v10.15.0"
};

const PAGES_SELECTION: ISelected[] = [
  {
    title: "Blank",
    internalName: "wts.Page.React.Blank",
    id: "Blank",
    defaultName: "Blank",
    isValidTitle: true,
    licenses: [
      {
        text: "Bootstrap",
        url: "https://github.com/twbs/bootstrap/blob/master/LICENSE"
      }
    ],
    author: "Microsoft"
  }
];

class QuickStart extends Component<Props> {
  constructor(props: Props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    const {
      vscode,
      isPreview,
      selectFrontendFramework,
      selectBackendFramework,
      selectPages,
      history,
      setRouteVisited
    } = this.props;
    // Get All Frameworks
    vscode.postMessage({
      module: EXTENSION_MODULES.CORETS,
      command: EXTENSION_COMMANDS.GET_FRAMEWORKS,
      payload: {
        isPreview: isPreview,
        projectType: WIZARD_CONTENT_INTERNAL_NAMES.FULL_STACK_APP
      }
    });

    // Get All Pages
    vscode.postMessage({
      module: EXTENSION_MODULES.CORETS,
      command: EXTENSION_COMMANDS.GET_PAGES,
      payload: {
        projectType: WIZARD_CONTENT_INTERNAL_NAMES.FULL_STACK_APP,
        frontendFramework: FRONT_END_SELECTION.internalName,
        backendFramework: BACK_END_SELECTION.internalName
      }
    });
    selectFrontendFramework(FRONT_END_SELECTION);
    selectBackendFramework(BACK_END_SELECTION);
    selectPages(PAGES_SELECTION);
    ROUTES_ARRAY.forEach(route => setRouteVisited(route));
    history.push(ROUTES.REVIEW_AND_GENERATE);
  }

  render() {
    const { isValidNameAndProjectPath } = this.props;
    return (
      <button onClick={this.handleClick} disabled={!isValidNameAndProjectPath}>
        {" "}
        Quick Start{" "}
      </button>
    );
  }
}

interface IStateProps {
  vscode: IVSCodeObject;
  isPreview: boolean;
}

const mapStateToProps = (state: AppState): IStateProps => {
  const { previewStatus } = state.wizardContent;
  return {
    isPreview: previewStatus,
    vscode: getVSCodeApiSelector(state),
    isValidNameAndProjectPath: isValidNameAndProjectPathSelector(state)
  };
};

const mapDispatchToProps = (
  dispatch: ThunkDispatch<AppState, void, RootAction>
): IDispatchProps => ({
  selectFrontendFramework: (framework: ISelected) => {
    dispatch(selectFrontendAction(framework));
  },
  selectBackendFramework: (backendFramework: ISelected) => {
    dispatch(selectBackendFrameworkAction(backendFramework));
  },
  selectPages: (pages: ISelected[]) => {
    dispatch(selectPagesAction(pages));
  },
  setRouteVisited: (route: string) => {
    dispatch(setVisitedWizardPageAction(route));
  }
});

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(QuickStart)
);
