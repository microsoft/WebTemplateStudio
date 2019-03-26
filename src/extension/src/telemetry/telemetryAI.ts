import * as vscode from 'vscode';
import TelemetryReporter from 'vscode-extension-telemetry';
import { getPackageInfo } from './getPackageInfo';
import { IActionContext, ITelemetryReporter, callWithTelemetryAndCatchErrors } from './callWithTelemetryAndErrorHandling';
import { TelemetryEventName } from '../constants'; 

export type IActionContext = IActionContext;

export class TelemetryAI {

    private static telemetryReporter: ITelemetryReporter;
    private wizardSessionStartTime: number;
    private pageStartTimer: number;

    constructor(context: vscode.ExtensionContext){
        TelemetryAI.telemetryReporter = this.createTelemetryReporter(context);
        this.wizardSessionStartTime = Date.now();
        this.pageStartTimer = this.wizardSessionStartTime;
    }

    private createTelemetryReporter(ctx: vscode.ExtensionContext) {
        const { extensionName, extensionVersion, aiKey } = getPackageInfo(ctx);
        const reporter: TelemetryReporter = new TelemetryReporter(extensionName, extensionVersion, aiKey);
        // adding to the array of disposables
        ctx.subscriptions.push(reporter);
        return reporter;
    }

    public trackExtensionStartUpTime(eventName : string = TelemetryEventName.ExtensionLaunch, extensionStartTime: number){
        this.trackTimeDuration(eventName, extensionStartTime, Date.now());
    }

    /*
    * @param pageToTrack is the name of the page the wizard is on before the user clicks the next button; this page name will be sent to Application Insights as property
    * 
    */
    public trackWizardPageTimeToNext(pageToTrack: string){
        this.trackTimeDuration(TelemetryEventName.PageChange, this.pageStartTimer, Date.now(), {"Page-Name": pageToTrack});
        this.pageStartTimer = Date.now();
    }

    public trackWizardTotalSessionTimeToGenerate(eventName : string = TelemetryEventName.WizardSession){
        this.trackWizardPageTimeToNext("Summary-Page");
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

    public callWithTelemetryAndCatchHandleErrors<T>(callbackId: string, callback: (this: IActionContext) => T | PromiseLike<T>): Promise<T | undefined>{
        return callWithTelemetryAndCatchErrors(callbackId,callback, TelemetryAI.telemetryReporter);
    }
}

