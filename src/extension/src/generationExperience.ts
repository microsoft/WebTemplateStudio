import * as vscode from "vscode";
import { WizardServant, IPayloadResponse } from "./wizardServant";
import { ExtensionCommand, TelemetryEventName, CONSTANTS } from "./constants";
import { TelemetryAI, IActionContext } from "./telemetry/telemetryAI";
import { ReactPanel } from "./reactPanel";
import { AzureServices } from "./azure/azureServices";
import { Controller } from "./controller";

export class GenerationExperience extends WizardServant{
  private static reactPanel : ReactPanel;
    clientCommandMap: Map<ExtensionCommand, (message: any) => Promise<IPayloadResponse>> = new Map([
      [ExtensionCommand.Generate, this.handleGeneratePayloadFromClient],
      [ExtensionCommand.OpenProjectVSCode, GenerationExperience.openProjectVSCode]
    ]);
    /**
     *
     */
    constructor(private reactPanelContext: ReactPanel, private Telemetry: TelemetryAI) {
      super();
      
    }
    ////TODO: MAKE GEN CALL CLIENTCOMMANDMAP FUNCTIONS VIA TO WRAP TELEMETRY AUTOMATICALLY
    // tslint:disable-next-line: max-func-body-length
    public async handleGeneratePayloadFromClient(
      message: any
    ): Promise<IPayloadResponse> {
      this.Telemetry.trackWizardTotalSessionTimeToGenerate();
      var payload = message.payload;
      var enginePayload: any = payload.engine;
  
      const apiGenResult = await Controller.sendTemplateGenInfoToApiAndSendStatusToClient(
        enginePayload
      ).catch(error => {
        console.log(error);
        Controller.reactPanelContext.postMessageWebview({
          command: ExtensionCommand.UpdateGenStatus,
          payload: {
            templates: GenerationExperience.getProgressObject(false),
            cosmos: GenerationExperience.getProgressObject(false),
            azureFunctions: GenerationExperience.getProgressObject(false)
          }
        });
        return;
      });
  
      let progressObject = {
        templates: GenerationExperience.getProgressObject(true),
        cosmos: {},
        azureFunctions: {}
      };
  
      this.reactPanelContext.postMessageWebview({
        command: ExtensionCommand.UpdateGenStatus,
        payload: progressObject
      });
  
      var serviceQueue: Promise<any>[] = [];
      enginePayload.path = apiGenResult.generationOutputPath;
  
      this.reactPanelContext.postMessageWebview({command: ExtensionCommand.GetOutputPath, 
       payload: {outputPath: enginePayload.path}
      });
  
      if (payload.selectedFunctions) {
        serviceQueue.push(
          this.Telemetry.callWithTelemetryAndCatchHandleErrors(
            TelemetryEventName.FunctionsDeploy,
            // tslint:disable-next-line: no-function-expression
            async function(this: IActionContext): Promise<void> {
              try {
                AzureServices.deployFunctionApp(
                  payload.functions,
                  enginePayload.path
                );
                progressObject = {
                  ...progressObject,
                  azureFunctions: GenerationExperience.getProgressObject(true)
                };
                Controller.reactPanelContext.postMessageWebview({
                  command: ExtensionCommand.UpdateGenStatus,
                  payload: progressObject
                });
              } catch (error) {
                console.log(error);
                progressObject = {
                  ...progressObject,
                  azureFunctions: GenerationExperience.getProgressObject(false)
                };
                Controller.reactPanelContext.postMessageWebview({
                  command: ExtensionCommand.UpdateGenStatus,
                  payload: progressObject
                });
              }
            }
          )
        );
      }
  
      if (payload.selectedCosmos) {
        serviceQueue.push(
          this.Telemetry.callWithTelemetryAndCatchHandleErrors(
            TelemetryEventName.CosmosDBDeploy,
            // tslint:disable-next-line: no-function-expression
            async function(this: IActionContext): Promise<void> {
              var cosmosPayload: any = payload.cosmos;
              try {
                var dbObject = await AzureServices.deployCosmosResource(
                  cosmosPayload,
                  enginePayload.path
                );
                progressObject = {
                  ...progressObject,
                  cosmos: GenerationExperience.getProgressObject(true)
                };
                Controller.reactPanelContext.postMessageWebview({
                  command: ExtensionCommand.UpdateGenStatus,
                  payload: progressObject
                });
                AzureServices.promptUserForCosmosReplacement(
                  enginePayload.path,
                  dbObject
                ).then(
                  //log in telemetry how long it took replacement
                  cosmosReplaceResponse => {
                    if (cosmosReplaceResponse.userReplacedEnv) {
                      // Temporary Disable
                      // this.Telemetry.trackCustomEventTime(
                      //   TelemetryEventName.ConnectionStringReplace,
                      //   cosmosReplaceResponse.startTime,
                      //   Date.now()
                      // );
                    }
                  }
                );
              } catch (error) {
                progressObject = {
                  ...progressObject,
                  cosmos: GenerationExperience.getProgressObject(false)
                };
                Controller.reactPanelContext.postMessageWebview({
                  command: ExtensionCommand.UpdateGenStatus,
                  payload: progressObject
                });
              }
            }
          )
        );
      }
      // kick off both services asynchronously
      Promise.all(serviceQueue);
      return {payload: true}
    }
    private static async openProjectVSCode(message: any): Promise<IPayloadResponse> {
      vscode.commands.executeCommand(
        CONSTANTS.VSCODE_COMMAND.OPEN_FOLDER,
        vscode.Uri.file(message.payload.outputPath),
        true
      );
      return {payload: true}
    }
  
    private static getProgressObject(didSucceed: boolean) {
      return {
        success: didSucceed,
        failure: !didSucceed
      };
    }
  }