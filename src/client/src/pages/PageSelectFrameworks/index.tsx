import * as React from "react";
import { useSelector } from "react-redux";
import FrameworkCard from "./FrameworkCard";
import styles from "./styles.module.css";
import { InjectedIntlProps, injectIntl } from "react-intl";
import messages from "./messages";
import { AppState } from "../../store/combineReducers";

type Props = InjectedIntlProps;

const SelectFrameworks = ({ intl }: Props) => {
  const frontendOptions = useSelector((state: AppState) => state.templates.frontendOptions);
  const backendOptions = useSelector((state: AppState) => state.templates.backendOptions);
  const isPreview = useSelector((state: AppState) => state.config.previewStatus);

  return (
    <>
    {(frontendOptions.length > 0 && (
      <>
      <h1 className={styles.title}>{intl.formatMessage(messages.frontendTitle)}</h1>
      <div className={styles.flexContainer}>
        {frontendOptions.map((framework) => {
          if (isPreview || !framework.isPreview) {
            return <FrameworkCard key={framework.internalName} framework={framework} isFrontEnd={true} />;
          }
        })}
      </div>
      </>
    ))}
    {(backendOptions.length > 0 && (
      <>
      <h1 className={styles.title}>{intl.formatMessage(messages.backendTitle)}</h1>
      <div className={styles.flexContainer}>
        {backendOptions.map((framework) => {
          if (isPreview || !framework.isPreview) {
            return <FrameworkCard key={framework.internalName} framework={framework} isFrontEnd={false} />;
          }
        })}
      </div>
      </>
    ))}
    </>
  );
};

export default injectIntl(SelectFrameworks);
