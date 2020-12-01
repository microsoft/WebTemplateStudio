import { platform } from "../../../AppContext";
import { frontendImage, noImage, pageImage, projectTypeImage, serviceImage } from "./mockSvgData";

const projectTypes = [
  {
    name: "Tabbed",
    displayName: "Tabbed",
    summary: "Tabbed summary ***",
    icon: projectTypeImage,
    order: 1,
  },
  {
    name: "Drawer",
    displayName: "Drawer",
    summary: "Drawer summary ***",
    icon: noImage,
    order: 2,
  },
];

const frameworks = [
  {
    name: "React Native MOCK",
    displayName: "React Native MOCK",
    icon: frontendImage,
    summary: "JavaScript framework by Facebook",
    description:
      "MOCKED DESCRIPTION React is a component-based open source JavaScript library for building interfaces for single page applications. It is used for handling view layer for web and mobile apps. React allows you to design simple views for each state in your application, and React will efficiently update and render just the right components when your data changes.  \r\n\r\n  \r\nMore information about React can be found [here](https://reactjs.org).\r\n",
    author: "Facebook",
    order: 1,
    metadataType: "Framework",
    licenses:
      "[React Native](https://github.com/facebook/react-native/blob/master/LICENSE)  \n[Create React NativeApp](https://github.com/facebook/create-react-native-app/blob/master/LICENSE)",
    licenseTerms: [
      {
        text: "React N",
        url: "https://github.com/facebook/react-native/blob/master/LICENSE",
      },
      {
        text: "Create React Native App",
        url: "https://github.com/facebook/create-react-native-app/blob/master/LICENSE",
      },
    ],
    platforms: platform,
    languages: ["Any"],
    tags: {
      version: "*.*.*",
      latestVersion: "*.*.*",
      preview: false,
      enabled: true,
      type: "frontend",
      checkVersionPackage: "",
      requirements: "",
      isRequirementInstalled: true,
    },
  },
];

const licenses = [
  {
    text: "Node",
    url: "https://github.com/nodejs/node/blob/master/LICENSE",
  },
  {
    text: "Gulp",
    url: "https://github.com/gulpjs/gulp/blob/master/LICENSE",
  },
];

const templatesInfo = {
  wizardVersion: "1.x",
  templatesVersion: "1.x",
  itemNameValidationConfig: {
    regexs: [
      {
        name: "nameStartLetter",
        pattern: "^[A-Za-z]",
      },
      {
        name: "nameContainLettersNumbersDashes",
        pattern: "^((?!\\d)[a-zA-Z0-9\\s_-]+)$",
      },
    ],
    reservedNames: [],
    validateDefaultNames: false,
    validateEmptyNames: true,
    validateExistingNames: true,
  },
  projectNameValidationConfig: {
    regexs: [
      {
        name: "nameStartLetter",
        pattern: "^[A-Za-z]",
      },
      {
        name: "nameContainLettersNumbersDashes",
        pattern: "^((?!\\d)[a-zA-Z0-9_-]+)$",
      },
    ],
    reservedNames: [],
    validateEmptyNames: true,
    validateExistingNames: false,
  },
  preview: false,
  platform: platform,
};

const pages = (frontendFramework: string) => {
  return [
    {
      templateId: `wts.Page.${frontendFramework}.Blank`,
      name: "Blank",
      defaultName: "Blank",
      description: "A blank page for you to build your web application from scratch.",
      richDescription:
        "This is the most basic page. A blank canvas to mold into whatever you wish. The blank page leaves pretty much everything up to you.",
      author: "Microsoft",
      version: "1.0.0",
      icon: pageImage,
      displayOrder: 0,
      isHidden: false,
      isGroupExclusiveSelection: false,
      genGroup: 0,
      multipleInstance: true,
      itemNameEditable: true,
      licenses: [
        {
          text: "Bootstrap",
          url: "https://github.com/twbs/bootstrap/blob/master/LICENSE",
        },
      ],
      dependencies: [],
      templateType: "Page",
      rightClickEnabled: true,
      requiredVisualStudioWorkloads: [],
    },
  ];
};

