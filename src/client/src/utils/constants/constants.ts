import { defineMessages } from "react-intl";

const PROJECT_NAME_CHARACTER_LIMIT = 50;

const PAGE_NAME_CHARACTER_LIMIT = 50;

const WEB_TEMPLATE_STUDIO_LINKS = {
  REPO: "https://github.com/Microsoft/WebTemplateStudio",
  ISSUES: "https://github.com/Microsoft/WebTemplateStudio/issues"
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

enum FRAMEWORK_TYPE {
  FRONTEND = "frontend",
  BACKEND = "backend"
}

enum KEY_EVENTS {
  ENTER = "Enter",
  SPACE = " ",
  TAB = "Tab"
}

const TELEMETRY = {
  CLOSE_GENERATION_MODAL_BUTTON: "Generate Modal, close button",
  CREATE_NEW_PROJECT_BUTTON: "Generate Modal, create new project button"
}

enum PLATFORM {
  WEB = "Web",
}

export {
  PRODUCTION,
  SERVICE_KEYS,
  INTL_MESSAGES,
  ARIA_LABELS_NAVIGATION,
  DEVELOPMENT,
  TEST,
  PROJECT_NAME_CHARACTER_LIMIT,
  PAGE_NAME_CHARACTER_LIMIT,
  WEB_TEMPLATE_STUDIO_LINKS,
  FRAMEWORK_TYPE,
  KEY_EVENTS,
  PAYLOAD_MESSAGES_TEXT,
  TELEMETRY,
  PLATFORM
};