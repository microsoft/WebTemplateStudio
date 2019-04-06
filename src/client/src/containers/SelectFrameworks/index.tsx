import * as React from "react";

import SelectBackEndFramework from "../SelectBackendFramework";
import SelectFrontEndFramework from "../SelectFrontEndFramework";

const SelectFrameworks = () => {
  return (
    <div>
      <SelectFrontEndFramework />
      <SelectBackEndFramework />
    </div>
  );
};

export default SelectFrameworks;
