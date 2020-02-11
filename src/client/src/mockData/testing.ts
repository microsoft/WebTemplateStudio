import { ISelected } from "../types/selected";
import { IVSCode, IVSCodeAPI, IVSCodeObject } from "../reducers/vscodeApiReducer";
import mockVsCodeApi from "./mockVsCodeApi";
import { IAvailability } from "../reducers/wizardSelectionReducers/services/appServiceReducer";
import { FormattedMessage } from "react-intl";
import { AppState } from "../reducers";

export const getISelected = () => {
  let selected:ISelected = {
    title:"title1",
    internalName:"internamName1"
  };
  return selected;
};


export const getIVSCodeApi = () => {
  const isVsCodeApiAcquired: boolean = false;
  const vscodeObject: IVSCodeObject = mockVsCodeApi();

  const vscode:IVSCodeAPI = {
    isVsCodeApiAcquired,
    vscodeObject
  };
  const mockVSCode:IVSCode = {
    vscode
  };
  return mockVSCode;
};

export const getInitialState = () => {
  const initialState:AppState={
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
      previewStatus: true,
      createProjectButton: false,
      enableQuickStart: false
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
