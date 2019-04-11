# Web Template Studio Telemetry

Web Template Studio logs usage data and diagnostics telemetry through [Application Insights](https://azure.microsoft.com/en-us/services/monitor/).

## Telemetry Gathered

The wizard for Web Template Studio collects basic diagnostics telemetry and usage data:

- **Diagnostics telemetry:** Unhandled error and exceptions that happened while running the
  wizard are logged with Application Insights. This includes the stack trace of the error
- **Usage telemetry:** including wizard usage and user selections.

## Usage Telemetry

Through the Application Insights API, telemetry events are collected to gather basic information regarding Web Template Studio extension usage. The following table describes the Telemetry Events we collect:

|     **Property**      | **Note**                                                                                             |
| :-------------------: | ---------------------------------------------------------------------------------------------------- |
|    **Event Time**     | Timestamp for when the event occurred                                                                |
|    **Event Name**     | Unique event name/descriptor for the event. For ex: WebTemplateStudioVsix/Azure-Functions-Deployment |
| **VSCode Session ID** | A unique identifier for the current session. Changes each time the editor is started.                |
| **VSCode Machine ID** | A unique identifier for the computer                                                                 |
|  **VSCode Version**   | VSCode version being used by the user                                                                |
| **Extension Version** | Web Template Studio extension version being used                                                     |
|        **OS**         | User's operating system                                                                              |
|       **Error**       | Error description if an error occurs                                                                 |
|       **Stack**       | Error stack trace if an error occurs                                                                 |
|      **Result**       | If the event succeeded or not                                                                        |

