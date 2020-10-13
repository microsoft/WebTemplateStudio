import * as vscode from "vscode";
import { WizardServant, IPayloadResponse } from "../wizardServant";
import { CONSTANTS } from "../constants/constants";
import { TelemetryEventName } from "../constants/telemetry";
import { ITelemetryService } from "../telemetry/telemetryService";
import { EXTENSION_COMMANDS } from "../constants/commands";
import GenerationService from "../utils/generation/GenerationService";
import { getGenerationData } from "../utils/generation/generationUtils";

export class Generation extends WizardServant {
  clientCommandMap: Map<EXTENSION_COMMANDS, (message: any) => Promise<IPayloadResponse>> = new Map([
    [EXTENSION_COMMANDS.GENERATE, this.generate],
    [EXTENSION_COMMANDS.OPEN_PROJECT_IN_VSCODE, this.openProjectVSCode],
  ]);

  constructor(private Telemetry: ITelemetryService) {
    super();
  }

  private async generate(message: any): Promise<IPayloadResponse> {
    this.trackWizardTotalSessionTimeToGenerate();
    const generationService = new GenerationService(this.Telemetry);
    const generationData = getGenerationData(message.payload);
    await generationService.generate(generationData);
    return { payload: undefined };
  }

  private async openProjectVSCode(message: any): Promise<IPayloadResponse> {
    vscode.commands.executeCommand(
      CONSTANTS.VSCODE_COMMAND.OPEN_FOLDER,
      vscode.Uri.file(message.payload.outputPath),
      true
    );
    return { payload: true };
  }

  private trackWizardTotalSessionTimeToGenerate(): void {
    this.Telemetry.trackEventWithDuration(
      TelemetryEventName.WizardSession,
      this.Telemetry.wizardSessionStartTime,
      Date.now()
    );
  }
}
