import * as React from "react";
import { connect } from "react-redux";
import { withRouter, RouteComponentProps } from "react-router";
import Details from "../../components/Details";
import { IOption } from "../../types/option";

interface IPageDetailsProps {
  detailsPageInfo: IOption;
}

type Props = IPageDetailsProps & RouteComponentProps;

const PageDetails = (props: Props) => {
  return (
    <Details
      handleBackClick={props.history.goBack}
      detailInfo={props.detailsPageInfo}
    />
  );
};

const mapStateToProps = (state: any): IPageDetailsProps => {
  return {
    detailsPageInfo: state.wizardContent.detailsPage
  };
};

export default withRouter(
  connect(
    mapStateToProps,
    null
  )(PageDetails)
);
