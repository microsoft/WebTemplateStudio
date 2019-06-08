/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import { MessageItem, window } from "vscode";
import { DialogResponses, DialogMessages } from "../constants";
import { reportAnIssue } from "./reportAnIssue";
import { IParsedError, parseError } from "./parseError";
import { ExtensionContext } from "vscode";
import { Logger } from "../utils/logger";

export interface IActionContext {
  properties: TelemetryProperties;
  measurements: TelemetryMeasurements;

  /**
   * Defaults to `false`. If true, successful events are suppressed from telemetry, but cancel and error events are still sent.
   */
  suppressTelemetry?: boolean;

  /**
   * Defaults to `false`
   */
  suppressErrorDisplay?: boolean;

  /**
   * Defaults to `false`
   */
  rethrowError?: boolean;
}

export interface ITelemetryReporter {
  sendTelemetryEvent(
    eventName: string,
    properties?: { [key: string]: string | undefined },
    measures?: { [key: string]: number | undefined }
  ): void;
}

export interface TelemetryProperties {
  /**
   * Defaults to `false`
   * This is used to more accurately track usage, since activation events generally shouldn't 'count' as usage
   */
  isActivationEvent?: "true" | "false";
  result?: "Succeeded" | "Failed" | "Canceled";
  error?: string;
  errorMessage?: string;
  cancelStep?: string;
  [key: string]: string | undefined;
}

export interface TelemetryMeasurements {
  duration?: number;
  [key: string]: number | undefined;
}

export async function callWithTelemetryAndCatchErrors<T>(
  vscodeContext: ExtensionContext,
  callbackId: string,
  callback: (this: IActionContext) => T | PromiseLike<T>,
  telemetryReporter: ITelemetryReporter
): Promise<T | undefined> {
  const [start, actionContext] = initContext();

  try {
    return await (<Promise<T>>Promise.resolve(callback.call(actionContext)));
  } catch (error) {
    handleError(vscodeContext, actionContext, callbackId, error);
    return undefined;
  } finally {
    handleTelemetry(actionContext, callbackId, start, telemetryReporter);
  }
}
function initContext(): [number, IActionContext] {
  const start: number = Date.now();
  const context: IActionContext = {
    properties: {
      isActivationEvent: "false",
      cancelStep: "",
      result: "Succeeded",
      stack: "",
      error: "",
      errorMessage: ""
    },
    measurements: {
      duration: 0
    },
    suppressTelemetry: false,
    suppressErrorDisplay: false,
    rethrowError: false
  };
  return [start, context];
}

// tslint:disable-next-line:no-any
function handleError(
  vscodeContext: ExtensionContext,
  context: IActionContext,
  callbackId: string,
  error: any
): void {
  const errorData: IParsedError = parseError(error);
  if (errorData.isUserCancelledError) {
    context.properties.result = "Canceled";
    context.suppressErrorDisplay = true;
    context.rethrowError = false;
  } else {
    context.properties.result = "Failed";
    context.properties.error = errorData.errorType;
    context.properties.errorMessage = errorData.message;
    context.properties.stack = errorData.stack ? errorData.stack : undefined;
    if (context.suppressTelemetry) {
      context.properties.suppressTelemetry = "true";
    }
  }

  if (!context.suppressErrorDisplay) {
    let message: string;
    if (errorData.message.includes("\n")) {
      console.log(errorData.message);
      message = DialogMessages.multiLineError;
    } else {
      message = errorData.message;
    }

    // don't wait
    window
      .showErrorMessage(message, DialogResponses.reportAnIssue)
      .then((result: MessageItem | undefined) => {
        if (result === DialogResponses.reportAnIssue) {
          reportAnIssue(vscodeContext, callbackId, errorData);
        }
      });
  }
  Logger.appendLog("EXTENSION", "error", error);
  Logger.display("error");
  //Logger.display("error");
  if (context.rethrowError) {
    throw error;
  }
}

function handleTelemetry(
  context: IActionContext,
  callbackId: string,
  start: number,
  telemetryReporter: ITelemetryReporter
): void {
  /**
   * WTS App Specific Telemetry Collection Enabled
   */
  // For suppressTelemetry=true, ignore successful results
  if (!context.suppressTelemetry) {
    const end: number = Date.now();
    context.measurements.duration = (end - start) / 1000;

    // Note: The id of the extension is automatically prepended to the given callbackId (e.g. "vscode-cosmosdb/")
    telemetryReporter.sendTelemetryEvent(
      callbackId,
      context.properties,
      context.measurements
    );
  }
}
