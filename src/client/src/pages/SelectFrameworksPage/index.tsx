import * as React from "react";
import { useSelector } from "react-redux";
import FrameworkCard from "./FrameworkCard";
import { InjectedIntlProps, injectIntl } from "react-intl";
import { AppState } from "../../store/combineReducers";

import messages from "./messages";
import pageStyles from "../pageStyles.module.css";
import Title from "../../components/Title";

type Props = InjectedIntlProps;

const SelectFrameworks = ({ intl }: Props) => {
  const frontendOptions = useSelector((state: AppState) => state.templates.frontendOptions);
  const backendOptions = useSelector((state: AppState) => state.templates.backendOptions);
  const isPreview = useSelector((state: AppState) => state.config.previewStatus);

  return (
    <>
      {frontendOptions.length > 0 && (
        <>
          <Title>{intl.formatMessage(messages.frontendTitle)}</Title>
          <div className={pageStyles.flexContainer}>
            {frontendOptions.map((framework) => {
              if (isPreview || !framework.isPreview) {
                return <FrameworkCard key={framework.internalName} framework={framework} isFrontEnd={true} />;
              }
            })}
          </div>
        </>
      )}
      {backendOptions.length > 0 && (
        <>
          <Title>{intl.formatMessage(messages.backendTitle)}</Title>
          <div className={pageStyles.flexContainer}>
            {backendOptions.map((framework) => {
              if (isPreview || !framework.isPreview) {
                return <FrameworkCard key={framework.internalName} framework={framework} isFrontEnd={false} />;
              }
            })}
          </div>
        </>
      )}
    </>
  );
};

export default injectIntl(SelectFrameworks);
