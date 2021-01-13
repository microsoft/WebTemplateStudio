import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { injectIntl, InjectedIntlProps } from "react-intl";
import { AppState } from "../../../store/combineReducers";
import { TemplateType } from "../../../store/templates/combineReducers";
import {
  setSelectedFrontendFrameworkAction,
  setSelectedBackendFrameworkAction,
} from "../../../store/userSelection/frameworks/action";

import { IOption } from "../../../types/option";

import Dropdown from "../../../components/Dropdown";
import {
  getDropdownBackendFrameworksSelector,
  getDropdownFrontendFrameworksSelector,
} from "../../../store/templates/frameworks/selector";

import rightsidebarStyles from "../rightsidebarStyles.module.css";
import messages from "./messages";

type Props = InjectedIntlProps;

const SelectFrameworks = (props: Props) => {
  const storedFrontendFramework = useSelector((state: AppState) => state.userSelection.frontendFramework);
  const storedBackendFramework = useSelector((state: AppState) => state.userSelection.backendFramework);
  const contentOptions: TemplateType = useSelector((state: AppState) => state.templates);
  const frontendFrameworks = useSelector((state: AppState) => getDropdownFrontendFrameworksSelector(state));
  const backendFrameworks = useSelector((state: AppState) => getDropdownBackendFrameworksSelector(state));

  const [selectedFrontendFramework, setSelectedFrontendFramework] = useState<IDropDownOptionType | undefined>(
    undefined
  );
  const [selectedBackendFramework, setSelectedBackendFramework] = useState<IDropDownOptionType | undefined>(undefined);

  const { intl } = props;
  const { formatMessage } = intl;
  const { backendOptions, frontendOptions } = contentOptions;
  const dispatch = useDispatch();

  React.useEffect(() => {
    const frontendFramework = frontendFrameworks.find((s) => s.value === storedFrontendFramework.internalName);
    if (frontendFramework && frontendFramework !== selectedFrontendFramework) {
      setSelectedFrontendFramework(frontendFramework);
    }
  }, [storedFrontendFramework]);

  React.useEffect(() => {
    const optionFrontEnd = frontendOptions.find(
      (optionFront: IOption) => optionFront.internalName === selectedFrontendFramework?.value
    );
    if (optionFrontEnd && optionFrontEnd.internalName !== storedFrontendFramework.internalName) {
      const { title, internalName, version, author, licenses, icon } = optionFrontEnd;
      const newFrontEndFramework = { title: title as string, internalName, version, author, licenses, icon };
      dispatch(setSelectedFrontendFrameworkAction(newFrontEndFramework));
    }
  }, [selectedFrontendFramework]);

  React.useEffect(() => {
    const backendFramework = backendFrameworks.find((s) => s.value === storedBackendFramework.internalName);
    if (backendFramework && backendFramework !== selectedBackendFramework) {
      setSelectedBackendFramework(backendFramework);
    }
  }, [storedBackendFramework]);

  React.useEffect(() => {
    const optionBackEnd = backendOptions.find(
      (optionBack: IOption) => optionBack.internalName === selectedBackendFramework?.value
    );
    if (optionBackEnd && optionBackEnd.internalName !== storedBackendFramework.internalName) {
      const { title, internalName, version, author, licenses, icon } = optionBackEnd;
      const newBackEndFramework = { title: title as string, internalName, version, author, licenses, icon };
      dispatch(setSelectedBackendFrameworkAction(newBackEndFramework));
    }
  }, [selectedBackendFramework]);

  return (
    <>
      {frontendOptions.length > 1 && selectedFrontendFramework && selectedFrontendFramework.value !== "" && (
        <div className={rightsidebarStyles.sidebarItem}>
          <h3>{formatMessage(messages.frontendFramework)}</h3>
          <Dropdown
            handleChange={(selectedFrontendFramework) => {
              setSelectedFrontendFramework(selectedFrontendFramework);
            }}
            ariaLabel={formatMessage(messages.frontendFramework)}
            options={frontendFrameworks}
            value={selectedFrontendFramework}
          />
        </div>
      )}
      {backendOptions.length > 1 && selectedBackendFramework && selectedBackendFramework.value !== "" && (
        <div className={rightsidebarStyles.sidebarItem}>
          <h3>{formatMessage(messages.backendFramework)}</h3>
          <Dropdown
            handleChange={(selectedBackendFramework) => {
              setSelectedBackendFramework(selectedBackendFramework);
            }}
            ariaLabel={formatMessage(messages.backendFramework)}
            options={backendFrameworks}
            value={selectedBackendFramework}
          />
        </div>
      )}
    </>
  );
};

export default injectIntl(SelectFrameworks);
