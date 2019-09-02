import classnames from "classnames";
import * as React from "react";
import ReactMarkdown from "react-markdown";
import { connect } from "react-redux";
import { ThunkDispatch } from "redux-thunk";

import { AppState } from "../../reducers";
import RootAction from "../../actions/ActionType";
import { openRedirectModalAction } from "../../actions/modalActions/modalActions";

import { ReactComponent as BackArrow } from "../../assets/backarrow.svg";
import { getSvg } from "../../utils/getSvgUrl";

import styles from "./styles.module.css";
import grid from "../../css/grid.module.css";
import backArrow from "../../assets/backarrow.svg";
import { KEY_EVENTS } from "../../utils/constants";

import { IOption } from "../../types/option";
import { ILicenseObject, License } from "../../types/license";
import { IRedirectModalData } from "../RedirectModal";

import {
  injectIntl,
  defineMessages,
  InjectedIntl,
  FormattedMessage
} from "react-intl";
import { format } from "path";

interface IDispatchProps {
  openRedirectModal: (license: IRedirectModalData | undefined) => any;
}

interface IProps {
  detailInfo: IOption;
  formatteDetailInfo?: IOption;
  handleBackClick: () => void;
  intl: InjectedIntl;
}

type Props = IProps & IDispatchProps;

const messages = defineMessages({
  none: {
    id: "details.none",
    defaultMessage: "None"
  },
  redirectLabel: {
    id: "licenses.redirectLinkLabel",
    defaultMessage: "{redirectLabel}"
  },
  genericRedirect: {
    id: "redirectLabel.generic",
    defaultMessage: "here"
  }
});

const Details = ({
  detailInfo,
  formatteDetailInfo,
  handleBackClick,
  intl,
  openRedirectModal
}: Props) => {
  const LinkRenderer = (props: any) => {
    const genericRedirect: string = intl.formatMessage(
      messages.genericRedirect
    );
    const redirectLinkLabel =
      props.children[0].props.value === genericRedirect
        ? props.href
        : `${props.children[0].props.value} license link`;
    return (
      <button
        className={styles.licenseButton}
        onClick={() =>
          openRedirectModal({
            redirectLink: String(props.href),
            redirectLinkLabel: intl.formatMessage(messages.redirectLabel, {
              redirectLabel: redirectLinkLabel
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
  const ParagraphRenderer = (props: any) => (
    <React.Fragment>
      <p className={styles.longDescription}>{props.children}</p>
      <br />
    </React.Fragment>
  );
  const keyDownHandler = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === KEY_EVENTS.ENTER || event.key === KEY_EVENTS.SPACE) {
      handleBackClick();
    }
  };
  const renderFormattedData = (
    info: string | FormattedMessage.MessageDescriptor | undefined,
    isMarkdown: boolean,
    isAuthorOrVersion?: boolean
  ) => {
    if (isAuthorOrVersion) {
      return (
        <ReactMarkdown
          source={info as string}
          renderers={{ link: LinkRenderer, paragraph: ParagraphRenderer }}
        />
      );
    }
    if (formatteDetailInfo) {
      if (isMarkdown) {
        return (
          <ReactMarkdown
            source={intl.formatMessage(
              info as FormattedMessage.MessageDescriptor
            )}
            renderers={{ link: LinkRenderer, paragraph: ParagraphRenderer }}
          />
        );
      }
      return intl.formatMessage(info as FormattedMessage.MessageDescriptor);
    }
    if (isMarkdown) {
      return (
        <ReactMarkdown
          source={info as string}
          renderers={{ link: LinkRenderer, paragraph: ParagraphRenderer }}
        />
      );
    } else {
      return info;
    }
  };

  return (
    <React.Fragment>
      <div className={styles.container}>
        <div className={styles.backContainer}>
          <div
            role="button"
            tabIndex={0}
            onClick={handleBackClick}
            onKeyDown={keyDownHandler}
            className={styles.innerBackContainer}
          >
            {backArrow && <BackArrow className={styles.backIcon} />}
            <div className={styles.details}>
              <FormattedMessage id="details.back" defaultMessage="Back" />
            </div>
          </div>
        </div>
        <div className={styles.headerContainer}>
          {detailInfo.internalName &&
            (getSvg(detailInfo.internalName, styles.icon) || (
              <img className={styles.icon} src={detailInfo.svgUrl} alt="" />
            ))}
          <div className={styles.detailsTitle}>
            {renderFormattedData(detailInfo.title, false)}
          </div>
        </div>
        <div className={styles.detailsContainer}>
          <div className={styles.spacer} />
          <div>
            <div className={styles.detailsDescription}>
              {renderFormattedData(detailInfo.longDescription, true)}
            </div>
            <div>
              {detailInfo.author && (
                <div className={classnames(styles.metaData, grid.row)}>
                  <div className={classnames(styles.category, styles.colWidth)}>
                    <FormattedMessage
                      id="details.author"
                      defaultMessage="Author:"
                    />
                  </div>
                  {(detailInfo.author &&
                    renderFormattedData(detailInfo.author, false, true)) ||
                    intl!.formatMessage(messages.none)}
                </div>
              )}
            </div>
            <div>
              {detailInfo.licenses && (
                <div className={classnames(styles.metaData)}>
                  <div
                    className={classnames(
                      styles.licenseCategory,
                      styles.colWidth
                    )}
                  >
                    <FormattedMessage
                      id="details.licenses"
                      defaultMessage="Licenses:"
                    />
                  </div>
                  <div className={classnames(grid.col8, styles.licenses)}>
                    {Array.isArray(detailInfo.licenses)
                      ? detailInfo.licenses.map(
                          (license: License, idx: number) => {
                            const licenseObject = license as ILicenseObject;
                            return (
                              <p key={license + idx.toString()}>
                                <button
                                  className={styles.licenseButton}
                                  onClick={() =>
                                    openRedirectModal({
                                      redirectLink: String(licenseObject.url),
                                      redirectLinkLabel: intl.formatMessage(
                                        messages.redirectLabel,
                                        {
                                          redirectLabel: `${
                                            licenseObject.text
                                          } license link`
                                        }
                                      ),
                                      privacyStatementLink: "",
                                      isThirdPartyLink: true
                                    })
                                  }
                                  key={licenseObject.text}
                                >
                                  {licenseObject.text}
                                </button>
                              </p>
                            );
                          }
                        )
                      : (
                          <ReactMarkdown
                            source={detailInfo.licenses}
                            renderers={{ link: LinkRenderer }}
                          />
                        ) || intl!.formatMessage(messages.none)}
                  </div>
                </div>
              )}
              {detailInfo.version && (
                <div className={classnames(styles.metaData, grid.row)}>
                  <div className={classnames(styles.category, styles.colWidth)}>
                    <FormattedMessage
                      id="details.version"
                      defaultMessage="Version:"
                    />
                  </div>
                  {renderFormattedData(detailInfo.version, true, true)}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

const mapDispatchToProps = (
  dispatch: ThunkDispatch<AppState, void, RootAction>
): IDispatchProps => ({
  openRedirectModal: license => {
    dispatch(openRedirectModalAction(license));
  }
});

export default connect(
  null,
  mapDispatchToProps
)(injectIntl(Details));
