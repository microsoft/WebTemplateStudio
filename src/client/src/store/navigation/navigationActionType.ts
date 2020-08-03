import modalsActionType from "./modals/modalActionType";
import routesActionType from "./routes/routesActionType";
import isDirtyActionType from "./isDirty/isDirtyActionType";
import { IRoutesActionType } from "./routesNavItems/models";

type navigationType = modalsActionType | routesActionType | isDirtyActionType | IRoutesActionType;

export default navigationType;
