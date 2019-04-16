import * as React from "react";

import SelectBackEndFramework from "../SelectBackendFramework";
import SelectFrontEndFramework from "../SelectFrontEndFramework";

const SelectFrameworks = () => {
  return (
    <main>
      <SelectFrontEndFramework />
      <SelectBackEndFramework />
    </main>
  );
};

export default SelectFrameworks;
