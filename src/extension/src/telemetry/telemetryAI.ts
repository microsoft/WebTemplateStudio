import * as vscode from 'vscode';
import TelemetryReporter from 'vscode-extension-telemetry';
import { getPackageInfo } from './getPackageInfo';
import { IActionContext, ITelemetryReporter, callWithTelemetryAndErrorHandling } from './callWithTelemetryAndErrorHandling'

export type IActionContext = IActionContext;

export class TelemetryAI {

    private static telemetryReporter: ITelemetryReporter;
    private lastTrackTimeStamp: number = this.extensionStartTime;

    constructor(context: vscode.ExtensionContext, private extensionStartTime: number){
        TelemetryAI.telemetryReporter = this.createTelemetryReporter(context);
        this.trackDurationExtensionStartUp();
        this.updateLastTrackTimeStamp();
    }

    private createTelemetryReporter(ctx: vscode.ExtensionContext) {
        const { extensionName, extensionVersion, aiKey } = getPackageInfo(ctx);
        const reporter: TelemetryReporter = new TelemetryReporter(extensionName, extensionVersion, aiKey);
        // adding to the array of disposables
        ctx.subscriptions.push(reporter);
        return reporter;
    }
    private updateLastTrackTimeStamp(){
        this.lastTrackTimeStamp = Date.now();
    }
    private trackDurationExtensionStartUp(){
        this.trackTimeDuration("ExtensionStartUpTime", Date.now(), this.extensionStartTime);
    }

    public trackDurationOnPageRouterChange(previousPageName : string){
        this.trackTimeDuration(previousPageName, Date.now(), this.lastTrackTimeStamp);
        this.updateLastTrackTimeStamp();
    }
    
    public trackDurationStartToGenerate(){
        this.trackTimeDuration("StartToGenerateTime", Date.now(), this.extensionStartTime);
    }

    private trackTimeDuration(eventName : string, endTime : number, startTime : number){
        var measurement = {
            duration: (endTime - startTime) / 1000
        };
        TelemetryAI.telemetryReporter.sendTelemetryEvent(eventName, undefined, measurement)
    }

    public async callAndHandleError<T>(callbackId: string, callback: (this: IActionContext) => T | PromiseLike<T>): Promise<T | undefined>{
        return await callWithTelemetryAndErrorHandling(callbackId,callback, TelemetryAI.telemetryReporter)
    }
}