const features = [
  {
    templateId: "wts.Feature.Azure.AppService",
    templateGroupIdentity: "wts.Feature.Azure.AppService",
    name: "App Service",
    defaultName: "App Service",
    description: "Quickly build, deploy, and scale your web apps with confidence.",
    richDescription:
      "Quickly build, deploy, and scale web apps with confidence. Meet rigorous, enterprise-grade performance, security, and compliance requirements by using the fully managed platform for your operational and monitoring tasks.",
    author: "Microsoft",
    version: "1.0.0",
    icon: serviceImage,
    displayOrder: 1,
    isHidden: false,
    group: "CloudHosting",
    isGroupExclusiveSelection: false,
    genGroup: 0,
    multipleInstance: false,
    itemNameEditable: true,
    licenses: [],
    dependencies: [],
    requirements: [],
    exclusions: [],
    requiredSdks: [],
    templateType: "feature",
    rightClickEnabled: true,
    requiredVisualStudioWorkloads: [],
  },
  {
    templateId: "wts.Feature.Azure.Cosmos.Mongo",
    templateGroupIdentity: "wts.Feature.Azure.Cosmos",
    name: "Cosmos DB",
    defaultName: "Cosmos DB",
    description:
      "Connect your web app to a distributed database service to access and query data using SQL or MongoDB API.",
    richDescription:
      "Azure Cosmos DB is Microsoft's proprietary globally-distributed, multi-model database service for managing data on a global scale. It offers a variety of APIs for your database including Azure Table, Core (SQL), MongoDB and Gremlin (GraphQL). Web Template Studio offers you the functionality to deploy a Cosmos DB instance from the wizard itself and select an initial location to deploy your database with the ability to scale it to multiple locations at a future time. As an added feature, deploying with the MongoDB API enables you to quickly connect the project Web Template Studio generates to your database instance.",
    author: "Microsoft",
    version: "1.0.0",
    icon: serviceImage,

    displayOrder: 1,
    isHidden: false,
    group: "CloudDatabase",
    isGroupExclusiveSelection: false,
    genGroup: 0,
    multipleInstance: false,
    itemNameEditable: true,
    licenses: [],
    dependencies: [],
    requirements: [],
    exclusions: [],
    requiredSdks: [],
    templateType: "feature",
    rightClickEnabled: true,
    requiredVisualStudioWorkloads: [],
  },
  {
    templateId: "wts.Feature.Azure.Cosmos.SQL",
    templateGroupIdentity: "wts.Feature.Azure.Cosmos",
    name: "Cosmos DB",
    defaultName: "Cosmos DB",
    description:
      "Connect your web app to a distributed database service to access and query data using SQL or MongoDB API.",
    richDescription:
      "Azure Cosmos DB is Microsoft's proprietary globally-distributed, multi-model database service for managing data on a global scale. It offers a variety of APIs for your database including Azure Table, Core (SQL), MongoDB and Gremlin (GraphQL). Web Template Studio offers you the functionality to deploy a Cosmos DB instance from the wizard itself and select an initial location to deploy your database with the ability to scale it to multiple locations at a future time. As an added feature, deploying with the MongoDB API enables you to quickly connect the project Web Template Studio generates to your database instance.",
    author: "Microsoft",
    version: "1.0.0",
    icon: serviceImage,
    displayOrder: 1,
    isHidden: false,
    group: "CloudDatabase",
    isGroupExclusiveSelection: false,
    genGroup: 0,
    multipleInstance: false,
    itemNameEditable: true,
    licenses: [],
    dependencies: [],
    requirements: [],
    exclusions: [],
    requiredSdks: [],
    templateType: "feature",
    rightClickEnabled: true,
    requiredVisualStudioWorkloads: [],
  },
];

export { projectTypes, frameworks, licenses, templatesInfo, pages, features };
