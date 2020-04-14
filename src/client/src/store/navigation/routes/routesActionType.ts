import { ISetVisitedPageAction, IResetVisitedPageAction, ISetPageAction,
    IPageOptionsActionType, ISetDetails  } from "./model";

type RouteType = ISetVisitedPageAction |
 IResetVisitedPageAction |
 ISetPageAction |
 IPageOptionsActionType | 
 ISetDetails;

export default RouteType;
