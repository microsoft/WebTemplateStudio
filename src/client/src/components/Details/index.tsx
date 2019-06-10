import classnames from "classnames";
import * as React from "react";
import ReactMarkdown from "react-markdown";

import { ReactComponent as BackArrow } from "../../assets/backarrow.svg";
import { getSvg } from "../../utils/getSvgUrl";

import styles from "./styles.module.css";
import grid from "../../css/grid.module.css";
import backArrow from "../../assets/backarrow.svg";

import { IOption } from "../../types/option";
import { ILicenseObject, License } from "../../types/license";

import {
  injectIntl,
  defineMessages,
  InjectedIntl,
  FormattedMessage
} from "react-intl";

interface IProps {
  detailInfo: IOption;
  formatteDetailInfo?: IOption;
  handleBackClick: () => void;
  intl: InjectedIntl;
}

const messages = defineMessages({
  none: {
    id: "details.none",
    defaultMessage: "None"
  }
});

const Details = ({
  detailInfo,
  formatteDetailInfo,
  handleBackClick,
  intl
}: IProps) => {
  const LinkRenderer = (props: any) => (
    <a href={props.href} className={styles.link}>
      {props.children}
    </a>
  );
  const ParagraphRenderer = (props: any) => (
    <React.Fragment>
      <p className={styles.longDescription}>{props.children}</p>
      <br />
    </React.Fragment>
  );
  const keyDownHandler = (event: any) => {
    if (event.keyCode === 13 || event.keyCode === 32) {
      handleBackClick();
    }
  };
  const renderFormattedData = (
    info: string | FormattedMessage.MessageDescriptor | undefined,
    isMarkdown: boolean
  ) => {
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
                  <div className={grid.col8}>
                    {<ReactMarkdown source={detailInfo.author} /> ||
                      intl!.formatMessage(messages.none)}
                  </div>
                </div>
              )}
            </div>
            <div>
              {detailInfo.licenses && (
                <div className={classnames(styles.metaData, grid.row)}>
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
                                <a
                                  className={styles.link}
                                  href={licenseObject.url}
                                >
                                  {licenseObject.text}
                                </a>
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
                  <div className={grid.col8}>
                    <ReactMarkdown source={detailInfo.version} />
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default injectIntl(Details);
