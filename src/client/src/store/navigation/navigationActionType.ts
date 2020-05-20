import modalsActionType from "./modals/modalActionType";
import routesActionType from "./routes/routesActionType";
import isDirtyActionType from "./isDirty/isDirtyActionType";

type navigationType = modalsActionType | routesActionType | isDirtyActionType;

export default navigationType;
