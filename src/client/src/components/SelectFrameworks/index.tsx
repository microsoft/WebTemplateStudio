import * as React from "react";

import SelectBackEndFramework from "../../containers/SelectBackendFramework";
import SelectFrontEndFramework from "../../containers/SelectFrontEndFramework";

const SelectFrameworks = () => {
  return (
    <div>
      <SelectFrontEndFramework />
      <SelectBackEndFramework />
    </div>
  );
};

export default SelectFrameworks;
