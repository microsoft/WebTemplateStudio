import * as React from "react";
import { connect } from "react-redux";
import { injectIntl } from "react-intl";

import {
  EXTENSION_MODULES,
  EXTENSION_COMMANDS,
  WIZARD_CONTENT_INTERNAL_NAMES
} from "../../utils/constants";
import messages from "./messages";
import PageCard from "./PageCard";
import styles from "./styles.module.css";
import classnames from "classnames";
import Notification from "../../components/Notification";
import { ISelectProps, IDispatchProps, IIntlProps } from "./interfaces";
import { mapDispatchToProps, mapStateToProps} from "./store";

type Props = IDispatchProps & ISelectProps & IIntlProps;

//class PageAddPages extends React.Component<Props> {
const PageAddPages = (props:Props) => {
  const { selectedBackend, selectedFrontend, vscode, options, intl, selectedPages } = props;
  const [pageOutOfBounds, setPageOutOdBounds] = React.useState(false);

  React.useEffect(()=>{
    getPages();
  },[]);

  React.useEffect(()=>{
    if (options.length===0) getPages();
  },[selectedBackend,selectedFrontend]);

  React.useEffect(()=>{
    const limitPages=20;
    setPageOutOdBounds(selectedPages.length == limitPages);
  },[selectedPages]);

  const getPages = () =>{
    vscode.postMessage({
      module: EXTENSION_MODULES.CORETS,
      command: EXTENSION_COMMANDS.GET_PAGES,
      payload: {
        projectType: WIZARD_CONTENT_INTERNAL_NAMES.FULL_STACK_APP,
        frontendFramework: selectedFrontend.internalName,
        backendFramework: selectedBackend.internalName
      }
    });
  }

  return (
    <div>
      <h1 className={styles.title}>Select a front-end framework</h1>
      <div
          className={classnames(styles.description, {
            [styles.borderGreen]: !pageOutOfBounds,
            [styles.borderYellow]: pageOutOfBounds
          })}
        >
        <Notification
          showWarning={pageOutOfBounds}
          text={"Max 20 pages can be selected"}
          altMessage={intl.formatMessage(messages.iconAltMessage)}
        />
      </div>
      <div className={styles.flexContainer}>
        {options.map((option)=>{
          return (<PageCard page={option}/>)
        })}
      </div>
    </div>
  );
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(injectIntl(PageAddPages));
