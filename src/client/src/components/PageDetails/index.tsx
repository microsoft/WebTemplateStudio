import * as React from "react";
import { connect } from "react-redux";

import Details from "../Details";

import { selectPagesAction } from "../../actions/selectPages";

import { IOption } from "../../types/option";
import { ISelected } from "../../types/selected";

interface IDispatchProps {
  selectPages: (pages: ISelected[]) => void;
}

interface ISelectPagesProps {
  options: IOption[];
  selectedPages: ISelected[];
}

type Props = IDispatchProps & ISelectPagesProps;

class SelectPages extends React.Component<Props> {
  public render() {
    return (
      <div>
        <Details
          title={"Example title"}
          body={"Page description"}
          author={"Author"}
          version={"Version"}
          license={"License"}
          dependencies={"dependencies"}
          handleDetailsClick={() => console.log("details clicked")}
          svgUrl={"testURL"}
        />
      </div>
    );
  }
}

const mapStateToProps = (state: any): ISelectPagesProps => {
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

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SelectPages);
