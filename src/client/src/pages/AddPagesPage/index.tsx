import * as React from "react";
import { connect } from "react-redux";
import { injectIntl } from "react-intl";

import messages from "./messages";
import PageCard from "./PageCard";
import { IStoreProps, IIntlProps, IProps } from "./interfaces";
import { mapStateToProps } from "./store";

import pageStyles from "../pageStyles.module.css";
import Title from "../../components/Titles/Title";

type Props = IStoreProps & IIntlProps & IProps;

const AddPagesPage = (props: Props) => {
  const { options, intl, isModal } = props;

  return (
    <div>
      <Title>{intl.formatMessage(messages.pagesTitleQuestion)}</Title>
      <div className={pageStyles.flexContainer}>
        {options.map((option, key) => {
          return <PageCard key={key} page={option} isModal={isModal} />;
        })}
      </div>
    </div>
  );
};

export default connect(mapStateToProps)(injectIntl(AddPagesPage));
