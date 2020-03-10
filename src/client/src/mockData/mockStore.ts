import { ISelected } from "../types/selected";
import { IVSCode, IVSCodeAPI, IVSCodeObject } from "../reducers/vscodeApiReducer";
import mockVsCodeApi from "./mockVsCodeApi";
import { FormattedMessage } from "react-intl";
import { AppState } from "../reducers";

export const getISelected = () => {
  const selected: ISelected = {
    title:"title1",
    internalName:"internamName1"
  };
  return selected;
};


export const getIVSCodeApi = () => {
  const isVsCodeApiAcquired = false;
  const vscodeObject: IVSCodeObject = mockVsCodeApi();

  const vscode: IVSCodeAPI = {
    isVsCodeApiAcquired,
    vscodeObject
  };
  const mockVSCode: IVSCode = {
    vscode
  };
  return mockVSCode;
};

export const getInitialState = (): AppState => {
  const initialState: AppState={
    vscode: {
      isVsCodeApiAcquired: true,
      vscodeObject: getIVSCodeApi().vscode.vscodeObject
    },
    wizardContent: {
      backendOptions: [],
      frontendOptions: [],
      pageOptions: [],
      projectTypes: [],
      detailsPage: {
        isIntlFormatted: false,
        data: {
          title: '',
          internalName: '',
          body: '',
          longDescription: '',
          position: 0,
          licenses: [],
          selected: false,
          author: '',
          svgUrl:''
        }
      },
      serverPort: 9502,
      previewStatus: false,
      createProjectButton: false,
      enableQuickStart: false,
    },
    selection: {
      appType: {
        title: 'Fullstack Web Application',
        internalName: 'FullStackWebApp',
        version: 'v1.0',
        licenses: ''
      },
      frontendFramework: {
        title: '',
        internalName: '',
        version: '',
        author: ''
      },
      backendFramework: {
        title: '',
        internalName: '',
        version: '',
        author: ''
      },
      pages: [],
      services: {
        azureFunctions: {
          appNameAvailability: {
            isAppNameAvailable: false,
            message: 'App name unavailable'
          },
          selection: [],
          wizardContent: {
            serviceType: {
              id: 'azureFunctions.originalTitle',
              defaultMessage: 'Azure Functions'
            }
          },
          chooseExistingRadioButtonSelected: false
        },
        cosmosDB: {
          accountNameAvailability: {
            isAccountNameAvailable: false,
            message: 'Account name unavailable'
          },
          selection: [],
          wizardContent: {
            serviceType: {
              id: 'cosmosDb.originalTitle',
              defaultMessage: 'CosmosDB'
            }
          }
        },
        appService: {
          siteNameAvailability: {
            isSiteNameAvailable: false,
            message: 'App name unavailable'
          },
          selection: null,
          wizardContent: {
            serviceType: {
              id: 'appService.originalTitle',
              defaultMessage: 'App Service'
            }
          }
        }
      },
      outputPathObject: {
        outputPath: '/generic_output_path'
      },
      isValidatingName: false,
      projectNameObject: {
        projectName: 'myApp',
        validation: {
          isValid: true,
          error: "" as unknown as FormattedMessage.MessageDescriptor,
          isDirty: true
        }
      },
      validations: {
        itemNameValidationConfig: {
          regexs: [],
          reservedNames: [],
          validateEmptyNames: true,
          validateExistingNames: true,
          validateDefaultNames: true
        },
        projectNameValidationConfig: {
          regexs: [],
          reservedNames: [],
          validateEmptyNames: true,
          validateExistingNames: true
        }
      }
    },
    azureProfileData: {
      isLoggedIn: false,
      profileData: {
        subscriptions: {},
        email:''
      },
      subscriptionData: {
        locations: [],
        resourceGroups: [],
        validName: ''
      }
    },
    modals: {
      openModal: {
        modalType: null,
        modalData: null
      }
    },
    wizardRoutes: {
      isVisited: {
        '/': true,
        '/SelectFrameworks': false,
        '/SelectPages': false,
        '/AzureLogin': false,
        '/ReviewAndGenerate': false
      },
      selected: '/'
    },
    generationStatus: {
      statusMessage: '...',
      genStatus: {
        templates: {
          success: false,
          failure: false
        },
        cosmos: {
          success: false,
          failure: false
        },
        azureFunctions: {
          success: false,
          failure: false
        },
        appService: {
          success: false,
          failure: false
        }
      }
    },
    versions: {
      templatesVersion: '',
      wizardVersion: ''
    },
    dependencyInfo: {
      dependencies: {}
    }
  };
  return initialState;
}

