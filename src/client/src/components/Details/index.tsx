import * as React from "react";

import styles from "./styles.module.css";
import backArrow from "../../assets/backarrow.svg";

import { IOption } from "../../types/option";

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
              {detailInfo.longDescription}
            </div>

            <div className={styles.col}>
              <div className={styles.categoriesContainer}>
                <div>
                  <FormattedMessage
                    id="details.author"
                    defaultMessage="Author:"
                  />
                </div>
                <div>
                  <FormattedMessage
                    id="details.licenses"
                    defaultMessage="Licenses:"
                  />
                </div>
                <div>
                  <FormattedMessage
                    id="details.licenses"
                    defaultMessage="Version:"
                  />
                </div>
              </div>
              <div>
                <div>
                  {detailInfo.author || intl!.formatMessage(messages.none)}
                </div>
                <div>
                  {detailInfo.licenses || intl!.formatMessage(messages.none)}
                </div>
                <div>{detailInfo.version || "v1.0"}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default injectIntl(Details);
