import * as React from "react";
import { connect } from "react-redux";

import SelectOption from "../SelectOption";

import { selectWebAppAction } from "../../actions/selectWebApp";

import { IOption } from "../../types/option";

interface IDispatchProps {
  selectWebApp: (webApp: string) => void,
}

interface IProps {
  options: IOption[];
}

type Props = IDispatchProps & IProps;

class SelectWebApp extends React.Component<Props> {
  public render() {
    return (
      <div>
        <SelectOption
          selectCard={this.props.selectWebApp}
          multiSelect={false}
          title="What type of web application are you building?"
          options={this.props.options}
        />
      </div>
    );
  }
}

const mapStateToProps = (state: any): any => {
  const { appTypeOptions } = state.wizardContent;
  return {
    options: appTypeOptions
  }
}

const mapDispatchToProps = (dispatch: any): IDispatchProps => ({
  selectWebApp: (webApp: string) => { dispatch(selectWebAppAction(webApp)) },
});

export default connect(mapStateToProps, mapDispatchToProps)(SelectWebApp);
