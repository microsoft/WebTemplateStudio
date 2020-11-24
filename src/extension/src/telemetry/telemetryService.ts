import * as vscode from "vscode";
import TelemetryReporter from "vscode-extension-telemetry";
import { getPackageInfo } from "../utils/packageInfo";
import {
  IActionContext as dd,
  ITelemetryReporter,
  callWithTelemetryAndCatchErrors,
} from "./callWithTelemetryAndErrorHandling";

export type IActionContext = dd;

export interface ITelemetryService {
  wizardSessionStartTime: number;
  pageStartTime: number;
  trackEvent(eventName: string, properties?: { [key: string]: string | undefined }): void;
  trackEventWithDuration(
    eventName: string,
    startTime: number,
    endTime: number,
    properties?: { [key: string]: string | undefined }
  ): void;
  callWithTelemetryAndCatchHandleErrors<T>(
    callbackId: string,
    callback: (this: IActionContext) => T | PromiseLike<T>
  ): Promise<T | undefined>;
}

export class TelemetryService implements ITelemetryService {
  private static telemetryReporter: ITelemetryReporter;
  public wizardSessionStartTime: number;
  public pageStartTime: number;

  constructor(private vscodeContext: vscode.ExtensionContext) {
    this.wizardSessionStartTime = Date.now();
    this.pageStartTime = this.wizardSessionStartTime;
    TelemetryService.telemetryReporter = this.createTelemetryReporter(vscodeContext);
  }

  private createTelemetryReporter(ctx: vscode.ExtensionContext): TelemetryReporter {
    const { extensionName, extensionVersion, aiKey } = getPackageInfo(ctx);
    const reporter: TelemetryReporter = new TelemetryReporter(extensionName, extensionVersion, aiKey);
    // adding to the array of disposables
    ctx.subscriptions.push(reporter);
    return reporter;
  }

  public trackEvent(eventName: string, properties?: { [key: string]: string | undefined }): void {
    TelemetryService.telemetryReporter.sendTelemetryEvent(eventName, properties);
  }

  public trackEventWithDuration(
    eventName: string,
    startTime: number,
    endTime: number = Date.now(),
    properties?: { [key: string]: string | undefined }
  ): void {
    const measurement = {
      duration: (endTime - startTime) / 1000,
    };
    TelemetryService.telemetryReporter.sendTelemetryEvent(eventName, properties, measurement);
  }

  public callWithTelemetryAndCatchHandleErrors<T>(
    callbackId: string,
    callback: (this: IActionContext) => T | PromiseLike<T>
  ): Promise<T | undefined> {
    return callWithTelemetryAndCatchErrors(
      this.vscodeContext,
      callbackId,
      callback,
      TelemetryService.telemetryReporter
    );
  }
}
