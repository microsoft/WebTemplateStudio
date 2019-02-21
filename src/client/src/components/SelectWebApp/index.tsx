import * as React from "react";
import { connect } from "react-redux";

import SelectOption from "../SelectOption";

import { selectWebAppAction } from "../../actions/selectWebApp";

import { IOption } from "../../types/option";
import { string } from "prop-types";

interface IDispatchProps {
  selectWebApp: (webApp: string) => void,
}

interface IProps {
  options: IOption[];
  selectedWebApp: string;
}

type Props = IDispatchProps & IProps;

class SelectWebApp extends React.Component<Props> {
  public convertSelectionToIndexNumber(framework: string): number[] {
    for (let i = 0; i < this.props.options.length; i++) {
      if (this.props.options[i].title === framework) {
        return [i];
      }
    }
    return [0];
  }
  public render() {
    return (
      <div>
        <SelectOption
          selectCard={this.props.selectWebApp}
          multiSelect={false}
          title="What type of web application are you building?"
          options={this.props.options}
          selectedCards={this.convertSelectionToIndexNumber(this.props.selectedWebApp)}
        />
      </div>
    );
  }
}

const mapStateToProps = (state: any): IProps => {
  const { appTypeOptions } = state.wizardContent;
  const { appType } = state.selection;
  return {
    options: appTypeOptions,
    selectedWebApp: appType,
  }
}

const mapDispatchToProps = (dispatch: any): IDispatchProps => ({
  selectWebApp: (webApp: string) => { dispatch(selectWebAppAction(webApp)) },
});

export default connect(mapStateToProps, mapDispatchToProps)(SelectWebApp);
