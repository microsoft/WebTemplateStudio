import { PLATFORM } from "../../../utils/constants/constants";
import { backendImage, frontendImage, noImage, pageImage, serviceImage } from "./mockSvgData";

const projectTypes = [
  {
    name: "Tabbed", //TODO: need to rework this
  },
];

const frameworkList = [
  {
    name: "React",
    displayName: "React",
    icon: frontendImage,
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
        url: "https://github.com/facebook/react/blob/master/LICENSE",
      },
      {
        text: "Create React App",
        url: "https://github.com/facebook/create-react-app/blob/master/LICENSE",
      },
    ],
    platforms: [PLATFORM.WEB],
    languages: ["Any"],
    tags: {
      version: "16.8.4",
      latestVersion: "16.8.4",
      preview: false,
      enabled: true,
      type: "frontend",
      checkVersionPackage: "npm|react",
      requirements: "node|12.0.x",
      isRequirementInstalled: true,
    },
  },
  {
    name: "Angular",
    displayName: "Angular",
    summary: "JavaScript framework",
    icon: noImage,
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
        url: "https://github.com/angular/angular/blob/master/LICENSE",
      },
      {
        text: "Angular CLI",
        url: "https://github.com/angular/angular-cli/blob/master/LICENSE",
      },
    ],
    platforms: [PLATFORM.WEB],
    languages: ["Any"],
    tags: {
      version: "7.2.0",
      latestVersion: "",
      preview: false,
      enabled: true,
      type: "frontend",
      checkVersionPackage: "npm|@angular/core",
      requirements: "node|12.0.x",
      isRequirementInstalled: false,
    },
  },
  {
    name: "Vue",
    displayName: "Vue.js",
    summary: "JavaScript framework",
    description:
      "Vue is a lightweight, progressive JavaScript framework for building user interfaces. Vue is heavily focused on the view layer, and is designed to be simple and flexible.\r\n\r\nMore information about Vue can be found [here](https://vuejs.org/).\r\n",
    author: "Evan You",
    order: 1,
    icon: frontendImage,
    metadataType: "Framework",
    licenses:
      "[Vue](https://github.com/vuejs/vue/blob/dev/LICENSE)  \n[Vue CLI](https://github.com/vuejs/vue-cli/blob/dev/LICENSE)",
    licenseTerms: [
      {
        text: "Vue",
        url: "https://github.com/vuejs/vue/blob/dev/LICENSE",
      },
      {
        text: "Vue CLI",
        url: "https://github.com/vuejs/vue-cli/blob/dev/LICENSE",
      },
    ],
    platforms: [PLATFORM.WEB],
    languages: ["Any"],
    tags: {
      version: "2.6.6",
      latestVersion: "2.6.8",
      preview: true,
      enabled: true,
      type: "frontend",
      checkVersionPackage: "npm|vue",
      requirements: "node|12.0.x",
      isRequirementInstalled: false,
    },
  },
  {
    name: "Node",
    displayName: "Node.js/Express",
    icon: backendImage,
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
        url: "https://github.com/nodejs/node/blob/master/LICENSE",
      },
      {
        text: "Express",
        url: "https://github.com/expressjs/express/blob/master/LICENSE",
      },
      {
        text: "Express Generator",
        url: "https://github.com/expressjs/generator/blob/master/LICENSE",
      },
    ],
    platforms: [PLATFORM.WEB],
    languages: ["Any"],
    tags: {
      version: "10.15.0",
      latestVersion: "10.15.0",
      preview: false,
      enabled: true,
      type: "backend",
      linuxVersion: "node|12-lts",
      checkVersionPackage: "npm|express",
      requirements: "node|12.0.x",
      isRequirementInstalled: true,
    },
  },
  {
    name: "Moleculer",
    displayName: "Moleculer",
    summary: "JavaScript framework",
    icon: backendImage,
    author: "Various",
    order: "1",
    licenses: "[Moleculer](https://github.com/moleculerjs/moleculer/blob/master/LICENSE)",
    platforms: [PLATFORM.WEB],
    languages: ["Any"],
    tags: {
      version: "0.14.3",
      latestVersion: "0.14.3",
      preview: false,
      type: "backend",
      linuxVersion: "node|12-lts",
      checkVersionPackage: "npm|moleculer",
      requirements: "node|12.0.x",
      isRequirementInstalled: true,
    },
  },
  {
    name: "Flask",
    displayName: "Flask",
    summary: "Python framework",
    icon: backendImage,
    description:
      "Flask is a python microframework with a small core for building web applications. It is based on [Werkzeug](https://www.palletsprojects.com/p/werkzeug/) and [Jinja](https://www.palletsprojects.com/p/jinja/). It is licensed under [BSD](https://github.com/pallets/flask/blob/master/LICENSE) license.\r\nIt is developed and supported by Pallets organization.\r\n\r\nMore information on Flask can be found [here](http://flask.pocoo.org/)\r\n",
    author: "Various",
    order: 1,
    metadataType: "Framework",
    licenses: "[Flask](https://github.com/pallets/flask/blob/master/LICENSE)",
    licenseTerms: [
      {
        text: "Flask",
        url: "https://github.com/pallets/flask/blob/master/LICENSE",
      },
    ],
    platforms: [PLATFORM.WEB],
    languages: ["Any"],
    tags: {
      version: "1.0.3",
      latestVersion: "1.0.6",
      preview: false,
      enabled: true,
      type: "backend",
      linuxVersion: "python|3.7",
      checkVersionPackage: "github|pallets/flask",
      requirements: "python|3.5.x",
      isRequirementInstalled: false,
    },
  },
  {
    name: "AspNet",
    displayName: "ASP.NET",
    summary: ".NET Core",
    description: "",
    author: "Microsoft",
    order: 1,
    metadataType: "Framework",
    icon: backendImage,
    licenses: "[AspNet](https://github.com/dotnet/aspnetcore/blob/master/LICENSE.txt)",
    licenseTerms: [
      {
        text: "AspNet",
        url: "https://github.com/dotnet/aspnetcore/blob/master/LICENSE.txt",
      },
    ],
    platforms: [PLATFORM.WEB],
    languages: ["Any"],
    tags: {
      version: "3.1.5",
      latestVersion: "3.1.5",
      preview: true,
      enabled: true,
      type: "backend",
      linuxVersion: "DOTNETCORE|3.1",
      checkVersionPackage: "github|dotnet/aspnetcore",
      requirements: "netcore|3.1.x",
      isRequirementInstalled: false,
    },
  },

  // REACT NATIVE
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
    platforms: [PLATFORM.RN],
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

