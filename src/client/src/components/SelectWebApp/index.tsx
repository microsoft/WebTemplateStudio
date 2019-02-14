import * as React from "react";
import { connect } from "react-redux";

import SelectOption from "../SelectOption";

import { selectWebAppAction } from "../../actions/selectWebApp";

import options from "./optionsData";

interface IDispatchProps {
  selectWebApp: (webApp: string) => void,
}

class SelectWebApp extends React.Component<IDispatchProps> {
  public render() {
    return (
      <div>
        <SelectOption
          selectCard={this.props.selectWebApp}
          multiSelect={false}
          title="What type of web application are you building?"
          options={options}
        />
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch: any): IDispatchProps => ({
  selectWebApp: (webApp: string) => { dispatch(selectWebAppAction(webApp)) },
});

export default connect(null, mapDispatchToProps)(SelectWebApp);
