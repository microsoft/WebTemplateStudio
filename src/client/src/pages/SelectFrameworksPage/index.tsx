import * as React from "react";
import { InjectedIntlProps, injectIntl } from "react-intl";
import { useSelector } from "react-redux";

import Title from "../../components/Titles/Title";
import { AppState } from "../../store/combineReducers";
import pageStyles from "../pageStyles.module.css";
import FrameworkCard from "./FrameworkCard";
import messages from "./messages";

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
          <div className={pageStyles.flexCardsContainer}>
            {frontendOptions
              .filter((frontend) => isPreview || !frontend.isPreview)
              .map((frontend) => {
                return <FrameworkCard key={frontend.internalName} framework={frontend} isFrontEnd={true} />;
              })}
          </div>
        </>
      )}
      {backendOptions.length > 0 && (
        <>
          <Title>{intl.formatMessage(messages.backendTitle)}</Title>
          <div className={pageStyles.flexCardsContainer}>
            {backendOptions
              .filter((backend) => isPreview || !backend.isPreview)
              .map((backend) => {
                return <FrameworkCard key={backend.internalName} framework={backend} isFrontEnd={false} />;
              })}
          </div>
        </>
      )}
    </>
  );
};

export default injectIntl(SelectFrameworks);
