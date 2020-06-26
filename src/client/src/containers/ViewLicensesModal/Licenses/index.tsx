import * as React from "react";
import ReactMarkdown from "react-markdown";
import { connect, useSelector } from "react-redux";
import {
  getFrameworkLicensesSelector,
  getPageLicencesSelector
} from "../../../store/userSelection/frameworksLicenseSelector";
import { ILicenseObject } from "../../../types/license";

import styles from "./styles.module.css";
import { injectIntl, InjectedIntlProps } from "react-intl";

import { AppState } from "../../../store/combineReducers";
import { IVisitedPages, getIsVisitedRoutesSelector } from "../../../store/config/config/wizardNavigationSelector";
import { getGenerationData } from "../../../store/userSelection/app/selector";
import { getAllLicenses } from "../../../utils/extensionService/extensionService";
import { AppContext } from "../../../AppContext";

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
  const { vscode } = React.useContext(AppContext);
  const generationData = useSelector(getGenerationData);
  const [licenses, setLicenses] = React.useState("pte");
  getAllLicenses(generationData, vscode).then(()=>{
    setLicenses("resolved");
  });

  const LinkRenderer = (props: any) => {
    return (
      <a
        className={styles.licenseButton}
        href={String(props.href)}
        target={"_blank"}
        rel="noreferrer noopener"
      >
        {props.children} 
        -- {licenses}
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
