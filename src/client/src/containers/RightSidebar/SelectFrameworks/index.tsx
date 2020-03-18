import * as React from "react";
import { useSelector, useDispatch } from "react-redux";
import { injectIntl, InjectedIntlProps } from "react-intl";
import styles from "../styles.module.css";
import messages from "../strings";
import { ISelected } from "../../../types/selected";
import Dropdown from "../../../components/Dropdown";
import { AppState } from "../../../reducers";
import { setSelectedBackendFrameworkAction } from "../../../actions/wizardSelectionActions/selectedBackEndFramework";
import { setSelectedFrontendFrameworkAction } from "../../../actions/wizardSelectionActions/selectedFrontendFramework";
import { SelectionState } from "../../../reducers/wizardSelectionReducers";
import { IOption } from "../../../types/option";
import { WizardContentType } from "../../../reducers/wizardContentReducers";

type Props = InjectedIntlProps;

const SelectFrameworks = (props: Props)=>{

  const selection: SelectionState = useSelector((state: AppState) => state.selection);
  const frontEndOptions: IOption[] = useSelector((state: AppState) => state.wizardContent.frontendOptions);
  const frontendDropdownItems: IDropDownOptionType[] =
    useSelector((state: AppState) => convertOptionsToDropdownItems(state.wizardContent.frontendOptions));
  const backendDropdownItems: IDropDownOptionType[] =
    useSelector((state: AppState) => convertOptionsToDropdownItems(state.wizardContent.backendOptions));
  const contentOptions: WizardContentType = useSelector((state: AppState) => state.wizardContent);

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
      const { title, internalName, version, author, licenses } = optionBackEnd;
      const newBackEndFramework = { title: title as string, internalName, version, author, licenses };
      dispatch(setSelectedBackendFrameworkAction(newBackEndFramework));
    }
  };

  const handleFrontEndFrameworkChange = (option: IDropDownOptionType) => {
    const optionFrontEnd =
      frontEndOptions.find((optionFront: IOption) => optionFront.internalName === option.value);
    if (optionFrontEnd){
      const { title, internalName, version, author, licenses } = optionFrontEnd;
      const newBackEndFramework = { title: title as string, internalName, version, author, licenses };
      dispatch(setSelectedFrontendFrameworkAction(newBackEndFramework));
    }
  };

  return (
    <React.Fragment>
      <div className={styles.sidebarItem}>
        <div className={styles.dropdownTitle}>{formatMessage(messages.frontendFramework)}</div>
        <Dropdown
          handleChange={(dropDrownItem: IDropDownOptionType) => {
            handleFrontEndFrameworkChange(dropDrownItem);
          }}
          ariaLabel={formatMessage(messages.backendFramework)}
          options={frontendDropdownItems}
          value={convertOptionToDropdownItem(
            selection.frontendFramework
          )}
        />
      </div>
      <div className={styles.sidebarItem}>
        <div className={styles.dropdownTitle}>{formatMessage(messages.backendFramework)}</div>
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
    </React.Fragment>
  );
}

export default injectIntl(SelectFrameworks);