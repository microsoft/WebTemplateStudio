import * as vscode from 'vscode';
import TelemetryReporter from 'vscode-extension-telemetry';
import { getPackageInfo } from './getPackageInfo';
import { IActionContext, ITelemetryReporter, callWithTelemetryAndErrorHandling } from './callWithTelemetryAndErrorHandling'

export type IActionContext = IActionContext;

export class TelemetryAI {

    private static telemetryReporter: ITelemetryReporter;

    constructor(context: vscode.ExtensionContext, private extensionStartTime: number = Date.now()){
        TelemetryAI.telemetryReporter = this.createTelemetryReporter(context);
        this.trackDurationExtensionStartUp();
    }

    private createTelemetryReporter(ctx: vscode.ExtensionContext) {
        const { extensionName, extensionVersion, aiKey } = getPackageInfo(ctx);
        const reporter: TelemetryReporter = new TelemetryReporter(extensionName, extensionVersion, aiKey);
        // adding to the array of disposables
        ctx.subscriptions.push(reporter);
        return reporter;
    }

    private trackDurationExtensionStartUp(eventName : string = "Wizard Launch Time", startTime : number = this.extensionStartTime, endTime : number = Date.now()){
        this.trackTimeDuration(eventName, this.extensionStartTime, endTime);
    }

    public trackWizardTimeToGenerate(eventName : string = "Wizard Launch To Generate Time", startTime : number = this.extensionStartTime, endTime : number = Date.now()){
        this.trackTimeDuration(eventName, this.extensionStartTime, endTime);
    }

    public trackCustomEventTime(customEventName: string, startTime: number, endTime: number = Date.now(), customEventProperties?: { [key: string]: string | undefined }){
        this.trackTimeDuration(customEventName, startTime, endTime, customEventProperties);
    }

    private trackTimeDuration(eventName : string, startTime : number, endTime : number, properties?: { [key: string]: string | undefined }){
        var measurement = {
            duration: (endTime - startTime) / 1000
        };
        TelemetryAI.telemetryReporter.sendTelemetryEvent(eventName, properties, measurement)
    }

    public async callFunctionsAndSendResult<T>(callbackId: string, callback: (this: IActionContext) => T | PromiseLike<T>): Promise<T | undefined>{
        return await callWithTelemetryAndErrorHandling(callbackId,callback, TelemetryAI.telemetryReporter);
    }
}

