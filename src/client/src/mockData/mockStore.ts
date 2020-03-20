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
        appService: {
          success: false,
          failure: false
        }
      }
    },
    versions: {
      templatesVersion: '0.0.1',
      wizardVersion: '0.0.2'
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

export const addFrontEndFrameworksOptions = (store: AppState)=>{
  store.wizardContent.frontendOptions = [
    {
      author: 'Facebook',
      body: 'JavaScript framework',
      internalName: 'React',
      licenses: ['[React](https://github.com/facebook/react/blob/master/LICENSE)  \n[Create React App](https://github.com/facebook/create-react-app/blob/master/LICENSE)'],
      longDescription: 'React is a component-based open source JavaScript library for building interfaces for single page applications. It is used for handling view layer for web and mobile apps. React allows you to design simple views for each state in your application, and React will efficiently update and render just the right components when your data changes.  \r\n\r\n  \r\nMore information about React can be found [here](https://reactjs.org).\r\n',
      position: 1,
      selected: false,
      svgUrl: '',
      title: 'React',
      version: '16.8.4',
      latestVersion: "0.0.1",
      latestVersionLoaded: true
    },
    {
      author: 'Google',
      body: 'JavaScript framework',
      internalName: 'Angular',
      licenses: ['[Angular](https://github.com/angular/angular/blob/master/LICENSE)  \n[Angular CLI](https://github.com/angular/angular-cli/blob/master/LICENSE)'],
      longDescription: 'Angular is a platform that makes it easy to build applications with the web. Angular combines declarative templates, dependency injection, end to end tooling, and integrated best practices to solve development challenges. Angular empowers developers to build applications that live on the web, mobile, or the desktop.\r\n\r\nMore information about Angular can be found [here](https://angular.io).\r\n',
      position: 1,
      selected: false,
      svgUrl: '',
      title: 'Angular',
      version: '7.2.0',
      latestVersion: "0.0.1",
      latestVersionLoaded: true
    },
    {
      author: 'Evan You',
      body: 'JavaScript framework',
      internalName: 'Vue',
      licenses: ['Vue](https://github.com/vuejs/vue/blob/dev/LICENSE)  \n[Vue CLI](https://github.com/vuejs/vue-cli/blob/dev/LICENSE)'],
      longDescription: 'Vue is a lightweight, progressive JavaScript framework for building user interfaces. Vue is heavily focused on the view layer, and is designed to be simple and flexible.\r\n\r\nMore information about Vue can be found [here](https://vuejs.org/).\r\n',
      position: 1,
      selected: false,
      svgUrl: '',
      title: 'Vue.js',
      version: '2.6.6',
      latestVersion: "0.0.1",
      latestVersionLoaded: true
    }
  ];
  return store;
}

export const addBackEndFrameworksOptions = (store: AppState)=>{
  store.wizardContent.backendOptions = [
    {
      author: 'Various',
      body: 'JavaScript framework',
      internalName: 'Node',
      licenses: ['[Node](https://github.com/nodejs/node/blob/master/LICENSE)  \n[Express](https://github.com/expressjs/express/blob/master/LICENSE)  \n[Express Generator](https://github.com/expressjs/generator/blob/master/LICENSE)'],
      longDescription: 'Node.js is an open source server environment based on JavaScript that helps you build fast and scalable network applications. Node.js uses an event-driven, non-blocking I/O model that makes it lightweight and efficient, perfect for data-intensive real-time applications that run across distributed devices. Node.js runs across various platforms like Windows, Linux, Unix, and Mac OS X.\r\n\r\nMore information about Node.js can be found [here](https://nodejs.org).\r\n',
      position: 1,
      selected: false,
      svgUrl: '',
      title: 'Node.js/Express',
      version: '10.15.0',
      latestVersion: "0.0.1",
      latestVersionLoaded: true
    },
    {
      author: 'Various',
      body: 'Python framework',
      internalName: 'Flask',
      licenses: ['[Flask](https://github.com/pallets/flask/blob/master/LICENSE)'],
      longDescription: 'Flask is a python microframework with a small core for building web applications. It is based on [Werkzeug](https://www.palletsprojects.com/p/werkzeug/) and [Jinja](https://www.palletsprojects.com/p/jinja/). It is licensed under [BSD](https://github.com/pallets/flask/blob/master/LICENSE) license.\r\nIt is developed and supported by Pallets organization.\r\n\r\nMore information on Flask can be found [here](http://flask.pocoo.org/)\r\n',
      position: 1,
      selected: false,
      svgUrl: '',
      title: 'Flask',
      version: '1.0.3',
      latestVersion: "0.0.1",
      latestVersionLoaded: true
    }
  ];
  return store;
}

export const loadMasters = (store: AppState) =>{
  store.wizardContent.pageOptions = loadPages("React");
}

export const setSubscriptions = (store: AppState) => {
  store.azureProfileData.profileData.subscriptions = getSubscriptions();
}

export const setBackendFramework = (store: AppState, internalName: string) => {
  store.selection.backendFramework.internalName = internalName;
}

export const setFrontendFramework = (store: AppState, internalName: string) => {
  store.selection.backendFramework.internalName = internalName;
}