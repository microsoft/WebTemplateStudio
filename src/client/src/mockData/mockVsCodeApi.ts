import {
  EXTENSION_COMMANDS,
  DEVELOPMENT,
  EXTENSION_MODULES
} from "../utils/constants";

const WEST_US = "WEST US";
const mockLocations = Array.from({ length: 12 }).fill({
  label: WEST_US,
  value: WEST_US
});

const RESOURCE_GROUP_MOCK = "resourceGroupMock";
const mockResourceGroups = Array.from({ length: 12 }).fill({
  label: RESOURCE_GROUP_MOCK,
  value: RESOURCE_GROUP_MOCK
});

const SUBSCRIPTION_MOCK = "GIV.Hackathon";
const mockSubscriptions = Array.from(Array(10).keys()).map(
  (element: number) => {
    return {
      label: SUBSCRIPTION_MOCK + element,
      value: SUBSCRIPTION_MOCK + element,
      isMicrosoftLearnSubscription: false
    };
  }
);

mockSubscriptions.push({
  label: "Microsoft Learn Mock Subscription",
      value: "Microsoft Learn Mock Subscription",
      isMicrosoftLearnSubscription: true
});

const DEV_NO_ERROR_MSG = "in development, no error message";
const DEV_NO_ERROR_TYPE = "in development, no error type";

const mockAppServiceName = "mockappservicename";
const mockCosmosDBName = "mockcosmosdbname";

/**
 * Models the functionality of acquireVsCodeApi() from vscode for use
 * in development environment.
 *
 * Mimics VSCode API by using native postMessage API to mimic postMessage from
 * VSCode.
 */
