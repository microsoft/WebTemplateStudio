import { PLATFORM } from "../../../utils/constants/constants";
import { frontendImage, noImage, pageImage, projectTypeImage, serviceImage } from "./mockSvgData";

const platform = PLATFORM.REACTNATIVE;

const projectTypes = [
  {
    name: "Tabbed",
    displayName: "Tabbed",
    summary: "Tabbed summary ***",
    body: "Tabbed description***",
    description: "Tabbed rich description***",
    "licenses": "[React Native](https://github.com/facebook/react-native/blob/master/LICENSE)\n [React Navigation](https://github.com/react-navigation/react-navigation/blob/main/packages/core/LICENSE)",
    icon: projectTypeImage,
    order: 1,
  },
  {
    name: "Drawer",
    displayName: "Drawer",
    summary: "Drawer summary ***",
    body: "Drawer description***",
    description: "Drawer rich description***",
    "licenses": "[React Native](https://github.com/facebook/react-native/blob/master/LICENSE)\n [React Navigation](https://github.com/react-navigation/react-navigation/blob/main/packages/core/LICENSE)",
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

const features = [{}];

export {platform, projectTypes, frameworks, licenses, templatesInfo, pages, features };
