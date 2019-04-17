import * as vscode from 'vscode';
import { CONSTANTS } from './constants';
import { ApiModule } from './signalr-api-module/apiModule';
import { ISyncReturnType } from './types/syncReturnType';

export class LaunchExperience{
    public static async launchApiSyncModule(context: vscode.ExtensionContext) {
        let syncObject: ISyncReturnType = {
          successfullySynced: false,
          templatesVersion: ""
        };
        let syncAttempts = 0;
        while (
          !syncObject.successfullySynced &&
          syncAttempts < CONSTANTS.API.MAX_SYNC_REQUEST_ATTEMPTS
        ) {
          syncObject = await this.attemptSync();
          syncAttempts++;
          if (!syncObject.successfullySynced) {
            await this.timeout(CONSTANTS.API.SYNC_RETRY_WAIT_TIME);
          }
        }
        if (syncAttempts >= CONSTANTS.API.MAX_SYNC_REQUEST_ATTEMPTS) {
          ApiModule.StopApi();
          throw new Error(CONSTANTS.ERRORS.TOO_MANY_FAILED_SYNC_REQUESTS);
        }
        return syncObject;
      }
      
      private static timeout(ms: number) {
        return new Promise(resolve => setTimeout(resolve, ms));
      }
    
      private static async attemptSync(): Promise<ISyncReturnType> {
        return await ApiModule.ExecuteApiCommand({
          port: CONSTANTS.PORT,
          payload: { path: CONSTANTS.API.PATH_TO_TEMPLATES },
          liveMessageHandler: this.handleSyncLiveData
        })
          .then((syncResult: any) => {
            return {
              successfullySynced: true,
              templatesVersion: syncResult.templatesVersion
            };
          })
          .catch(() => {
            return { successfullySynced: false, templatesVersion: "" };
          });
      }
    
      private static handleSyncLiveData(status: string, progress?: number) {
        let output = `Template Status: ${status}`;
        if (progress) {
          output += ` ${progress}%`;
        }
        vscode.window.setStatusBarMessage(output);
      }
}