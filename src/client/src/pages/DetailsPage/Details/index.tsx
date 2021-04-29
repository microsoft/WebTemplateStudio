import classnames from "classnames";
import * as React from "react";
import { FormattedMessage, InjectedIntl, injectIntl } from "react-intl";
import ReactMarkdown from "react-markdown";

import { ILicenseObject, License } from "../../../types/license";
import { IOption } from "../../../types/option";
import messages from "./messages";
import styles from "./styles.module.css";

interface IProps {
  detailInfo: IOption;
  formatteDetailInfo?: IOption;
  intl: InjectedIntl;
}

type Props = IProps;

const Details = ({ detailInfo, formatteDetailInfo, intl }: Props) => {
  const LinkRenderer = (props: any) => {
    return (
      <a className={styles.licenseButton} href={String(props.href)} target={"_blank"} rel="noreferrer noopener">
        {props.children}
      </a>
    );
  };
  const ParagraphRenderer = (props: any) => <p className={styles.longDescription}>{props.children}</p>;
  const renderFormattedData = (
    info: string | FormattedMessage.MessageDescriptor | undefined,
    isMarkdown: boolean,
    isAuthorOrVersion?: boolean
  ) => {
    if (isAuthorOrVersion) {
      return <ReactMarkdown source={info as string} renderers={{ link: LinkRenderer, paragraph: ParagraphRenderer }} />;
    }
    if (formatteDetailInfo) {
      if (isMarkdown) {
        return (
          <ReactMarkdown
            source={intl.formatMessage(info as FormattedMessage.MessageDescriptor)}
            renderers={{ link: LinkRenderer, paragraph: ParagraphRenderer }}
          />
        );
      }
      return intl.formatMessage(info as FormattedMessage.MessageDescriptor);
    }
    if (isMarkdown) {
      return <ReactMarkdown source={info as string} renderers={{ link: LinkRenderer, paragraph: ParagraphRenderer }} />;
    } else {
      return info;
    }
  };

  return (
    <>
      <div className={styles.container}>
        <div>{renderFormattedData(detailInfo.longDescription, true)}</div>
        {detailInfo.author && (
          <div className={styles.metaData}>
            <div className={styles.detailSectionLabel}>
              <strong>{intl!.formatMessage(messages.author)}</strong>
            </div>
            {renderFormattedData(detailInfo.author, false, true) || intl!.formatMessage(messages.none)}
          </div>
        )}
        {detailInfo.licenses && detailInfo.licenses.length > 0 && (
          <div className={classnames(styles.metaData)}>
            <div className={styles.detailSectionLabel}>
              <strong>{intl!.formatMessage(messages.licenses)}</strong>
            </div>
            <div className={styles.licenses}>
              {Array.isArray(detailInfo.licenses)
                ? detailInfo.licenses.map((license: License, idx: number) => {
                    const licenseObject = license as ILicenseObject;
                    return (
                      <p key={license + idx.toString()}>
                        <a href={String(licenseObject.url)} target={"_blank"} rel="noreferrer noopener">
                          {licenseObject.text}
                        </a>
                      </p>
                    );
                  })
                : <ReactMarkdown source={detailInfo.licenses} renderers={{ link: LinkRenderer }} /> ||
                  intl!.formatMessage(messages.none)}
            </div>
          </div>
        )}
        {detailInfo.version && (
          <div className={styles.metaData}>
            <div className={styles.detailSectionLabel}>
              <strong>{intl!.formatMessage(messages.version)}</strong>
            </div>
            {renderFormattedData(detailInfo.version, true, true)}
          </div>
        )}
      </div>
    </>
  );
};

export default injectIntl(Details);
