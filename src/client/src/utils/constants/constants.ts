import { defineMessages } from "react-intl";

const PROJECT_NAME_CHARACTER_LIMIT = 50;

const PAGE_NAME_CHARACTER_LIMIT = 50;

const MAX_PAGES_ALLOWED = 20;

const WEB_TEMPLATE_STUDIO_LINKS = {
  REPO: "https://github.com/Microsoft/WebTemplateStudio",
  ISSUES: "https://github.com/Microsoft/WebTemplateStudio/issues"
};

const AZURE_LINKS = {
  CREATE_NEW_SUBSCRIPTION: "https://account.azure.com/signup?showCatalog=True&appId=SubscriptionsBlade",
  CREATE_NEW_RESOURCE_GROUP: "https://portal.azure.com/#create/Microsoft.ResourceGroup",
  APP_SERVICE_PLAN:"https://azure.microsoft.com/en-us/pricing/details/app-service/plans/",
  VIEW_GENERATE_APP_SERVICE: "https://portal.azure.com/#blade/HubsExtension/BrowseResourceBlade/resourceType/Microsoft.Web%2Fsites",
  VIEW_GENERATE_MONGO_DB: "https://portal.azure.com/#blade/HubsExtension/BrowseResourceBlade/resourceType/Microsoft.DocumentDb%2FdatabaseAccounts"
};

const PRODUCTION = "production";
const DEVELOPMENT = "development";
const TEST = "test";

const INTL_MESSAGES = defineMessages({
  EMPTY_FIELD: {
    id: "constants.emptyField",
    defaultMessage: "{fieldId} field cannot be empty"
  }
});

const BOOTSTRAP_LICENSE =
  "https://github.com/twbs/bootstrap/blob/master/LICENSE";

const ARIA_LABELS_NAVIGATION = defineMessages({
  ARIA_LABELS_MESSAGES: {
    id: "ariaLabels.pageNavigation",
    defaultMessage: "{pagesText} page"
  },
  ARIA_LABELS_CURRENT_PAGE: {
    id: "ariaLabels.currentPage",
    defaultMessage: "Currently on {pagesText} page"
  },
  ARIA_LABELS_DISABLED_PAGE: {
    id: "ariaLabels.disabledPage",
    defaultMessage: "{pagesText} page disabled"
  }
});

const PAYLOAD_MESSAGES_TEXT = {
  SWITCH_FRAMEWORKS_TEXT: "Sending framework change request...",
  SENT_GENERATION_INFO_TEXT: "Sending generation info..."
};

const SERVICE_KEYS = {
  COSMOS_DB: "cosmosDB",
  APP_SERVICE: "appService"
};

enum AzureResourceType {
  AppService = "app-service",
  Cosmos = "cosmos"
}

const AZURE = {
  COSMOS_APIS: {
    MONGO: "MongoDB",
    SQL: "SQL"
  },
  DEFAULT_LOCATION: "Central US",
  DEFAULT_RESOURCE_GROUP: ""
}

enum FRAMEWORK_TYPE {
  FRONTEND = "frontend",
  BACKEND = "backend"
}

enum KEY_EVENTS {
  ENTER = "Enter",
  SPACE = " ",
  TAB = "Tab"
}

enum SERVICE_GROUPS {
  HOSTING = "CloudHosting",
  DATABASE = "CloudDatabase",
}

const TELEMETRY = {
  CLOSE_GENERATION_MODAL_BUTTON: "Generate Modal, close button",
  CREATE_NEW_PROJECT_BUTTON: "Generate Modal, create new project button"
}

export {
  PRODUCTION,
  SERVICE_KEYS,
  INTL_MESSAGES,
  ARIA_LABELS_NAVIGATION,
  AZURE,
  DEVELOPMENT,
  TEST,
  PROJECT_NAME_CHARACTER_LIMIT,
  PAGE_NAME_CHARACTER_LIMIT,
  MAX_PAGES_ALLOWED,
  WEB_TEMPLATE_STUDIO_LINKS,
  AZURE_LINKS,
  FRAMEWORK_TYPE,
  KEY_EVENTS,
  PAYLOAD_MESSAGES_TEXT,
  BOOTSTRAP_LICENSE,
  TELEMETRY,
  AzureResourceType,
  SERVICE_GROUPS
};
