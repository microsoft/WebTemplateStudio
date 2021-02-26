import * as React from "react";
import { InjectedIntlProps, injectIntl } from "react-intl";
import { connect } from "react-redux";

import Title from "../../components/Titles/Title";
import pageStyles from "../pageStyles.module.css";
import { IStoreProps } from "./interfaces";
import messages from "./messages";
import ProjectTypeCard from "./ProjectTypeCard";
import { mapStateToProps } from "./store";

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
