import { ISelectedAppService } from "./model";
import { ISaveAppServiceAction, IRemoveAppServiceAction } from "./model";
import { AZURE_TYPEKEYS } from "../../../azureProfileData/typeKeys";

export const saveAppServiceAction = (appService: ISelectedAppService): ISaveAppServiceAction => ({
  type: AZURE_TYPEKEYS.SAVE_APP_SERVICE,
  payload: appService,
});

export const removeAppServiceAction = (): IRemoveAppServiceAction => ({
  type: AZURE_TYPEKEYS.REMOVE_APP_SERVICE,
});
