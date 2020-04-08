import * as React from "react";
import ReactMarkdown from "react-markdown";
import { connect } from "react-redux";
import {
  getFrameworkLicensesSelector,
  getPageLicencesSelector
} from "../../../store/userSelection/frameworksLicenseSelector";
import { ILicenseObject } from "../../../types/license";

import styles from "./styles.module.css";
import { injectIntl, InjectedIntlProps } from "react-intl";
import {
  getIsVisitedRoutesSelector,
  IVisitedPages
} from "../../../store/templates/preview/wizardNavigationSelector";
import { AppState } from "../../../store/combineReducers";

interface IStateProps {
  frameworkLicenses: string[];
  pageLicenses: ILicenseObject[];
  isVisited: IVisitedPages;
}

type Props = IStateProps & InjectedIntlProps;

const Licenses = ({
  frameworkLicenses,
  pageLicenses,
  isVisited
}: Props) => {
  const LinkRenderer = (props: any) => {
    return (
      <a
        className={styles.licenseButton}
        href={String(props.href)}
        target={"_blank"}
        rel="noreferrer noopener"
      >
        {props.children}
      </a>
    );
  };
  return (
    <div className={styles.container}>
      {frameworkLicenses.map((license: string, idx: number) => (
        <ReactMarkdown
          key={`${license} + ${idx}`}
          source={license}
          renderers={{ link: LinkRenderer }}
        />
      ))}
      {isVisited.showPages &&
        pageLicenses.map((license: ILicenseObject) => (
          <p key={license.url}>
            <a
              className={styles.licenseButton}
              href={String(license.url)}
              key={license.text}
              target={"_blank"}
              rel="noreferrer noopener"
            >
              {license.text}
            </a>
          </p>
        ))}
    </div>
  );
};

const mapStateToProps = (state: AppState) => ({
  frameworkLicenses: getFrameworkLicensesSelector(state),
  isVisited: getIsVisitedRoutesSelector(state),
  pageLicenses: getPageLicencesSelector(state)
});

export default connect(
  mapStateToProps
)(injectIntl(Licenses));
