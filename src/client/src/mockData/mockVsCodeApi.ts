import {
  DEVELOPMENT,
  TEST
} from "../utils/constants/constants";

import * as mockAzureModule from "./extensionModules/mockAzureModule";
import * as mockLoggerModule from "./extensionModules/mockLoggerModule";
import * as mockGenerationModule from "./extensionModules/mockGenerationModule";
import { EXTENSION_COMMANDS } from "../utils/constants/commands";

/**
 * Models the functionality of acquireVsCodeApi() from vscode for use
 * in development environment.
 *
 * Mimics VSCode API by using native postMessage API to mimic postMessage from
 * VSCode.
 */
const mockVsCodeApi = () => ({
  postMessage: (message: any) => {
    if (process.env.NODE_ENV === DEVELOPMENT || process.env.NODE_ENV === TEST) {
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
                      type: "backend",
                      linuxVersion: "node|12-lts"
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
                      preview: false,
                      type: "backend",
                      linuxVersion: "node|12-lts"
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
                      type: "backend",
                      linuxVersion: "python|3.7"
                    }
                  },
                  {
                    name: "AspNet",
                    displayName: "ASP.NET",
                    summary: ".NET framework",
                    description: "",
                    author: "Microsoft",
                    order: 1,
                    metadataType: "Framework",
                    licenses:
                      "[AspNet](https://github.com/dotnet/aspnetcore/blob/master/LICENSE.txt)",
                    licenseTerms: [
                      {
                        text: "AspNet",
                        url:
                          "https://github.com/dotnet/aspnetcore/blob/master/LICENSE.txt"
                      }
                    ],
                    platforms: ["Web"],
                    languages: ["Any"],
                    tags: {
                      version: "3.1.5",
                      latestVersion: "3.1.5",
                      preview: true,
                      enabled: true,
                      type: "backend",
                      linuxVersion: "DOTNETCORE|3.1"
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
            const latestVersion = "v3.1.5";
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
        case EXTENSION_COMMANDS.GET_FEATURES:
          window.postMessage(
            {
              command: EXTENSION_COMMANDS.GET_FEATURES,
              payload: {
                scope:message.payload && message.payload.scope ? message.payload.scope : "",
                features: [
                  {
                    templateId: "wts.Feature.Azure.AppService",
                    templateGroupIdentity: "wts.Feature.Azure.AppService",
                    name: "App Service",
                    defaultName: "App Service",
                    description: "Quickly build, deploy, and scale your web apps with confidence.",
                    richDescription: "Quickly build, deploy, and scale web apps with confidence. Meet rigorous, enterprise-grade performance, security, and compliance requirements by using the fully managed platform for your operational and monitoring tasks.",
                    author: "Microsoft",
                    version: "1.0.0",
                    icon: "",
                    displayOrder: 1,
                    isHidden: false,
                    group: "CloudHosting",
                    isGroupExclusiveSelection: false,
                    genGroup: 0,
                    multipleInstance: false,
                    itemNameEditable: false,
                    licenses: [],
                    dependencies: [],
                    requirements: [],
                    exclusions: [],
                    requiredSdks: [],
                    templateType: "feature",
                    rightClickEnabled: true,
                    requiredVisualStudioWorkloads: []
                  },
                  {
                    templateId: "wts.Feature.Azure.Cosmos.Mongo",
                    templateGroupIdentity: "wts.Feature.Azure.Cosmos",
                    name: "Cosmos DB",
                    defaultName: "Cosmos DB",
                    description: "Connect your web app to a distributed database service to access and query data using SQL or MongoDB API.",
                    richDescription: "Azure Cosmos DB is Microsoft's proprietary globally-distributed, multi-model database service for managing data on a global scale. It offers a variety of APIs for your database including Azure Table, Core (SQL), MongoDB and Gremlin (GraphQL). Web Template Studio offers you the functionality to deploy a Cosmos DB instance from the wizard itself and select an initial location to deploy your database with the ability to scale it to multiple locations at a future time. As an added feature, deploying with the MongoDB API enables you to quickly connect the project Web Template Studio generates to your database instance.",
                    author: "Microsoft",
                    version: "1.0.0",
                    icon: "",
                    displayOrder: 1,
                    isHidden: false,
                    group: "CloudDatabase",
                    isGroupExclusiveSelection: false,
                    genGroup: 0,
                    multipleInstance: false,
                    itemNameEditable: false,
                    licenses: [],
                    dependencies: [],
                    requirements: [],
                    exclusions: [],
                    requiredSdks: [],
                    templateType: "feature",
                    rightClickEnabled: true,
                    requiredVisualStudioWorkloads: []
                  },
                  {
                    templateId: "wts.Feature.Azure.Cosmos.SQL",
                    templateGroupIdentity: "wts.Feature.Azure.Cosmos",
                    name: "Cosmos DB",
                    defaultName: "Cosmos DB",
                    description: "Connect your web app to a distributed database service to access and query data using SQL or MongoDB API.",
                    richDescription: "Azure Cosmos DB is Microsoft's proprietary globally-distributed, multi-model database service for managing data on a global scale. It offers a variety of APIs for your database including Azure Table, Core (SQL), MongoDB and Gremlin (GraphQL). Web Template Studio offers you the functionality to deploy a Cosmos DB instance from the wizard itself and select an initial location to deploy your database with the ability to scale it to multiple locations at a future time. As an added feature, deploying with the MongoDB API enables you to quickly connect the project Web Template Studio generates to your database instance.",
                    author: "Microsoft",
                    version: "1.0.0",
                    icon: "",
                    displayOrder: 1,
                    isHidden: false,
                    group: "CloudDatabase",
                    isGroupExclusiveSelection: false,
                    genGroup: 0,
                    multipleInstance: false,
                    itemNameEditable: false,
                    licenses: [],
                    dependencies: [],
                    requirements: [],
                    exclusions: [],
                    requiredSdks: [],
                    templateType: "feature",
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
                dependency: message.payload.dependency,
                installed: message.payload.dependency === "node"
              }
            },
            "*"
          );
          break;
        case EXTENSION_COMMANDS.VALIDATE_COSMOS_NAME:
          mockAzureModule.validateCosmosName(message);
          break;
        case EXTENSION_COMMANDS.VALIDATE_APPSERVICE_NAME:
          mockAzureModule.validateAppServiceName(message);
          break;
        case EXTENSION_COMMANDS.GET_RESOURCE_GROUPS:
          mockAzureModule.getResourceGroups(message);
          break;
        case EXTENSION_COMMANDS.GET_LOCATIONS:
          mockAzureModule.getLocations(message);
          break;
        case EXTENSION_COMMANDS.GET_VALID_APP_SERVICE_NAME:
          mockAzureModule.getValidAppServiceName(message);
          break;
        case EXTENSION_COMMANDS.GET_VALID_COSMOS_NAME:
          mockAzureModule.getValidCosmosName(message);
          break;
        case EXTENSION_COMMANDS.GENERATE:
          mockGenerationModule.generate(message);
          break;
        case EXTENSION_COMMANDS.OPEN_PROJECT_IN_VSCODE:
          mockGenerationModule.openProjectVSCode(message);
          break;
        case EXTENSION_COMMANDS.GET_OUTPUT_PATH:
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
          window.postMessage(
            {
              command: EXTENSION_COMMANDS.GET_TEMPLATE_INFO,
              payload: {
                scope:message.payload && message.payload.scope ? message.payload.scope : "",
                wizardVersion: "1.x",
                templatesVersion: "1.x",
                itemNameValidationConfig:{
                  regexs:[{
                    "name":"nameStartLetter",
                    "pattern" : "^[A-Za-z]"
                  },
                  {
                    "name":"nameContainLettersNumbersDashes",
                    "pattern" : "^((?!\\d)[a-zA-Z0-9\\s_-]+)$"
                  }],
                  reservedNames:[],
                  validateDefaultNames:false,
                  validateEmptyNames:true,
                  validateExistingNames:true
                },
                projectNameValidationConfig:{
                  regexs:[{
                    "name":"nameStartLetter",
                    "pattern" : "^[A-Za-z]"
                  },
                  {
                    "name":"nameContainLettersNumbersDashes",
                    "pattern" : "^((?!\\d)[a-zA-Z0-9_-]+)$"
                  }],
                  reservedNames:[],
                  validateEmptyNames:true,
                  validateExistingNames:false
                },
                preview:false,
                platform:"Web"
              }
            },
            "*"
          );
          break;
        case EXTENSION_COMMANDS.GET_PROJECT_TYPES:
            window.postMessage(
              {
                command: EXTENSION_COMMANDS.GET_PROJECT_TYPES,
                payload: {
                  scope:message.payload && message.payload.scope ? message.payload.scope : "",
                  projectTypes:[{name:"FullStackWebApp"}]
                }
              },
              "*"
            );
            break;
        case EXTENSION_COMMANDS.GEN_STATUS:
          break;
          case EXTENSION_COMMANDS.AZURE_LOGIN:
            mockAzureModule.login(message);
            break;
            case EXTENSION_COMMANDS.AZURE_LOGOUT:
              mockAzureModule.logout(message);
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
          
        case EXTENSION_COMMANDS.LOG:
          mockLoggerModule.logFromWizard(message);
          break;
        case EXTENSION_COMMANDS.OPEN_LOG:
          mockLoggerModule.openLog();
          break;
      }
    }
  }
});

export default mockVsCodeApi;