const frameworks = (platform: any) => {
  return frameworkList.filter((framework) => framework.platforms.indexOf(platform) > -1);
};

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

const templatesInfo = (platform: any) => {
  return {
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
};

const pages = (platform: string, frontendFramework: string) => {
  let frontendFrameworks = [
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

  switch (platform) {
    case PLATFORM.WEB:
      frontendFrameworks = frontendFrameworks.concat(
        {
          templateId: `wts.Page.${frontendFramework}.Grid`,
          name: "Grid",
          defaultName: "Grid",
          description: "Simple image and text components which are organized into a grid.",
          richDescription:
            "A page displaying simple image and text components which are organized into a grid. Grid pages are a system for creating order among elements in a website.",
          author: "Microsoft",
          version: "1.0.0",
          icon: pageImage,
          displayOrder: 1,
          isHidden: false,
          isGroupExclusiveSelection: false,
          genGroup: 0,
          multipleInstance: false,
          itemNameEditable: false,
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
        {
          templateId: `wts.Page.${frontendFramework}.List`,
          name: "List",
          defaultName: "List",
          description: "Add and remove text from an adaptive list.",
          richDescription:
            "The list page allows you to add custom text in the form of an adaptive list. This pattern is frequently used for blog pages and messaging apps. If a database is selected from the Azure Cloud Services the list page will automatically connect to the deployed Azure database.",
          author: "Microsoft",
          version: "1.0.0",
          icon: pageImage,
          displayOrder: 1,
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
        {
          templateId: `wts.Page.${frontendFramework}.MasterDetail`,
          name: "Master Detail",
          defaultName: "Master Detail",
          description: "A master pane and a details pane for content.",
          richDescription:
            "The master-detail page has a master pane and a details pane for content. When an item in the master list is selected, the details pane is updated. This pattern is frequently used for email and address books.",
          author: "Microsoft",
          version: "1.0.0",
          icon: pageImage,
          displayOrder: 1,
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
        }
      );
      break;
  }
  return frontendFrameworks;
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
