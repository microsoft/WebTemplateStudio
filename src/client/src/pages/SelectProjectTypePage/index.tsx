import * as React from "react";
import { connect } from "react-redux";
import { InjectedIntlProps, injectIntl } from "react-intl";

import { mapStateToProps } from "./store";
import { IStoreProps } from "./interfaces";
import pageStyles from "../pageStyles.module.css";

import ProjectTypeCard from "./ProjectTypeCard";
import messages from "./messages";

type Props = IStoreProps & InjectedIntlProps;

const SelectProjectTypePage = (props: Props) => {
  const { options, intl } = props;
  //TOOD: THIS options VS SELECTOR
  // const projectTypesOptions = useSelector((state: AppState) => state.templates.projectTypesOptions);
  // {projectTypesOptions.map((projectType, index) => {

  return (
    <div>
      <h1 className={pageStyles.title}>{intl.formatMessage(messages.header)}</h1>

      <div className={pageStyles.flexContainer}>
        {options.map((projectType, index) => {
          return <ProjectTypeCard key={index} projectType={projectType} />;
        })}
      </div>
    </div>
  );
};

export default connect(mapStateToProps)(injectIntl(SelectProjectTypePage));
