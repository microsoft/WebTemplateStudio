import { MessageItem } from "vscode";
import * as nls from "vscode-nls";

const localize: nls.LocalizeFunc = nls.config({
  messageFormat: nls.MessageFormat.file
})();


export namespace DialogResponses {
  export const yes: MessageItem = { title: localize("dialog.yes", "Yes") };
  export const no: MessageItem = { title: localize("dialog.no", "No") };
  export const cancel: MessageItem = {
    title: localize("dialog.cancel", "Cancel"),
    isCloseAffordance: true
  };
  export const deleteResponse: MessageItem = {
    title: localize("dialog.delete", "Delete")
  };
  export const learnMore: MessageItem = {
    title: localize("dialog.learnMore", "Learn more")
  };
  export const dontWarnAgain: MessageItem = {
    title: localize("dialog.dontWarnAgain", "Don't warn again")
  };
  export const skipForNow: MessageItem = {
    title: localize("dialog.skipForNow", "Skip for now")
  };
  export const reportAnIssue: MessageItem = {
    title: localize("dialog.reportAnIssue", "Report an issue")
  };
  export const showLog: MessageItem = {
    title: localize("dialog.showLog", "Show log")
  };
}
export namespace DialogMessages {
  export const multiLineError: string = localize(
    "dialog.multilineError",
    "An error has occured. Check output window for more details."
  );
  export const cosmosDBConnectStringReplacePrompt: string = localize(
    "dialog.cosmosDBConnectStringReplacePrompt",
    "Do you want to update the CosmosDB connection string in configuration file?"
  );
  export const resetPagesPrompt: string = localize(
    "dialog.resetPagesPrompt",
    "Are you sure you want to reset all the selected pages?"
  );
  export const logoutPrompt: string = localize(
    "dialog.logoutPrompt",
    "Are you sure you want to sign out of your Azure account?"
  );
}

