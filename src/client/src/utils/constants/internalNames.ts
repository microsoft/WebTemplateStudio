const WIZARD_PROJECT_TYPE = {
  FULL_STACK_APP: "FullStackWebApp",
  RN_TABBED_APP: "Tabbed",
  RN_DRAWER_APP: "Drawer",
}

const FRONTEND_FRAMEWORKS = {
  REACT: "React",
  ANGULAR: "Angular",
  VUE: "Vue",
  RN: "ReactNative",
}

const BACKEND_FRAMEWORKS = {
  NODE: "Node",
  MOLECULER: "Moleculer",
  ASPNET: "AspNet",
  FLASK: "Flask",
}

const PAGES={
  REACT_BLANK_PAGE: "wts.Page.React.Blank",
  REACT_CONTENT_GRID: "wts.Page.React.Grid",
  REACT_MASTER_DETAIL: "wts.Page.React.MasterDetail",
  REACT_LIST: "wts.Page.React.List",
  ANGULAR_BLANK_PAGE: "wts.Page.Angular.Blank",
  ANGULAR_CONTENT_GRID: "wts.Page.Angular.Grid",
  ANGULAR_MASTER_DETAIL: "wts.Page.Angular.MasterDetail",
  ANGULAR_LIST: "wts.Page.Angular.List",
  VUE_BLANK_PAGE: "wts.Page.Vue.Blank",
  VUE_CONTENT_GRID: "wts.Page.Vue.Grid",
  VUE_MASTER_DETAIL: "wts.Page.Vue.MasterDetail",
  VUE_LIST: "wts.Page.Vue.List",
}

const WIZARD_CONTENT_FEATURES = {
  APP_SERVICE: "wts.Feature.Azure.AppService",
  AZURE: "wts.Feature.Azure",
  COSMOS_DB: "wts.Feature.Azure.Cosmos",
  COSMOS_DB_MONGO: "wts.Feature.Azure.Cosmos.Mongo",
  COSMOS_DB_SQL: "wts.Feature.Azure.Cosmos.SQL",
};

export {
  WIZARD_CONTENT_FEATURES,
  WIZARD_PROJECT_TYPE,
  FRONTEND_FRAMEWORKS,
  BACKEND_FRAMEWORKS,
  PAGES
};