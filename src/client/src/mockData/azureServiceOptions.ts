import blankpage from "../assets/blankpage.svg";
import { IOption } from "../types/option";

const options: IOption[] = [
  {
    svgUrl: process.env.REACT_APP_RELATIVE_PATH + blankpage,
    title: "Azure Functions",
    internalName: "AzureFunctions",
    body: "Consider Azure functions for tasks like image or order processing, file maintenance, or for any tasks you want to run on a schedule.",
  },
  {
    svgUrl: process.env.REACT_APP_RELATIVE_PATH + blankpage,
    title: "Cosmos Resource",
    internalName: "Cosmos",
    body: "An intelligent, fully managed relational cloud database service that provides the broadest SQL Server engine compatibility.",
  }
];

const getAzureServiceOptions = (): Promise<IOption[]> => {
  return Promise.resolve(options);
}

export default getAzureServiceOptions;