const mockVsCodeApi = () => ({
  postMessage: (message: any) => {
    if (process.env.NODE_ENV === DEVELOPMENT) {
      switch (message.command) {
        case "alert":
          console.log("Command: ", message.alert);
          break;
        case EXTENSION_COMMANDS.GET_FRAMEWORKS:
          window.postMessage(
            {
              command: EXTENSION_COMMANDS.GET_FRAMEWORKS,
              payload: {
                scope:message.payload && message.payload.scope ? message.payload.scope : "",
                frameworks: [
                  {
                    name: "React",
                    displayName: "React",
                    icon: "",
                    summary: "JavaScript framework",
                    description:
                      "React is a component-based open source JavaScript library for building interfaces for single page applications. It is used for handling view layer for web and mobile apps. React allows you to design simple views for each state in your application, and React will efficiently update and render just the right components when your data changes.  \r\n\r\n  \r\nMore information about React can be found [here](https://reactjs.org).\r\n",
                    author: "Facebook",
                    order: 1,
                    metadataType: "Framework",
                    licenses:
                      "[React](https://github.com/facebook/react/blob/master/LICENSE)  \n[Create React App](https://github.com/facebook/create-react-app/blob/master/LICENSE)",
                    licenseTerms: [
                      {
                        text: "React",
                        url:
                          "https://github.com/facebook/react/blob/master/LICENSE"
                      },
                      {
                        text: "Create React App",
                        url:
                          "https://github.com/facebook/create-react-app/blob/master/LICENSE"
                      }
                    ],
                    platforms: ["Web"],
                    languages: ["Any"],
                    tags: {
                      version: "16.8.4",
                      latestVersion: "16.8.4",
                      preview: false,
                      enabled: true,
                      type: "frontend"
                    }
                  },
                  {
                    name: "Angular",
                    displayName: "Angular",
                    summary: "JavaScript framework",
                    description:
                      "Angular is a platform that makes it easy to build applications with the web. Angular combines declarative templates, dependency injection, end to end tooling, and integrated best practices to solve development challenges. Angular empowers developers to build applications that live on the web, mobile, or the desktop.\r\n\r\nMore information about Angular can be found [here](https://angular.io).\r\n",
                    author: "Google",
                    order: 1,
                    metadataType: "Framework",
                    licenses:
                      "[Angular](https://github.com/angular/angular/blob/master/LICENSE)  \n[Angular CLI](https://github.com/angular/angular-cli/blob/master/LICENSE)",
                    licenseTerms: [
                      {
                        text: "Angular",
                        url:
                          "https://github.com/angular/angular/blob/master/LICENSE"
                      },
                      {
                        text: "Angular CLI",
                        url:
                          "https://github.com/angular/angular-cli/blob/master/LICENSE"
                      }
                    ],
                    platforms: ["Web"],
                    languages: ["Any"],
                    tags: {
                      version: "7.2.0",
                      latestVersion: "",
                      preview: false,
                      enabled: true,
                      type: "frontend"
                    }
                  },
                  {
                    name: "Vue",
                    displayName: "Vue.js",
                    summary: "JavaScript framework",
                    description:
                      "Vue is a lightweight, progressive JavaScript framework for building user interfaces. Vue is heavily focused on the view layer, and is designed to be simple and flexible.\r\n\r\nMore information about Vue can be found [here](https://vuejs.org/).\r\n",
                    author: "Evan You",
                    order: 1,
                    metadataType: "Framework",
                    licenses:
                      "[Vue](https://github.com/vuejs/vue/blob/dev/LICENSE)  \n[Vue CLI](https://github.com/vuejs/vue-cli/blob/dev/LICENSE)",
                    licenseTerms: [
                      {
                        text: "Vue",
                        url: "https://github.com/vuejs/vue/blob/dev/LICENSE"
                      },
                      {
                        text: "Vue CLI",
                        url: "https://github.com/vuejs/vue-cli/blob/dev/LICENSE"
                      }
                    ],
                    platforms: ["Web"],
                    languages: ["Any"],
                    tags: {
                      version: "2.6.6",
                      latestVersion: "2.6.8",
                      preview: true,
                      enabled: true,
                      type: "frontend"
                    }
                  },
                  {
                    name: "Node",
                    displayName: "Node.js/Express",
                    icon: "",
                    summary: "JavaScript framework",
                    description:
                      "Node.js is an open source server environment based on JavaScript that helps you build fast and scalable network applications. Node.js uses an event-driven, non-blocking I/O model that makes it lightweight and efficient, perfect for data-intensive real-time applications that run across distributed devices. Node.js runs across various platforms like Windows, Linux, Unix, and Mac OS X.\r\n\r\nMore information about Node.js can be found [here](https://nodejs.org).\r\n",
                    author: "Various",
                    order: 1,
                    metadataType: "Framework",
                    licenses:
                      "[Node](https://github.com/nodejs/node/blob/master/LICENSE)  \n[Express](https://github.com/expressjs/express/blob/master/LICENSE)  \n[Express Generator](https://github.com/expressjs/generator/blob/master/LICENSE)",
                    licenseTerms: [
                      {
                        text: "Node",
                        url:
                          "https://github.com/nodejs/node/blob/master/LICENSE"
                      },
                      {
                        text: "Express",
                        url:
                          "https://github.com/expressjs/express/blob/master/LICENSE"
                      },
                      {
                        text: "Express Generator",
                        url:
                          "https://github.com/expressjs/generator/blob/master/LICENSE"
                      }
                    ],
                    platforms: ["Web"],
                    languages: ["Any"],
                    tags: {
                      version: "10.15.0",
                      latestVersion: "10.15.0",
                      preview: false,
                      enabled: true,
                      type: "backend"
                    }
                  },
                  {
                    name: "Moleculer",
                    displayName: "Moleculer",
                    summary: "JavaScript framework",
                    author: "Various",
                    order: "1",
                    licenses:
                      "[Moleculer](https://github.com/moleculerjs/moleculer/blob/master/LICENSE)",
                    platforms: ["Web"],
                    languages: ["Any"],
                    tags: {
                      version: "0.14.3",
                      latestVersion: "0.14.3",
                      preview: false
                    }
                  },
                  {
                    name: "Flask",
                    displayName: "Flask",
                    summary: "Python framework",
                    description:
                      "Flask is a python microframework with a small core for building web applications. It is based on [Werkzeug](https://www.palletsprojects.com/p/werkzeug/) and [Jinja](https://www.palletsprojects.com/p/jinja/). It is licensed under [BSD](https://github.com/pallets/flask/blob/master/LICENSE) license.\r\nIt is developed and supported by Pallets organization.\r\n\r\nMore information on Flask can be found [here](http://flask.pocoo.org/)\r\n",
                    author: "Various",
                    order: 1,
                    metadataType: "Framework",
                    licenses:
                      "[Flask](https://github.com/pallets/flask/blob/master/LICENSE)",
                    licenseTerms: [
                      {
                        text: "Flask",
                        url:
                          "https://github.com/pallets/flask/blob/master/LICENSE"
                      }
                    ],
                    platforms: ["Web"],
                    languages: ["Any"],
                    tags: {
                      version: "1.0.3",
                      latestVersion: "1.0.6",
                      preview: false,
                      enabled: true,
                      type: "backend"
                    }
                  }
                ],
                isPreview: true,
                projectType: "FullStackWebApp"
              }
            },
            "*"
          );
          break;
        case EXTENSION_COMMANDS.GET_LATEST_VERSION:
            const min=1;
            const max=8;
            const latestVersion = (Math.floor(Math.random() * (+max - +min)) + +min) % 2 === 0;
            window.postMessage(
              {
                command: EXTENSION_COMMANDS.GET_LATEST_VERSION,
                payload: {
                  scope:message.payload && message.payload.scope ? message.payload.scope : "",
                  latestVersion,
                }
              },
              "*"
            );
            break;
        case EXTENSION_COMMANDS.GET_PAGES:
          window.postMessage(
            {
              command: EXTENSION_COMMANDS.GET_PAGES,
              payload: {
                scope:message.payload && message.payload.scope ? message.payload.scope : "",
                pages: [
                  {
                    templateId: "wts.Page.React.Blank",
                    name: "Blank",
                    defaultName: "Blank",
                    description:
                      "A blank page for you to build your web application from scratch.",
                    richDescription:
                      "This is the most basic page. A blank canvas to mold into whatever you wish. The blank page leaves pretty much everything up to you.",
                    author: "Microsoft",
                    version: "1.0.0",
                    icon: "",
                    displayOrder: 0,
                    isHidden: false,
                    isGroupExclusiveSelection: false,
                    genGroup: 0,
                    multipleInstance: true,
                    itemNameEditable: true,
                    licenses: [
                      {
                        text: "Bootstrap",
                        url:
                          "https://github.com/twbs/bootstrap/blob/master/LICENSE"
                      }
                    ],
                    dependencies: [],
                    templateType: "Page",
                    rightClickEnabled: true,
                    requiredVisualStudioWorkloads: []
                  },
                  {
                    templateId: "wts.Page.React.Grid",
                    name: "Grid",
                    defaultName: "Grid",
                    description:
                      "Simple image and text components which are organized into a grid.",
                    richDescription:
                      "A page displaying simple image and text components which are organized into a grid. Grid pages are a system for creating order among elements in a website.",
                    author: "Microsoft",
                    version: "1.0.0",
                    icon: "",
                    displayOrder: 1,
                    isHidden: false,
                    isGroupExclusiveSelection: false,
                    genGroup: 0,
                    multipleInstance: true,
                    itemNameEditable: true,
                    licenses: [
                      {
                        text: "Bootstrap",
                        url:
                          "https://github.com/twbs/bootstrap/blob/master/LICENSE"
                      }
                    ],
                    dependencies: [],
                    templateType: "Page",
                    rightClickEnabled: true,
                    requiredVisualStudioWorkloads: []
                  },
                  {
                    templateId: "wts.Page.React.List",
                    name: "List",
                    defaultName: "List",
                    description: "Add and remove text from an adaptive list.",
                    richDescription:
                      "The list page allows you to add custom text in the form of an adaptive list. This pattern is frequently used for blog pages and messaging apps. If a database is selected from the Azure Cloud Services the list page will automatically connect to the deployed Azure database.",
                    author: "Microsoft",
                    version: "1.0.0",
                    icon: "",
                    displayOrder: 1,
                    isHidden: false,
                    isGroupExclusiveSelection: false,
                    genGroup: 0,
                    multipleInstance: true,
                    itemNameEditable: true,
                    licenses: [
                      {
                        text: "Bootstrap",
                        url:
                          "https://github.com/twbs/bootstrap/blob/master/LICENSE"
                      }
                    ],
                    dependencies: [],
                    templateType: "Page",
                    rightClickEnabled: true,
                    requiredVisualStudioWorkloads: []
                  },
                  {
                    templateId: "wts.Page.React.MasterDetail",
                    name: "Master Detail",
                    defaultName: "Master Detail",
                    description:
                      "A master pane and a details pane for content.",
                    richDescription:
                      "The master-detail page has a master pane and a details pane for content. When an item in the master list is selected, the details pane is updated. This pattern is frequently used for email and address books.",
                    author: "Microsoft",
                    version: "1.0.0",
                    icon: "",
                    displayOrder: 1,
                    isHidden: false,
                    isGroupExclusiveSelection: false,
                    genGroup: 0,
                    multipleInstance: true,
                    itemNameEditable: true,
                    licenses: [
                      {
                        text: "Bootstrap",
                        url:
                          "https://github.com/twbs/bootstrap/blob/master/LICENSE"
                      }
                    ],
                    dependencies: [],
                    templateType: "Page",
                    rightClickEnabled: true,
                    requiredVisualStudioWorkloads: []
                  }
                ]
              }
            },
            "*"
          );
          break;
        case EXTENSION_COMMANDS.GET_DEPENDENCY_INFO:
          window.postMessage(
            {
              command: EXTENSION_COMMANDS.GET_DEPENDENCY_INFO,
              payload: {
                scope:message.payload && message.payload.scope ? message.payload.scope : "",
                dependency: "node",
                installed: true
              }
            },
            "*"
          );
          window.postMessage(
            {
              command: EXTENSION_COMMANDS.GET_DEPENDENCY_INFO,
              payload: {
                scope:message.payload && message.payload.scope ? message.payload.scope : "",
                dependency: "python",
                installed: false
              }
            },
            "*"
          );
          break;
        case EXTENSION_COMMANDS.NAME_COSMOS:
          window.postMessage(
            {
              module: EXTENSION_MODULES.AZURE,
              command: EXTENSION_COMMANDS.NAME_COSMOS,
              payload: {
                scope:message.payload && message.payload.scope ? message.payload.scope : "",
                isAvailable: message.appName.length > 0
              },
              message: DEV_NO_ERROR_MSG,
              errorType: DEV_NO_ERROR_TYPE
            },
            "*"
          );
          break;
        case EXTENSION_COMMANDS.NAME_APP_SERVICE:
          const isAvailable = message.appName.length > 3
          const reason = isAvailable ? undefined : 'Invalid name';
          window.postMessage(
            {
              module: EXTENSION_MODULES.AZURE,
              command: EXTENSION_COMMANDS.NAME_APP_SERVICE,
              payload: {
                scope:message.payload && message.payload.scope ? message.payload.scope : "",
                reason,
                isAvailable
              },
              message: DEV_NO_ERROR_MSG,
              errorType: DEV_NO_ERROR_TYPE
            },
            "*"
          );
          break;
        case EXTENSION_COMMANDS.GET_SUBSCRIPTION_DATA_FOR_COSMOS:
          // produces locations and resource groups in development
          window.postMessage(
            {
              module: EXTENSION_MODULES.AZURE,
              command: EXTENSION_COMMANDS.GET_SUBSCRIPTION_DATA_FOR_COSMOS,
              payload: {
                scope:message.payload && message.payload.scope ? message.payload.scope : "",
                locations: mockLocations,
                resourceGroups: mockResourceGroups,
                validName: mockCosmosDBName
              }
            },
            "*"
          );
          break;
        case EXTENSION_COMMANDS.GET_SUBSCRIPTION_DATA_FOR_APP_SERVICE:
          // produces locations and resource groups in development
          window.postMessage(
            {
              module: EXTENSION_MODULES.AZURE,
              command: EXTENSION_COMMANDS.GET_SUBSCRIPTION_DATA_FOR_APP_SERVICE,
              payload: {
                scope:message.payload && message.payload.scope ? message.payload.scope : "",
                locations: mockLocations,
                resourceGroups: mockResourceGroups,
              }
            },
            "*"
          );
          break;
        case EXTENSION_COMMANDS.GET_VALID_APP_SERVICE_NAME:
          window.postMessage(
            {
              module: EXTENSION_MODULES.AZURE,
              command: EXTENSION_COMMANDS.GET_VALID_APP_SERVICE_NAME,
              payload: {
                scope:message.payload && message.payload.scope ? message.payload.scope : "",
                validName: mockAppServiceName
              }
            },
            "*"
          );
          break;
        case EXTENSION_COMMANDS.GENERATE:
          window.postMessage(
            {
              command: EXTENSION_COMMANDS.GEN_STATUS_MESSAGE,
              payload: {
                scope:message.payload && message.payload.scope ? message.payload.scope : "",
                status: "updated status message..."
              }
            },
            "*"
          );
          window.postMessage(
            {
              command: EXTENSION_COMMANDS.GEN_STATUS,
              payload: {
                scope:message.payload && message.payload.scope ? message.payload.scope : "",
                templates: {
                  success: true,
                  failure: false
                },
                cosmos: {
                  success: false,
                  failure: true
                },
                appService: {
                  success: true,
                  failure: false
                }
              }
            },
            "*"
          );
          break;
        case EXTENSION_COMMANDS.GET_OUTPUT_PATH:
          // produces a mock login response from VSCode in development
          window.postMessage(
            {
              command: EXTENSION_COMMANDS.GET_OUTPUT_PATH,
              payload: {
                scope:message.payload && message.payload.scope ? message.payload.scope : "",
                outputPath: "/generic_output_path"
              }
            },
            "*"
          );
          break;
        case EXTENSION_COMMANDS.GET_TEMPLATE_INFO:
          // produces a mock login response from VSCode in development
          window.postMessage(
            {
              command: EXTENSION_COMMANDS.GET_TEMPLATE_INFO,
              payload: {
                scope:message.payload && message.payload.scope ? message.payload.scope : "",
                wizardVersion: "1.x",
                templatesVersion: "1.x",
                preview:false
              }
            },
            "*"
          );
          break;
        case EXTENSION_COMMANDS.GEN_STATUS:
          break;
        case EXTENSION_COMMANDS.AZURE_LOGIN:
          // produces a mock login response from VSCode in development
          window.postMessage(
            {
              command: "login",
              payload: {
                scope:message.payload && message.payload.scope ? message.payload.scope : "",
                email: "devEnvironment2@email.com",
                subscriptions: mockSubscriptions
              }
            },
            "*"
          );
          break;
        case EXTENSION_COMMANDS.PROJECT_PATH_VALIDATION:
          // produces a mock validation response from VSCode in development
          window.postMessage(
            {
              command: EXTENSION_COMMANDS.PROJECT_PATH_VALIDATION,
              payload: {
                scope:message.payload && message.payload.scope ? message.payload.scope : "",
                projectPathValidation: {
                  isValid: true,
                  error: ""
                }
              }
            },
            "*"
          );
          break;
        case EXTENSION_COMMANDS.RESET_PAGES:
          window.postMessage(
            {
              command: EXTENSION_COMMANDS.RESET_PAGES,
              payload: {
                scope:message.payload && message.payload.scope ? message.payload.scope : "",
                internalName: message.payload.internalName,
                resetPages: true
              }
            },
            "*"
          );
      }
    }
  }
});

export default mockVsCodeApi;
