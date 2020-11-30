import * as React from "react";
import { useSelector } from "react-redux";
import { InjectedIntlProps, injectIntl } from "react-intl";
import { AppState } from "../../store/combineReducers";

import ProjectTypeCard from "./ProjectTypeCard";

import messages from "./messages";
import pageStyles from "../pageStyles.module.css";

type Props = InjectedIntlProps;

const SelectProjectTypePage = ({ intl }: Props) => {
  const projectTypesOptions = useSelector((state: AppState) => state.templates.projectTypesOptions);

  return (
    <div>
      <h1 className={pageStyles.title}>{intl.formatMessage(messages.header)}</h1>

      <div className={pageStyles.flexContainer}>
        {projectTypesOptions.map((projectType, index) => {
          return <ProjectTypeCard key={index} projectType={projectType} />;
        })}
      </div>
    </div>
  );
};

export default injectIntl(SelectProjectTypePage);
