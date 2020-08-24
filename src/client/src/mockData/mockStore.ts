import { ISelected } from "../types/selected";
import { FormattedMessage } from "react-intl";
import { AppState } from "../store/combineReducers";
import { ModalType } from "../store/navigation/typeKeys";
import { getNavItems } from "../utils/routes/routes";

export const getISelected = () => {
  const selected: ISelected = {
    title:"title1",
    internalName:"internamName1"
  };
  return selected;
};

export const getInitialState = (): AppState => {
  const initialState: AppState={
    templates: {
      backendOptions: [],
      frontendOptions: [],
      pageOptions: [],
      featureOptions: [],
      projectTypesOptions: []
    },
    config:{
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
        },
        originRoute:''
      },
      previewStatus: false,
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
      },
      versions: {
        templatesVersion: '0.0.1',
        wizardVersion: '0.0.2'
      },
      azureProfileData: {
        subscriptions: [],
        email:''
      },
      platform: "Web"
    },
    userSelection: {
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
      pages: [{
        author:"Microsoft",
        defaultName:"Blank",
        internalName:"wts.Page.React.Blank",
        isValidTitle:true,
        licenses:[{
          text:"Bootstrap",
          url:"https://github.com/twbs/bootstrap/blob/master/LICENSE"
        }],
        title:"Blank",
        id:"0.7087795384523403"
      }],
      outputPathObject: {
        outputPath: '/generic_output_path'
      },
      projectNameObject: {
        projectName: 'myApp',
        validation: {
          isValid: true,
          error: "" as unknown as FormattedMessage.MessageDescriptor,
          isDirty: true
        }
      },
      projectType:"",
      services: {
        cosmosDB: null,
        appService: null      
      }
    },
    navigation:{
      modals: {
        openModal: {
          modalType: null,
          modalData: null
        }
      },
      routesNavItems:getNavItems("Web")
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

const loadFeatures = (): Array<any> => {
  const appServiceFeature ={
    body: "Quickly build, deploy, and scale your web apps with confidence.",
    internalName: "wts.Feature.Azure.AppService",
    templateGroupIdentity: "wts.Feature.Azure.AppService",
    licenses: [],
    longDescription: "Quickly build, deploy, and scale web apps with confidence. Meet rigorous, enterprise-grade performance, security, and compliance requirements by using the fully managed platform for your operational and monitoring tasks.",
    selected: false,
    svgUrl: "",
    title: "App Service",
    defaultName: "App Service",
    isValidTitle: true,
    author: "Microsoft",
    group: "CloudHosting"
  };
  const cosmosDbFeature = {
    body: "Connect your web app to a distributed database service to access and query data using SQL or MongoDB API.",
    internalName: "wts.Feature.Azure.Cosmos",
    templateGroupIdentity: "wts.Feature.Azure.Cosmos",
    licenses: [],
    longDescription: "Azure Cosmos DB is Microsoft's proprietary globally-distributed, multi-model database service for managing data on a global scale. It offers a variety of APIs for your database including Azure Table, Core (SQL), MongoDB and Gremlin (GraphQL). Web Template Studio offers you the functionality to deploy a Cosmos DB instance from the wizard itself and select an initial location to deploy your database with the ability to scale it to multiple locations at a future time. As an added feature, deploying with the MongoDB API enables you to quickly connect the project Web Template Studio generates to your database instance.",
    selected: false,
    svgUrl: "",
    title: "Cosmos DB",
    defaultName: "Cosmos DB",
    isValidTitle: true,
    author: "Microsoft",
    group: "CloudDatabase"
  };
  return new Array<any>(
    appServiceFeature,
    cosmosDbFeature);
}

const getSubscriptionsSelector = (): Array<Subscription> => {
  const subscriptions = Array.from(Array(2).keys()).map(
    (item: number) => {
      return {
        name: `subscription ${item}`,
        isMicrosoftLearn: false
      };
    }
  );
  
  subscriptions.push({
    name: "Microsoft Learn Subscription",
    isMicrosoftLearn: true
  });

  return subscriptions;
}

export const addFrontEndFrameworksOptions = (store: AppState)=>{
  store.templates.frontendOptions = [
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
  store.templates.backendOptions = [
    {
      author: 'Various',
      body: 'JavaScript framework',
      internalName: 'Node',
      licenses: ['[Node](https://github.com/nodejs/node/blob/master/LICENSE)','[Express](https://github.com/expressjs/express/blob/master/LICENSE)','[Express Generator](https://github.com/expressjs/generator/blob/master/LICENSE)'],
      longDescription: 'Node.js is an open source server environment based on JavaScript that helps you build fast and scalable network applications. Node.js uses an event-driven, non-blocking I/O model that makes it lightweight and efficient, perfect for data-intensive real-time applications that run across distributed devices. Node.js runs across various platforms like Windows, Linux, Unix, and Mac OS X.\r\n\r\nMore information about Node.js can be found [here](https://nodejs.org).\r\n',
      position: 1,
      selected: false,
      svgUrl: '',
      title: 'Node.js/Express',
      version: '12.0.0',
      linuxVersion: 'node|12-lts',
      latestVersionLoaded: true
    },
    {
      author: 'Various',
      body: 'JavaScript framework',
      internalName: 'Moleculer',
      licenses: ['[Moleculer](https://github.com/moleculerjs/moleculer/blob/master/LICENSE)'],
      selected: false,
      svgUrl: '',
      title: 'Moleculer',
      version: '0.14.3',
      linuxVersion: 'node|12-lts',
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
      linuxVersion: 'python|3.7',
      latestVersionLoaded: true
    },
    {
      author: 'Microsoft',
      body: 'ASP.NET Framework',
      internalName: 'AspNet',
      licenses: ['[AspNet](https://github.com/dotnet/aspnetcore/blob/master/LICENSE.txt)'],
      longDescription: 'ASP.NET long description',
      position: 1,
      selected: false,
      svgUrl: '',
      title: 'ASP.NET',
      version: '3.1.5',
      linuxVersion: 'DOTNETCORE|3.1',
      latestVersionLoaded: true
    }


  ];
  return store;
}

export const addFeaturesOptions = (store: AppState) => {
  store.templates.featureOptions = loadFeatures();
}

export const getServicesGroups = (store: AppState) => {
  const groups = store.templates.featureOptions.map(g => g.group) as string[];
  return [...new Set(groups)];
}

export const loadMasters = (store: AppState) =>{
  store.templates.pageOptions = loadPages("React");
}

export const setSubscriptions = (store: AppState) => {
  store.config.azureProfileData.subscriptions = getSubscriptionsSelector();
}

export const setBackendFramework = (store: AppState, internalName: string) => {
  store.userSelection.backendFramework.internalName = internalName;
}

export const setFrontendFramework = (store: AppState, internalName: string) => {
  store.userSelection.backendFramework.internalName = internalName;
}

export const setOpenModal = (store: AppState, modalType: ModalType) => {
  store.navigation.modals.openModal.modalType = modalType;
}

export const setSelectedRoute = (store: AppState, seletedRoute: string) => {
  //store.navigation.routes.selected = seletedRoute;
  store.navigation.routesNavItems.forEach(route => {route.isSelected=false});
  store.navigation.routesNavItems.filter(route => route.route === seletedRoute)[0].isSelected=true;
}

export const setAzureEmail = (store: AppState, email = "test@test.com") => {
  store.config.azureProfileData.email = email;
}

export const setGenerationData = (store: AppState) => {
  store.userSelection.pages = [getISelected()];
  store.userSelection.services.appService = {
    subscription: "",
    resourceGroup: "",
    location: "",
    siteName: "",
    internalName: "",
  };
  store.userSelection.services.cosmosDB = {
    subscription: "",
    resourceGroup: "",
    location: "",
    accountName: "",
    api: "",
    internalName: "",
    groupName: "",
  };
  return 3;
};