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
import * as ModalActions from "../../actions/modalActions/modalActions";
import { ThunkDispatch } from "redux-thunk";
import RootAction from "../../actions/ActionType";
import { IRedirectModalData } from "../RedirectModal";

interface IStateProps {
  frameworkLicenses: string[];
  pageLicenses: ILicenseObject[];
  isVisited: IVisitedPages;
}

interface IDispatchProps {
  openRedirectModal: (license: IRedirectModalData | undefined) => any;
}

type Props = IStateProps & IDispatchProps & InjectedIntlProps;

const messages = defineMessages({
  redirectLinkLabel: {
    id: "licenses.redirectLinkLabel",
    defaultMessage: "{licenseName} license link"
  }
});

const Licenses = ({
  frameworkLicenses,
  pageLicenses,
  isVisited,
  intl,
  openRedirectModal
}: Props) => {
  const LinkRenderer = (props: any) => {
    return (
      <button
        className={styles.licenseButton}
        onClick={() =>
          openRedirectModal({
            redirectLink: String(props.href),
            redirectLinkLabel: intl.formatMessage(messages.redirectLinkLabel, {
              licenseName: props.children[0].props.value
            }),
            privacyStatementLink: "",
            isThirdPartyLink: true
          })
        }
      >
        {props.children}
      </button>
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
            <button
              className={styles.licenseButton}
              onClick={() =>
                openRedirectModal({
                  redirectLink: String(license.url),
                  redirectLinkLabel: intl.formatMessage(
                    messages.redirectLinkLabel,
                    {
                      licenseName: license.text
                    }
                  ),
                  privacyStatementLink: "",
                  isThirdPartyLink: true
                })
              }
              key={license.text}
            >
              {license.text}
            </button>
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

const mapDispatchToProps = (
  dispatch: ThunkDispatch<AppState, void, RootAction>
): IDispatchProps => ({
  openRedirectModal: license => {
    dispatch(ModalActions.openRedirectModalAction(license));
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(injectIntl(Licenses));
