import { ISetVisitedPageAction, IResetVisitedPageAction, ISetPageAction, ISetDetails  } from "./model";

type RouteType = ISetVisitedPageAction |
 IResetVisitedPageAction |
 ISetPageAction |
 ISetDetails;

export default RouteType;
