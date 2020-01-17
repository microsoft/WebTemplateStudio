import * as vscode from 'vscode';
import TelemetryReporter from 'vscode-extension-telemetry';
import { getPackageInfo } from './getPackageInfo';
import { IActionContext, ITelemetryReporter, callWithTelemetryAndCatchErrors } from './callWithTelemetryAndErrorHandling';
import { TelemetryEventName, ExtensionCommand } from '../constants'; 
import { WizardServant, IPayloadResponse } from '../wizardServant';

export type IActionContext = IActionContext;

export class TelemetryAI extends WizardServant{
    clientCommandMap: Map<ExtensionCommand, (message: any) => Promise<IPayloadResponse>> = new Map([
        [ExtensionCommand.TrackPageSwitch, this.trackWizardPageTimeToNext],
        [ExtensionCommand.TrackCreateNewProject, this.trackCreateNewProject],
        [ExtensionCommand.TrackOpenAddPagesModal, this.trackOpenAddPagesModal],
        [ExtensionCommand.TrackPressQuickstart, this.trackPressQuickstart],
    ]);

    private static telemetryReporter: ITelemetryReporter;
    private wizardSessionStartTime: number;
    private pageStartTime: number;

    constructor(private vscodeContext: vscode.ExtensionContext){
        super();
        TelemetryAI.telemetryReporter = this.createTelemetryReporter(vscodeContext);
        this.wizardSessionStartTime = Date.now();
        this.pageStartTime = this.wizardSessionStartTime;
    }

    private createTelemetryReporter(ctx: vscode.ExtensionContext) {
        const { extensionName, extensionVersion, aiKey } = getPackageInfo(ctx);
        const reporter: TelemetryReporter = new TelemetryReporter(extensionName, extensionVersion, aiKey);
        // adding to the array of disposables
        ctx.subscriptions.push(reporter);
        return reporter;
    }

    public trackWizardTotalSessionTimeToGenerate(){
        this.trackTimeDuration(TelemetryEventName.WizardSession, this.wizardSessionStartTime, Date.now());
    }

    /*
    * @param pageToTrack is the name of the page the wizard is on before the user clicks the next button; this page name will be sent to Application Insights as property
    * 
    */
   public async trackWizardPageTimeToNext(payload: any): Promise<IPayloadResponse>{
    this.trackTimeDuration(TelemetryEventName.PageChange, this.pageStartTime, Date.now(), {"Page-Name": payload.pageName});
    this.pageStartTime = Date.now();
    return {payload: true};
}
    
    public async trackCreateNewProject(payload: any): Promise<IPayloadResponse>{        
        this.wizardSessionStartTime = Date.now();
        this.trackCustomEvent(TelemetryEventName.CreateNewProject, {"Entry-point": payload.entryPoint});
        return {payload: true};
    }

    public async trackPressQuickstart(): Promise<IPayloadResponse>{ 
        this.trackCustomEvent(TelemetryEventName.TrackPressQuickstart);
        return {payload: true};
    }

    public async trackOpenAddPagesModal(): Promise<IPayloadResponse>{ 
        this.trackCustomEvent(TelemetryEventName.TrackOpenAddPagesModal);
        return {payload: true};
    }

    public trackCustomEventTime(customEventName: string, startTime: number, endTime: number = Date.now(), customEventProperties?: { [key: string]: string | undefined }){
        this.trackTimeDuration(customEventName, startTime, endTime, customEventProperties);
    }

    public trackCustomEvent(customEventName: string, customEventProperties?: { [key: string]: string | undefined }){
        TelemetryAI.telemetryReporter.sendTelemetryEvent(customEventName, customEventProperties);
    }

    private trackTimeDuration(eventName : string, startTime : number, endTime : number, properties?: { [key: string]: string | undefined }){
        var measurement = {
            duration: (endTime - startTime) / 1000
        };
        TelemetryAI.telemetryReporter.sendTelemetryEvent(eventName, properties, measurement)
    }

    public callWithTelemetryAndCatchHandleErrors<T>(callbackId: string, callback: (this: IActionContext) => T | PromiseLike<T>): Promise<T | undefined>{
        return callWithTelemetryAndCatchErrors(this.vscodeContext, callbackId,callback, TelemetryAI.telemetryReporter);
    }

    public getExtensionName(ctx: vscode.ExtensionContext) {
        const { extensionName } = getPackageInfo(ctx);
        return extensionName;
      }

    public getExtensionVersionNumber(ctx: vscode.ExtensionContext){
        const { extensionVersion } = getPackageInfo(ctx);
        return extensionVersion;
    }
}

