import * as React from "react";
import { useSelector, useDispatch } from "react-redux";
import { injectIntl, InjectedIntlProps } from "react-intl";
import { AppState } from "../../../store/combineReducers";
import { UserSelectionState } from "../../../store/userSelection/combineReducers";
import { TemplateType } from "../../../store/templates/combineReducers";
import {
  setSelectedProjectTypeAction,
} from "../../../store/userSelection/projectType/action";

import { ISelected } from "../../../types/selected";
import { IOption } from "../../../types/option";

import Dropdown from "../../../components/Dropdown";

import rightsidebarStyles from "../rightsidebarStyles.module.css";
import messages from "./messages";

type Props = InjectedIntlProps;

const SelectProjectTypes = (props: Props) => {
  const selection: UserSelectionState = useSelector((state: AppState) => state.userSelection);
  const projectTypesDropdownItems: IDropDownOptionType[] = useSelector((state: AppState) =>
    convertOptionsToDropdownItems(state.templates.projectTypesOptions)
  );

  const contentOptions: TemplateType = useSelector((state: AppState) => state.templates);

  const { intl } = props;
  const { formatMessage } = intl;
  const { projectTypesOptions } = contentOptions;

  const dispatch = useDispatch();

  function convertOptionsToDropdownItems(options: any[]): IDropDownOptionType[] {
    const dropDownItems = [];
    for (const option of options) {
      if (option.unselectable) {
        continue;
      }
      const dropdownItem = convertOptionToDropdownItem(option);
      dropDownItems.push(dropdownItem);
    }
    return dropDownItems;
  }

  function convertOptionToDropdownItem(option: ISelected): IDropDownOptionType {
    if (option.internalName && option.title) {
      return {
        value: option.internalName,
        label: option.title,
      };
    }
    return {
      value: "",
      label: "",
    };
  }

  const handleProjectTypeChange = (option: IDropDownOptionType) => {
    const projectTypeOption = projectTypesOptions.find((proj: IOption) => proj.internalName === option.value);
    if (projectTypeOption) {
      const { title, internalName, version, author, licenses, icon } = projectTypeOption;
      const newProjectType = { title: title as string, internalName, version, author, licenses, icon };
      dispatch(setSelectedProjectTypeAction(newProjectType));
    }
  };

  return (
    <>
      {projectTypesOptions.length > 1 && selection.projectType.internalName !== "" && (
        <div className={rightsidebarStyles.sidebarItem}>
          <div className={rightsidebarStyles.title}>{formatMessage(messages.selectProjectTypes)}</div>
          <Dropdown
            handleChange={(dropDrownItem: IDropDownOptionType) => {
              handleProjectTypeChange(dropDrownItem);
            }}
            ariaLabel={formatMessage(messages.selectProjectTypes)}
            options={projectTypesDropdownItems}
            value={convertOptionToDropdownItem(selection.projectType)}
          />
        </div>
      )}
    </>
  );
};

export default injectIntl(SelectProjectTypes);
