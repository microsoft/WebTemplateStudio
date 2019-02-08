import * as React from "react";

import SelectOption from "../SelectOption";

import options from "./optionsData";

class SelectPages extends React.Component {
  public render() {
    return (
      <div>
        <SelectOption
          multiSelect={true}
          title="What pages do you need for your application?"
          options={options}
        />
      </div>
    );
  }
}

export default SelectPages;
