import * as React from "react";
import { useSelector, useDispatch } from "react-redux";
import { injectIntl, InjectedIntlProps } from "react-intl";
import { AppState } from "../../../store/combineReducers";
import { UserSelectionState } from "../../../store/userSelection/combineReducers";
import { TemplateType } from "../../../store/templates/combineReducers";
import { setSelectedFrontendFrameworkAction, setSelectedBackendFrameworkAction } from "../../../store/userSelection/frameworks/action";

import { ISelected } from "../../../types/selected";
import { IOption } from "../../../types/option";

import Dropdown from "../../../components/Dropdown";

import rightsidebarStyles from "../rightsidebarStyles.module.css";
import messages from "./messages";

type Props = InjectedIntlProps;

const SelectFrameworks = (props: Props)=>{
  const selection: UserSelectionState = useSelector((state: AppState) => state.userSelection);
  const frontEndOptions: IOption[] = useSelector((state: AppState) => state.templates.frontendOptions);
  const frontendDropdownItems: IDropDownOptionType[] =
    useSelector((state: AppState) => convertOptionsToDropdownItems(state.templates.frontendOptions));
  const backendDropdownItems: IDropDownOptionType[] =
    useSelector((state: AppState) => convertOptionsToDropdownItems(state.templates.backendOptions));
  const contentOptions: TemplateType = useSelector((state: AppState) => state.templates);

  const { intl } = props;
  const { formatMessage } = intl;
  const { backendOptions } = contentOptions;

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
        label: option.title
      };
    }
    return {
      value: "",
      label: ""
    };
  }

  const handleBackEndFrameworkChange = (option: IDropDownOptionType) => {
    const optionBackEnd =
      backendOptions.find((optionBack: IOption) => optionBack.internalName === option.value);
    if (optionBackEnd){
      const { title, internalName, version, author, licenses, icon } = optionBackEnd;
      const newBackEndFramework = { title: title as string, internalName, version, author, licenses, icon };
      dispatch(setSelectedBackendFrameworkAction(newBackEndFramework));
    }
  };

  const handleFrontEndFrameworkChange = (option: IDropDownOptionType) => {
    const optionFrontEnd =
      frontEndOptions.find((optionFront: IOption) => optionFront.internalName === option.value);
    if (optionFrontEnd){
      const { title, internalName, version, author, licenses, icon } = optionFrontEnd;
      const newFrontEndFramework = { title: title as string, internalName, version, author, licenses, icon };
      dispatch(setSelectedFrontendFrameworkAction(newFrontEndFramework));
    }
  };

  return (
    <>
      {(selection.frontendFramework.internalName !== "" && (
      <div className={rightsidebarStyles.sidebarItem}>
        <div className={rightsidebarStyles.title}>{formatMessage(messages.frontendFramework)}</div>
        <Dropdown
          handleChange={(dropDrownItem: IDropDownOptionType) => {
            handleFrontEndFrameworkChange(dropDrownItem);
          }}
          ariaLabel={formatMessage(messages.frontendFramework)}
          options={frontendDropdownItems}
          value={convertOptionToDropdownItem(
            selection.frontendFramework
          )}
        />
      </div>
      ))}
      {(selection.backendFramework.internalName !== "" && (
      <div className={rightsidebarStyles.sidebarItem}>
        <div className={rightsidebarStyles.title}>{formatMessage(messages.backendFramework)}</div>
        <Dropdown
          handleChange={(dropDrownItem: IDropDownOptionType) => {
            handleBackEndFrameworkChange(dropDrownItem);
          }}
          ariaLabel={formatMessage(messages.backendFramework)}
          options={backendDropdownItems}
          value={convertOptionToDropdownItem(
            selection.backendFramework
          )}
        />
      </div>
      ))}
    </>
  );
}

export default injectIntl(SelectFrameworks);