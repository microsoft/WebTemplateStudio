interface IDispatchProps {
  selectBackendFramework: (framework: ISelected) => void;
  selectFrontendFramework: (framework: ISelected) => void;
  selectProjectType: (projectType: ISelected) => void;
  openViewLicensesModal: () => any;
  resetPageSelection: () => any;
  setOptionPages: (pages: IOption[]) => any;
  setSelectedPages: (pages: ISelected[]) => void;
}

interface IRightSidebarProps {
  outputPath: string;
  projectName: string;
  selection: SelectionState;
  projectTypeDropdownItems: IDropDownOptionType[];
  frontEndOptions: IOption[];
  frontendDropdownItems: IDropDownOptionType[];
  backendDropdownItems: IDropDownOptionType[];
  services: ServiceState;
  hasServices: boolean;
  vscode: IVSCodeObject;
  isRoutesVisited: IVisitedPages;
  contentOptions: WizardContentType;
  wizardRoutes: WizardRoutes;
}

export { IDispatchProps, IRightSidebarProps };
