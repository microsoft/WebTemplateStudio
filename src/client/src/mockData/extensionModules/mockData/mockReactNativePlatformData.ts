import { PLATFORM } from "../../../utils/constants/constants";
import { frontendImage, noImage, pageImage, projectTypeImage } from "./mockSvgData";

const platform = PLATFORM.REACTNATIVE;
const platformRequirements = [
  {
    name: "Free space on C: > 15 GB",
    isInstalled: true,
  },
  {
    name: "Installed memory >= 16 GB",
    isInstalled: true,
  },
  {
    name: "Windows version > 10.0.16299.0",
    isInstalled: true,
  },
  {
    name: "Developer mode is on",
    isInstalled: true,
  },
  {
    name: "Long path support is enabled",
    isInstalled: true,
  },
  {
    name: "Choco",
    isInstalled: true,
  },
  {
    name: "git",
    isInstalled: true,
  },
  {
    name: "Visual Studio >= 16.5 with UWP and Desktop/C++",
    isInstalled: false,
  },
  {
    name: "NodeJS 12, 13 or 14 installed",
    isInstalled: true,
  },
  {
    name: "Chrome",
    isInstalled: true,
  },
  {
    name: "Yarn",
    isInstalled: true,
  },
];

const projectTypes = [
  {
    name: "Tabbed",
    displayName: "Tabbed",
    summary: "Tabbed summary ***",
    body: "Tabbed description***",
    description: "Tabbed rich description***",
    licenses:
      "[React Native](https://github.com/facebook/react-native/blob/master/LICENSE)\n [React Navigation](https://github.com/react-navigation/react-navigation/blob/main/packages/core/LICENSE)",
    icon: projectTypeImage,
    order: 1,
  },
  {
    name: "Drawer",
    displayName: "Drawer",
    summary: "Drawer summary ***",
    body: "Drawer description***",
    description: "Drawer rich description***",
    licenses:
      "[React Native](https://github.com/facebook/react-native/blob/master/LICENSE)\n [React Navigation](https://github.com/react-navigation/react-navigation/blob/main/packages/core/LICENSE)",
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
  platformRequirements: platformRequirements,
};

const pages = (frontendFramework: string): any => {
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
    {
      templateId: `wts.Page.${frontendFramework}.PageType2`,
      name: "PageType2",
      defaultName: "PageType2",
      description: "A page type 2 for you to build your web application from scratch.",
      richDescription:
        "This is the basic page type 2. A page where to mold into whatever you wish. The blank page leaves pretty much everything up to you.",
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
          text: "React Native",
          url: "https://github.com/facebook/react-native/blob/master/LICENSE",
        },
        {
          text: "React Native",
          url: "https://github.com/facebook/react-native/blob/master/LICENSE",
        },
      ],
      dependencies: [],
      templateType: "Page",
      rightClickEnabled: true,
      requiredVisualStudioWorkloads: [],
    },
    {
      templateId: `wts.Page.${frontendFramework}.Settings`,
      name: "Settings",
      defaultName: "Settings",
      description: "A settings for you to build your web application from scratch.",
      richDescription:
        "This is the basic page settings. A page where to mold into whatever you wish. The settings page leaves pretty much everything up to you.",
      author: "Microsoft",
      version: "1.0.0",
      icon: pageImage,
      displayOrder: 0,
      isHidden: false,
      isGroupExclusiveSelection: false,
      genGroup: 0,
      multipleInstance: false,
      itemNameEditable: false,
      licenses: [
        {
          text: "Component",
          url: "https://component/LICENSE",
        },
      ],
      dependencies: [],
      templateType: "Page",
      rightClickEnabled: true,
      requiredVisualStudioWorkloads: [],
    },
  ];
};

const features = [{}];

export { features, frameworks, licenses, pages, platform, projectTypes, templatesInfo };
