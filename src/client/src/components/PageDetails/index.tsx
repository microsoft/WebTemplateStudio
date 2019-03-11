import * as React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import Details from "../Details";

import { selectPagesAction } from "../../actions/selectPages";

import { IOption } from "../../types/option";
import { ISelected } from "../../types/selected";

import { RouteComponentProps } from "react-router";

interface IDispatchProps {
  selectPages: (pages: ISelected[]) => void;
}

interface IPageDetailsProps {
  options: IOption[];
  selectedPages: ISelected[];
}

type Props = IDispatchProps & IPageDetailsProps & RouteComponentProps;

class PageDetails extends React.Component<Props> {
  constructor(props: any) {
    super(props);
  }

  public findSelectedDetails(): number {
    return 0;
  }

  public render() {
    return (
      <div>
        <Details
          handleBackClick={this.props.history.goBack}
          options={this.props.options[this.findSelectedDetails()]}
        />
      </div>
    );
  }
}

const mapStateToProps = (state: any): IPageDetailsProps => {
  const { pageOptions } = state.wizardContent;
  const { pages } = state.selection;

  return {
    options: pageOptions,
    selectedPages: pages
  };
};

const mapDispatchToProps = (dispatch: any): IDispatchProps => ({
  selectPages: (pages: ISelected[]) => {
    dispatch(selectPagesAction(pages));
  }
});

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(PageDetails)
);
