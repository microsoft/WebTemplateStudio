import * as React from "react";
import { injectIntl } from "react-intl";
import { connect } from "react-redux";

import Title from "../../components/Titles/Title";
import pageStyles from "../pageStyles.module.css";
import { IIntlProps, IProps, IStoreProps } from "./interfaces";
import messages from "./messages";
import PageCard from "./PageCard";
import { mapStateToProps } from "./store";

type Props = IStoreProps & IIntlProps & IProps;

const AddPagesPage = (props: Props) => {
  const { options, intl, isModal } = props;

  return (
    <div>
      <Title>{intl.formatMessage(messages.pagesTitleQuestion)}</Title>
      <div className={pageStyles.flexCardsContainer}>
        {options.map((option, key) => {
          return <PageCard key={key} page={option} isModal={isModal} />;
        })}
      </div>
    </div>
  );
};

export default connect(mapStateToProps)(injectIntl(AddPagesPage));
