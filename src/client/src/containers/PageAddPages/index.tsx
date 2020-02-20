import * as React from "react";
import { connect } from "react-redux";
import { injectIntl } from "react-intl";

import messages from "./messages";
import PageCard from "./PageCard";
import styles from "./styles.module.css";
import classnames from "classnames";
import Notification from "../../components/Notification";
import { IStoreProps, IIntlProps, IProps } from "./interfaces";
import { mapStateToProps} from "./store";

type Props = IStoreProps & IIntlProps & IProps;

const PageAddPages = (props: Props) => {
  const { options, intl, isModal, pageOutOfBounds } = props;

  return (
    <div>
      <h1 className={styles.title}>{intl.formatMessage(messages.pagesTitleQuestion)}</h1>
      <div
          className={classnames(styles.description, {
            [styles.borderGreen]: !pageOutOfBounds,
            [styles.borderYellow]: pageOutOfBounds
          })}
        >
        <Notification
          showWarning={pageOutOfBounds}
          text={"Max 20 pages can be selected"}
          altMessage={intl.formatMessage(messages.iconAltMessage)}
        />
      </div>
      <div className={styles.flexContainer}>
        {options.map((option, key)=>{
          return (<PageCard key={key} page={option} isModal={isModal}/>)
        })}
      </div>
    </div>
  );
}

export default connect(
  mapStateToProps
)(injectIntl(PageAddPages));
