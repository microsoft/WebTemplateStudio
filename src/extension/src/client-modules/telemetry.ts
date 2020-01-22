import { IPayloadResponse, WizardServant } from "../wizardServant";
import { ExtensionCommand, TelemetryEventName } from "../constants";
import { ITelemetryService } from "../telemetry/telemetryService";

export class Telemetry extends WizardServant {
  clientCommandMap: Map<
    ExtensionCommand,
    (message: any) => Promise<IPayloadResponse>
  > = new Map([
    [ExtensionCommand.TrackPageSwitch, this.trackWizardPageTimeToNext],
    [ExtensionCommand.TrackCreateNewProject, this.trackCreateNewProject],
    [ExtensionCommand.TrackOpenAddPagesModal, this.trackOpenAddPagesModal],
    [ExtensionCommand.TrackPressQuickstart, this.trackPressQuickstart]
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
    this.telemetry.trackEvent(
      TelemetryEventName.TrackOpenAddPagesModal
    );
    return { payload: true };
  }
}
