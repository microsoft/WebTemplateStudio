import * as vscode from 'vscode';
import TelemetryReporter from 'vscode-extension-telemetry';
import { getPackageInfo } from './getPackageInfo';


export class TelemetryAI {

    private telemetryReporter: TelemetryReporter;
    private lastTrackTimeStamp: number = this.extensionStartTime;

    constructor(context: vscode.ExtensionContext, private extensionStartTime: number){
        this.telemetryReporter = this.createTelemetryReporter(context);
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
            duration: endTime - startTime
        };
        this.telemetryReporter.sendTelemetryEvent(eventName, undefined, measurement)
    }
    private updateLastTrackTimeStamp(){
        this.lastTrackTimeStamp = Date.now();
    }
}

