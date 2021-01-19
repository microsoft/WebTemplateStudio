import * as React from "react";
import { connect } from "react-redux";
import { InjectedIntlProps, injectIntl } from "react-intl";

import { mapStateToProps } from "./store";
import { IStoreProps } from "./interfaces";
import pageStyles from "../pageStyles.module.css";

import ProjectTypeCard from "./ProjectTypeCard";
import messages from "./messages";
import Title from "../../components/Titles/Title";

type Props = IStoreProps & InjectedIntlProps;

const SelectProjectTypePage = (props: Props) => {
  const { options, intl } = props;

  return (
    <div>
      <Title>{intl.formatMessage(messages.header)}</Title>

      <div className={pageStyles.flexContainer}>
        {options.map((projectType, index) => {
          return <ProjectTypeCard key={index} projectType={projectType} />;
        })}
      </div>
    </div>
  );
};

export default connect(mapStateToProps)(injectIntl(SelectProjectTypePage));
