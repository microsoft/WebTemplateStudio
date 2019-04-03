import classnames from "classnames";
import * as React from "react";
import ReactMarkdown from "react-markdown";

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
  handleBackClick: () => void;
  intl?: InjectedIntl;
}

const messages = defineMessages({
  none: {
    id: "details.none",
    defaultMessage: "None"
  }
});

const Details = ({ detailInfo, handleBackClick, intl }: IProps) => {
  return (
    <React.Fragment>
      <div className={styles.container}>
        <div className={styles.backContainer}>
          <div>
            {backArrow && (
              <img
                onClick={handleBackClick}
                className={styles.backIcon}
                src={process.env.REACT_APP_RELATIVE_PATH + backArrow}
              />
            )}
          </div>
          <div className={styles.details} onClick={handleBackClick}>
            <FormattedMessage id="details.back" defaultMessage="Back" />
          </div>
        </div>
        <div className={styles.detailsContainer}>
          <div>
            {detailInfo.svgUrl && (
              <img className={styles.icon} src={detailInfo.svgUrl} />
            )}
          </div>
          <div>
            <div className={styles.detailsTitle}>{detailInfo.title}</div>
            <div className={styles.detailsDescription}>
              <ReactMarkdown source={detailInfo.longDescription} />
            </div>
            <div>
              <div className={classnames(styles.metaData, grid.row)}>
                <div className={classnames(styles.category, grid.col4)}>
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
            </div>
            <div>
              <div className={classnames(styles.metaData, grid.row)}>
                <div className={classnames(styles.licenseCategory, grid.col4)}>
                  <FormattedMessage
                    id="details.licenses"
                    defaultMessage="Version:"
                  />
                </div>
                <div className={classnames(grid.col8, styles.licenses)}>
                  {Array.isArray(detailInfo.licenses)
                    ? detailInfo.licenses.map((license: License) => {
                        if (license !== typeof "string") {
                          const licenseTemp = license as ILicenseObject;
                          return (
                            <a href={licenseTemp.url}>{licenseTemp.text}</a>
                          );
                        }
                      })
                    : <ReactMarkdown source={detailInfo.licenses} /> ||
                      intl!.formatMessage(messages.none)}
                </div>
                <div>{detailInfo.version || "1.0"}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default injectIntl(Details);
