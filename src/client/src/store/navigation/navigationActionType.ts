import modalsActionType from "./modals/modalActionType";
import routesActionType from "../config/detailsPage/routesActionType";
import { IRoutesActionType } from "./routesNavItems/models";

type navigationType = modalsActionType | routesActionType | IRoutesActionType;

export default navigationType;
