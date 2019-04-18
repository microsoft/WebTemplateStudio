import * as React from "react";
import ReactMarkdown from "react-markdown";
import { connect } from "react-redux";
import {
  getFrameworkLicensesSelector,
  getPageLicencesSelector
} from "../../selectors/licenseSelector";
import { ILicenseObject } from "../../types/license";

import styles from "./styles.module.css";
import { injectIntl, InjectedIntlProps, defineMessages } from "react-intl";
import {
  getIsVisitedRoutesSelector,
  IVisitedPages
} from "../../selectors/wizardNavigationSelector";
import { AppState } from "../../reducers";

interface IStateProps {
  frameworkLicenses: string[];
  pageLicenses: ILicenseObject[];
  isVisited: IVisitedPages;
}

type Props = IStateProps & InjectedIntlProps;

const messages = defineMessages({
  licenses: {
    id: "licenses.licenses",
    defaultMessage: "Licenses"
  }
});

const Licenses = ({
  frameworkLicenses,
  pageLicenses,
  isVisited,
  intl
}: Props) => {
  const LinkRenderer = (props: any) => {
    return (
      <a href={props.href} className={styles.link}>
        {props.children}
      </a>
    );
  };
  return (
    <div className={styles.container}>
      <div className={styles.title}>
        {intl.formatMessage(messages.licenses)}
      </div>
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
            <a key={license.text} className={styles.link} href={license.url}>
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

export default connect(mapStateToProps)(injectIntl(Licenses));
