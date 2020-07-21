import { IPayloadResponse, WizardServant } from "../wizardServant";
import { TelemetryEventName } from "../constants/telemetry";
import { ExtensionCommand } from "../constants/commands";
import { ITelemetryService } from "../telemetry/telemetryService";

export class Telemetry extends WizardServant {
  clientCommandMap: Map<
    ExtensionCommand,
    (message: any) => Promise<IPayloadResponse>
  > = new Map([
    [ExtensionCommand.TRACK_PAGE_SWITCH, this.trackWizardPageTimeToNext],
    [ExtensionCommand.TRACK_CREATE_NEW_PROJECT, this.trackCreateNewProject],
    [ExtensionCommand.TrackOpenAddPagesModal, this.trackOpenAddPagesModal],
    [ExtensionCommand.TRACK_PRESS_QUICKSTART, this.trackPressQuickstart],
    [
      ExtensionCommand.TRACK_OPEN_APP_SERVICE_MODAL_FROM_SERVICES_LIST,
      this.trackOpenAppServiceModalFromServicesList
    ],
    [
      ExtensionCommand.TRACK_OPEN_COSMOSDB_SERVICE_MODAL_FROM_SERVICES_LIST,
      this.trackOpenCosmosDBServiceModalFromServicesList
    ],
    [ExtensionCommand.TRACK_OPEN_AZURE_SERVICE_ADVANCED_MODE, this.TrackOpenAzureServiceAdvancedMode]
  ]);

  constructor(private telemetry: ITelemetryService) {
    super();
  }

  public async trackWizardPageTimeToNext(
    payload: any
  ): Promise<IPayloadResponse> {
    this.telemetry.trackEventWithDuration(
      TelemetryEventName.PageChange,
      this.telemetry.pageStartTime,
      Date.now(),
      { "Page-Name": payload.pageName }
    );
    this.telemetry.pageStartTime = Date.now();
    return { payload: true };
  }

  public async trackCreateNewProject(payload: any): Promise<IPayloadResponse> {
    this.telemetry.wizardSessionStartTime = Date.now();
    this.telemetry.trackEvent(TelemetryEventName.CreateNewProject, {
      "Entry-point": payload.entryPoint
    });
    return { payload: true };
  }

  public async trackPressQuickstart(): Promise<IPayloadResponse> {
    this.telemetry.trackEvent(TelemetryEventName.TrackPressQuickstart);
    return { payload: true };
  }

  public async trackOpenAddPagesModal(): Promise<IPayloadResponse> {
    this.telemetry.trackEvent(TelemetryEventName.TrackOpenAddPagesModal);
    return { payload: true };
  }

  public async trackOpenAppServiceModalFromServicesList(): Promise<
    IPayloadResponse
  > {
    this.telemetry.trackEvent(
      TelemetryEventName.OpenAppServiceModalFromServicesList
    );
    return { payload: true };
  }

  public async trackOpenCosmosDBServiceModalFromServicesList(): Promise<
    IPayloadResponse
  > {
    this.telemetry.trackEvent(
      TelemetryEventName.OpenCosmosDBServiceModalFromServicesList
    );
    return { payload: true };
  }  

  public async TrackOpenAzureServiceAdvancedMode(payload: any): Promise<IPayloadResponse> {
    this.telemetry.trackEvent(TelemetryEventName.OpenAzureServiceAdvancedMode, {
      "Azure-service-type": payload.azureServiceType
    });
    return { payload: true };
  }
}
