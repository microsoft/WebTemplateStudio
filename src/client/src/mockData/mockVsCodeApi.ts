import {
  EXTENSION_COMMANDS,
  DEVELOPMENT,
  EXTENSION_MODULES
} from "../utils/constants";

const WEST_US: string = "WEST US";
const mockLocations = Array.from({ length: 12 }).fill({
  label: WEST_US,
  value: WEST_US
});

const RESOURCE_GROUP_MOCK: string = "resourceGroupMock";
const mockResourceGroups = Array.from({ length: 12 }).fill({
  label: RESOURCE_GROUP_MOCK,
  value: RESOURCE_GROUP_MOCK
});

const DEV_NO_ERROR_MSG: string = "in development, no error message";
const DEV_NO_ERROR_TYPE: string = "in development, no error type";

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
                frameworks: [
                  {
                    name: "ReactJS",
                    displayName: "React",
                    icon: "",
                    summary: "JavaScript framework",
                    description:
                      "React is a component-based open source JavaScript library for building interfaces for single page applications. It is used for handling view layer for web and mobile apps. React allows you to design simple views for each state in your application, and React will efficiently update and render just the right components when your data changes.  \r\n\r\n  \r\nMore information about React can be found [here](https://reactjs.org).\r\n",
                    author: "Facebook",
                    order: 1,
                    metadataType: "Framework",
                    licenses:
                      "[ReactJS](https://github.com/facebook/react/blob/master/LICENSE)  \n[Create React App](https://github.com/facebook/create-react-app/blob/master/LICENSE)",
                    licenseTerms: [
                      {
                        text: "ReactJS",
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
                      preview: true,
                      enabled: true,
                      type: "frontend"
                    }
                  },
                  {
                    name: "NodeJS",
                    displayName: "Node.js/Express",
                    icon: "",
                    summary: "JavaScript framework",
                    description:
                      "Node.js is an open source server environment based on JavaScript that helps you build fast and scalable network applications. Node.js uses an event-driven, non-blocking I/O model that makes it lightweight and efficient, perfect for data-intensive real-time applications that run across distributed devices. Node.js runs across various platforms like Windows, Linux, Unix, and Mac OS X.\r\n\r\nMore information about Node.js can be found [here](https://nodejs.org).\r\n",
                    author: "Various",
                    order: 1,
                    metadataType: "Framework",
                    licenses:
                      "[NodeJS](https://github.com/nodejs/node/blob/master/LICENSE)  \n[ExpressJS](https://github.com/expressjs/express/blob/master/LICENSE)  \n[ExpressJS Generator](https://github.com/expressjs/generator/blob/master/LICENSE)",
                    licenseTerms: [
                      {
                        text: "NodeJS",
                        url:
                          "https://github.com/nodejs/node/blob/master/LICENSE"
                      },
                      {
                        text: "ExpressJS",
                        url:
                          "https://github.com/expressjs/express/blob/master/LICENSE"
                      },
                      {
                        text: "ExpressJS Generator",
                        url:
                          "https://github.com/expressjs/generator/blob/master/LICENSE"
                      }
                    ],
                    platforms: ["Web"],
                    languages: ["Any"],
                    tags: {
                      version: "10.15.0",
                      preview: false,
                      enabled: true,
                      type: "backend"
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
        case EXTENSION_COMMANDS.GET_PAGES:
          window.postMessage(
            {
              command: EXTENSION_COMMANDS.GET_PAGES,
              payload: {
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
                      "A page displaying simple image and text components which are organized into a grid.",
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
                    emplateId: "wts.Page.React.List",
                    name: "List",
                    defaultName: "List",
                    description:
                      "The list page allows you to add and remove text from an adaptive list.",
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
                      "The master-detail page has a master pane and a details pane for content.",
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
                dependency: "python",
                installed: false
              }
            },
            "*"
          );
          break;
        case EXTENSION_COMMANDS.NAME_FUNCTIONS:
          window.postMessage(
            {
              module: EXTENSION_MODULES.AZURE,
              command: EXTENSION_COMMANDS.NAME_FUNCTIONS,
              payload: {
                isAvailable: message.appName.length > 0
              },
              message: DEV_NO_ERROR_MSG,
              errorType: DEV_NO_ERROR_TYPE
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
                isAvailable: message.appName.length > 0
              },
              message: DEV_NO_ERROR_MSG,
              errorType: DEV_NO_ERROR_TYPE
            },
            "*"
          );
          break;
        case EXTENSION_COMMANDS.SUBSCRIPTION_DATA_COSMOS:
          // produces locations and resource groups in development
          window.postMessage(
            {
              module: EXTENSION_MODULES.AZURE,
              command: EXTENSION_COMMANDS.SUBSCRIPTION_DATA_COSMOS,
              payload: {
                locations: mockLocations,
                resourceGroups: mockResourceGroups
              }
            },
            "*"
          );
          break;
        case EXTENSION_COMMANDS.SUBSCRIPTION_DATA_FUNCTIONS:
          // produces locations and resource groups in development
          window.postMessage(
            {
              module: EXTENSION_MODULES.AZURE,
              command: EXTENSION_COMMANDS.SUBSCRIPTION_DATA_FUNCTIONS,
              payload: {
                locations: mockLocations,
                resourceGroups: mockResourceGroups
              }
            },
            "*"
          );
          break;
        case EXTENSION_COMMANDS.GENERATE:
          // @ts-ignore mocks a generation status message
          window.postMessage(
            {
              command: EXTENSION_COMMANDS.GEN_STATUS_MESSAGE,
              payload: {
                status: "updated status message..."
              }
            },
            "*"
          );
          // @ts-ignore mocks a generation status object
          window.postMessage(
            {
              command: EXTENSION_COMMANDS.GEN_STATUS,
              payload: {
                templates: {
                  success: false,
                  failure: true
                },
                cosmos: {
                  success: true,
                  failure: false
                },
                azureFunctions: {
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
                outputPath: "/generic_output_path"
              }
            },
            "*"
          );
          window.postMessage(
            {
              command: EXTENSION_COMMANDS.GET_PREVIEW_STATUS,
              payload: {
                preview: true
              }
            },
            "*"
          );
          break;
        case EXTENSION_COMMANDS.GET_VERSIONS:
          // produces a mock login response from VSCode in development
          window.postMessage(
            {
              command: EXTENSION_COMMANDS.GET_VERSIONS,
              payload: {
                wizardVersion: "1.x",
                templatesVersion: "1.x"
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
                email: "devEnvironment2@email.com",
                subscriptions: [
                  { value: "GIV.Hackathon", label: "GIV.Hackathon" }
                ]
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
