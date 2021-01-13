import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { injectIntl, InjectedIntlProps } from "react-intl";
import { AppState } from "../../../store/combineReducers";
import { TemplateType } from "../../../store/templates/combineReducers";
import { setSelectedProjectTypeAction } from "../../../store/userSelection/projectType/action";
import { getDropdownProjectTypeSelector } from "../../../store/templates/projectTypes/selector";

import Dropdown from "../../../components/Dropdown";

import rightsidebarStyles from "../rightsidebarStyles.module.css";
import messages from "./messages";

type Props = InjectedIntlProps;

const SelectProjectTypes = (props: Props) => {
  const storedProjectType = useSelector((state: AppState) => state.userSelection.projectType);
  const contentOptions: TemplateType = useSelector((state: AppState) => state.templates);
  const projectTypes = useSelector(getDropdownProjectTypeSelector);

  const [selectedProjectType, setSelectedProjectType] = useState<IDropDownOptionType | undefined>(undefined);

  const { intl } = props;
  const { formatMessage } = intl;
  const { projectTypesOptions } = contentOptions;
  const dispatch = useDispatch();

  React.useEffect(() => {
    const projectType = projectTypes.find((s) => s.value === storedProjectType.internalName);
    if (projectType && projectType !== selectedProjectType) {
      setSelectedProjectType(projectType);
    }
  }, [storedProjectType]);

  React.useEffect(() => {
    if (selectedProjectType) {
      const projectTypeOption = projectTypesOptions.find((proj) => proj.internalName === selectedProjectType.value);
      if (projectTypeOption && projectTypeOption.internalName !== storedProjectType.internalName) {
        const { title, internalName, version, author, licenses, icon } = projectTypeOption;
        const newProjectType = { title: title as string, internalName, version, author, licenses, icon };

        dispatch(setSelectedProjectTypeAction(newProjectType));
      }
    }
  }, [selectedProjectType]);

  return (
    <>
      {projectTypesOptions.length > 1 && storedProjectType.internalName !== "" && (
        <div className={rightsidebarStyles.sidebarItem}>
          <h3>{formatMessage(messages.selectProjectTypes)}</h3>
          <Dropdown
            handleChange={(projectType) => setSelectedProjectType(projectType)}
            ariaLabel={formatMessage(messages.selectProjectTypes)}
            options={projectTypes}
            value={selectedProjectType}
          />
        </div>
      )}
    </>
  );
};

export default injectIntl(SelectProjectTypes);
