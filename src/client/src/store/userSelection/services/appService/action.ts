import { IAppService } from "./model";
import { ISaveAppServiceAction, IRemoveAppServiceAction } from "./model";
import { SERVICES_TYPEKEYS } from "../typeKeys";

export const saveAppServiceAction = (appService: IAppService): ISaveAppServiceAction => ({
  type: SERVICES_TYPEKEYS.SAVE_APP_SERVICE,
  payload: appService,
});

export const removeAppServiceAction = (): IRemoveAppServiceAction => ({
  type: SERVICES_TYPEKEYS.REMOVE_APP_SERVICE,
});
