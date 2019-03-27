import blankpage from "../assets/blankpage.svg";
import { IOption } from "../types/option";

import getSvgUrl from "../utils/getSvgUrl";
import { WIZARD_CONTENT_INTERNAL_NAMES } from "../utils/constants";

const options: IOption[] = [
  {
    author: "Microsoft",
    svgUrl: getSvgUrl(WIZARD_CONTENT_INTERNAL_NAMES.AZURE_FUNCTIONS),
    title: "Azure Functions",
    internalName: WIZARD_CONTENT_INTERNAL_NAMES.AZURE_FUNCTIONS,
    longDescription:
      "Azure Functions is a serverless compute service that enables you to run code on-demand without having to explicitly provision or manage infrastructure. Think of it as deploying functions that executes on pre-defined triggers instead of having to write and manage a full-fledged server yourself. One of the most commonly used triggers is an HTTPTrigger which is a function that runs whenever it receives an HTTP request. This is essentially the same as an API endpoint. Web Template Studio allows you to deploy a function app with multiple 'hello world' HTTPTrigger functions (maximum of 10) so you can get to writing your business logic as soon as possible.",
    body:
      "Azure Functions is a serverless compute service that enables you to run code on-demand without having to explicitly provision or manage infrastructure."
  },
  {
    author: "Microsoft",
    svgUrl: getSvgUrl(WIZARD_CONTENT_INTERNAL_NAMES.COSMOS_DB),
    title: "Cosmos Resource",
    internalName: WIZARD_CONTENT_INTERNAL_NAMES.COSMOS_DB,
    longDescription:
      "Azure Cosmos DB is Microsoft’s proprietary globally-distributed, multi-model database service for managing data on a global scale. It offers a variety of APIs for your database including Azure Table, Core (SQL), MongoDB and Gremlin (GraphQL). Web Template Studio offers you the functionality to deploy a Cosmos DB instance from the wizard itself and select an initial location to deploy your database with the ability to scale it to multiple locations at a future time. As an added feature, deploying with the MongoDB API enables you to quickly connect the project Web Template Studio generates to your database instance.",
    body:
      "Cosmos DB allows you to build and scale your application with a globally distributed, multi-model database service."
  }
];

const getAzureServiceOptions = (): Promise<IOption[]> => {
  return Promise.resolve(options);
};

export default getAzureServiceOptions;
