# Web Template Studio Telemetry

*Web Template Studio* logs usage data and diagnostics telemetry through [Application Insights](https://azure.microsoft.com/en-us/services/monitor/).

The class [TelemetryService](../src/extension/src/telemetry/telemetryService.ts), within the extension code, isolates the telemetry service implementation details and offers a smooth and easy way to invoke telemetry events.

Apart from the data logged in *Web Template Studio*, Core Template Studio tracks telemetry data on generation. For more info see [Core Template Studio Telemetry](https://github.com/microsoft/CoreTemplateStudio/blob/dev/docs/telemetry.md)

## Trends

Please head to our [Telemetry Data](telemetryData.md) where we show trends from the gathered telemetry.

## Telemetry Gathered

The wizard for *Web Template Studio* collects basic diagnostics telemetry and usage data:

- **Diagnostics telemetry:** Unhandled error and exceptions that happened while running the
  wizard are logged with Application Insights. This includes the stack trace of the error
- **Usage telemetry:** including wizard usage and user selections.

## Usage Telemetry

Through the Application Insights API, telemetry events are collected to gather basic information regarding *Web Template Studio* extension usage. The following table describes the Telemetry Events we collect:

|Event Name Tracked |Notes |
|:-------------:|:-----|
|**Extension-Launch**|Track when the extension starts running.|
|**Extension-closed**|Track when the extension is closed. Save the template synchronization status|
|**Sync-Engine**|Track the time it takes to synchronize the templates in the extension|
|**Create-New-Project**|Track the start of creating a new project. Save the entry-point of this action (Launch wizard or Create New Project button).|
|**Wizard-To-Generate-Session-Time**|Track the time that elapses since the extension is launched until the start generation a new project.|
|**Wizard-Page-Change**|Track the total time the user views a *Web Template Studio* extension page.|
|**login**|Track the time it takes for a user to log in to Azure.|
|**logout**|Track the time it takes for a user to log out of their Azure account.|
|**get-user-status**|Track the time it takes for the extension to obtain the data of a user logged in to Azure.|
|**subscription-data-for-cosmos**|Track the time that elapses when obtaining Azure CosmosDB data when selecting an Azure subscription.|
|**subscription-data-for-app-service**|Track the time that elapses when obtaining Azure App Service data when selecting an Azure subscription.|
|**Azure-App-Service-Deployment**|Track the time it takes to create an App Service in Azure.|
|**Azure-Cosmos-Deployment**|Track the time it takes to create a CosmosDB Service in Azure.|
|**Azure-Resource-Group-Deployment**|Track the time it takes to create a resource group in Azure is created.|
|**Connection-String-Replaced**|Track the time it takes for the extension to replace the connection strings when we add a Azure CosmosDB service.|
|**Press-Quickstart**|Track the event that occurs when you press the Quickstart button when you start the application.|
|**Open-Add-Pages-Modal**|Track the event that occurs when you press the Add Pages button on the right side of the extension.|
|**Open-AppService-Modal-From-Services-List**|Track the event that occurs when you press the Edit App Service button on the right side of the extension.|
|**Open-CosmosDBService-Modal-From-Services-List**|Track the event that occurs when you press the Edit CosmosDB Service button on the right side of the extension.|
|**open-project-vscode**|Track the time it takes to open the project generated in a new instance of Visual Studio Code.|
|**reset-pages**|Track the time it takes to clean the added pages while we are creating a project.|

For events related to session and project generation see [Core Template Studio -  Usage telemetry collected](https://github.com/microsoft/CoreTemplateStudio/blob/dev/docs/telemetry.md#usage-telemetry-collected). 

## Telemetry Configuration

The TelemetryService class use [vscode-extension-telemetry](https://www.npmjs.com/package/vscode-extension-telemetry) module. The Application Insights telemetry requires a telemetry instrumentation key to be able to track telemetry. If you want to track your own telemetry, you will need your own instrumentation key, obtain one by creating an [Application Insights](https://docs.microsoft.com/azure/application-insights/app-insights-asp-net) instance in your Azure account, if you don't have an Azure account there are different options to [create one for free](https://azure.microsoft.com/en-us/free/).

The instrumentation key is setup through in the `package.json` file from extension code:

``` json
//package.json
{
    ...
    "aiKey": "__AIKEY__",
    ...
}
```
## Send Telemetry from Extension Code

To send telemetry from the extension code we must use the `telemetryService` class. This class defines several methods that will help us to register custom events in Application Insight. Currently the only instance of `telemetryService` is statically initialized in the` Controller` class. The methods that help us to track telemetry events are:

- `trackEvent`: Track the event and the custom properties passed by the function parameters.
- `trackEventWithDuration`: Track the event, the custom properties and the duration calculated between the start date and the end date in seconds passed by the function parameters.
- `callWithTelemetryAndCatchHandleErrors<T>`: Use the `callWithTelemetryAndErrorHandling` class to track the duration when executing a callback function passed by parameters. It also tracks if there has been any error or exception during the execution of the callback function.


## Send Telemetry from Client Code

Communication between the client and the extension is done using sending requests with the method `vscode.postmessage` ([more info](https://code.visualstudio.com/api/extension-guides/webview#passing-messages-from-an-extension-to-a-webview)), passing through parameters the module and the extension command that have to process this request. If we want to track the client request, send the property `track: true`. 

### Example:

```javascript
vscode.postMessage({
  module: EXTENSION_MODULES.AZURE,
  command: EXTENSION_COMMANDS.SUBSCRIPTION_DATA_APP_SERVICE,
  track: true
});
```

In extension code, the abstract class `wizardServant` (which is extended by all the modules of the extension with commands that can be called from the client code) is responsible for processing these requests and tracking the duration of the execution of the command or if an error occurred during its execution.

There is also an exclusive telemetry module in the extension, which we can call from the client to track simple events. You send this command with the `track: false` property so that the wizardServant class does not re-trace the event.
