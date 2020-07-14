import * as vscode from "vscode";
import { WizardServant, IPayloadResponse } from "../wizardServant";
import { ExtensionCommand } from "../constants/extension";
import { Logger, LogLevel } from "../utils/logger";

type ILoggingPayload = {
  level: LogLevel;
  data: string;
};

export class LoggerModule extends WizardServant {
  clientCommandMap: Map<ExtensionCommand, (message: any) => Promise<IPayloadResponse>> = new Map([
    [ExtensionCommand.Log, this.logFromWizard],
    [ExtensionCommand.OpenLog, this.openLog],
  ]);

  private async logFromWizard(message: any): Promise<IPayloadResponse> {
    const logData = message.logData as ILoggingPayload;
    Logger.appendLog("WIZARD", logData.level, logData.data);
    Logger.display();
    return { payload: null };
  }

  private async openLog(): Promise<IPayloadResponse> {
    const logDocument = await vscode.workspace.openTextDocument(Logger.filename);
    await vscode.window.showTextDocument(logDocument);
    return { payload: null };
  }
}
