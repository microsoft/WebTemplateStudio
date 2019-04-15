import * as React from "react";
import ReactMarkdown from "react-markdown";
import { connect } from "react-redux";
import {
  getFrameworkLicensesSelector,
  getPageLicencesSelector
} from "../../selectors/licenseSelector";
import { ILicenseObject } from "../../types/license";

import styles from "./styles.module.css";
import {
  getIsVisitedRoutesSelector,
  IVisitedPages
} from "../../selectors/wizardNavigationSelector";

interface IStateProps {
  frameworkLicenses: string[];
  pageLicenses: ILicenseObject[];
  isVisited: IVisitedPages;
}

type Props = IStateProps;

const Licenses = ({ frameworkLicenses, pageLicenses, isVisited }: Props) => {
  const LinkRenderer = (props: any) => {
    return (
      <a href={props.href} className={styles.link}>
        {props.children}
      </a>
    );
  };
  return (
    <div className={styles.container}>
      <div className={styles.title}>Licenses</div>
      {frameworkLicenses.map((license: string) => (
        <ReactMarkdown
          key={license}
          source={license}
          renderers={{ link: LinkRenderer }}
        />
      ))}
      {isVisited.showPages &&
        pageLicenses.map((license: ILicenseObject) => (
          <p>
            <a key={license.text} className={styles.link} href={license.url}>
              {license.text}
            </a>
          </p>
        ))}
    </div>
  );
};

const mapStateToProps = (state: any) => ({
  frameworkLicenses: getFrameworkLicensesSelector(state),
  isVisited: getIsVisitedRoutesSelector(state),
  pageLicenses: getPageLicencesSelector(state)
});

export default connect(mapStateToProps)(Licenses);