const loadPages = (frameWorkName: string): Array<any>=>{
  const blankPage = {
    body: 'A blank page for you to build your web application from scratch.',
    internalName: 'wts.Page.' + frameWorkName + '.Blank',
    licenses: [
      {
        text: 'Bootstrap',
        url: 'https://github.com/twbs/bootstrap/blob/master/LICENSE'
      }
    ],
    longDescription: 'This is the most basic page. A blank canvas to mold into whatever you wish. The blank page leaves pretty much everything up to you.',
    selected: false,
    title: 'Blank',
    defaultName: 'Blank',
    isValidTitle: true,
    author: 'Microsoft'
  }
  const gridPage = {
    body: 'Simple image and text components which are organized into a grid.',
    internalName: 'wts.Page.' + frameWorkName + '.Grid',
    licenses: [
      {
        text: 'Bootstrap',
        url: 'https://github.com/twbs/bootstrap/blob/master/LICENSE'
      }
    ],
    longDescription: 'A page displaying simple image and text components which are organized into a grid. Grid pages are a system for creating order among elements in a website.',
    selected: false,
    title: 'Grid',
    defaultName: 'Grid',
    isValidTitle: true,
    author: 'Microsoft'
  };
  const listPage = {
    body: 'Add and remove text from an adaptive list.',
    internalName: 'wts.Page.' + frameWorkName + '.List',
    licenses: [
      {
        text: 'Bootstrap',
        url: 'https://github.com/twbs/bootstrap/blob/master/LICENSE'
      }
    ],
    longDescription: 'The list page allows you to add custom text in the form of an adaptive list. This pattern is frequently used for blog pages and messaging apps. If a database is selected from the Azure Cloud Services the list page will automatically connect to the deployed Azure database.',
    selected: false,
    title: 'List',
    defaultName: 'List',
    isValidTitle: true,
    author: 'Microsoft'
  }
  const masterPage = {
    body: 'A master pane and a details pane for content.',
    internalName: 'wts.Page.' + frameWorkName + '.MasterDetail',
    licenses: [
      {
        text: 'Bootstrap',
        url: 'https://github.com/twbs/bootstrap/blob/master/LICENSE'
      }
    ],
    longDescription: 'The master-detail page has a master pane and a details pane for content. When an item in the master list is selected, the details pane is updated. This pattern is frequently used for email and address books.',
    selected: false,
    title: 'Master Detail',
    defaultName: 'Master Detail',
    isValidTitle: true,
    author: 'Microsoft'
  };
  const pages: Array<any> = new Array<any>();
  pages.push(blankPage);
  pages.push(gridPage);
  pages.push(listPage);
  pages.push(masterPage);
  
  return pages;
}

const getSubscriptions = (): Array<any> => {
  const subscriptions = Array.from(Array(2).keys()).map(
    (item: number) => {
      return {
        label: `subscription ${item} label`,
        value:  `subscription ${item} value`,
        isMicrosoftLearnSubscription: false
      };
    }
  );
  
  subscriptions.push({
    label: "Microsoft Learn Subscription",
        value: "Microsoft Learn Subscription",
        isMicrosoftLearnSubscription: true
  });

  return subscriptions;
}

export const loadMasters = (store: any) =>{
  store.wizardContent.pageOptions = loadPages("React");
}

export const setSubscriptions = (store: any) => {
  store.azureProfileData.profileData.subscriptions = getSubscriptions();
}

export const setBackendFramework = (store: any, internalName: string) => {
  store.selection.backendFramework.internalName = internalName;
}