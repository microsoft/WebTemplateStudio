import * as React from "react";
import { connect } from "react-redux";
import { injectIntl } from "react-intl";

import messages from "./messages";
import PageCard from "./PageCard";
import classnames from "classnames";
import Notification from "../../components/Notification";
import { IStoreProps, IIntlProps, IProps } from "./interfaces";
import { mapStateToProps } from "./store";

import pageStyles from "../pageStyles.module.css";
import styles from "./styles.module.css";
import Title from "../../components/Title";

type Props = IStoreProps & IIntlProps & IProps;

const AddPagesPage = (props: Props) => {
  const { options, intl, isModal, pageOutOfBounds } = props;

  return (
    <div>
      <Title>{intl.formatMessage(messages.pagesTitleQuestion)}</Title>
      <div
        className={classnames(styles.description, {
          [styles.borderGreen]: !pageOutOfBounds,
          [styles.borderYellow]: pageOutOfBounds,
        })}
      >
        <Notification showWarning={pageOutOfBounds} altMessage={intl.formatMessage(messages.iconAltMessage)}>
          {intl.formatMessage(messages.maxPagesCanBeSelected)}
        </Notification>
      </div>
      <div className={pageStyles.flexContainer}>
        {options.map((option, key) => {
          return <PageCard key={key} page={option} isModal={isModal} />;
        })}
      </div>
    </div>
  );
};

export default connect(mapStateToProps)(injectIntl(AddPagesPage));
