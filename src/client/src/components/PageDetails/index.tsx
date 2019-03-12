import * as React from "react";
import { connect } from "react-redux";
import { withRouter, RouteComponentProps } from "react-router";
import Details from "../Details";
import { IOption } from "../../types/option";

interface IPageDetailsProps {
  detailsPageInfo: IOption;
}

type Props = IPageDetailsProps & RouteComponentProps;

class PageDetails extends React.Component<Props> {
  constructor(props: any) {
    super(props);
  }

  public render() {
    return (
      <Details
        handleBackClick={this.props.history.goBack}
        detailInfo={this.props.detailsPageInfo}
      />
    );
  }
}

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
