import * as vscode from 'vscode';
import TelemetryReporter from 'vscode-extension-telemetry';
import { getPackageInfo } from './getPackageInfo';
import { IActionContext, ITelemetryReporter, callWithTelemetryAndCatchErrors } from './callWithTelemetryAndErrorHandling';

export type IActionContext = IActionContext;

export class TelemetryAI {

    private static telemetryReporter: ITelemetryReporter;
    private wizardSessionStartTime: number;

    constructor(context: vscode.ExtensionContext, private extensionStartTime: number = Date.now()){
        TelemetryAI.telemetryReporter = this.createTelemetryReporter(context);
        this.trackExtensionStartUpTime();
        this.wizardSessionStartTime = Date.now();
    }

    private createTelemetryReporter(ctx: vscode.ExtensionContext) {
        const { extensionName, extensionVersion, aiKey } = getPackageInfo(ctx);
        const reporter: TelemetryReporter = new TelemetryReporter(extensionName, extensionVersion, aiKey);
        // adding to the array of disposables
        ctx.subscriptions.push(reporter);
        return reporter;
    }

    private trackExtensionStartUpTime(eventName : string = "Wizard Launch Time"){
        this.trackTimeDuration(eventName, this.extensionStartTime, Date.now());
    }

    public trackWizardTotalSessionTimeToGenerate(eventName : string = "Wizard Launch To Generate Time"){
        this.trackTimeDuration(eventName, this.wizardSessionStartTime, Date.now());
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

    public resetWizardSessionStartTime(){
        this.wizardSessionStartTime = Date.now();
    }

    public callWithTelemetryAndCatchHandleErrors<T>(callbackId: string, callback: (this: IActionContext) => T | PromiseLike<T>): Promise<T | undefined>{
        return callWithTelemetryAndCatchErrors(callbackId,callback, TelemetryAI.telemetryReporter);
    }
}

