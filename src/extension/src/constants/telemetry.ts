export enum TelemetryEventName {
  ExtensionLaunch = "Extension-Launch",
  ExtensionClosed = "Extension-closed",
  WizardSession = "Wizard-To-Generate-Session-Time",
  AppServiceDeploy = "Azure-App-Service-Deployment",
  CosmosDBDeploy = "Azure-Cosmos-Deployment",
  ResourceGroupDeploy = "Azure-Resource-Group-Deployment",
  DefaultServiceDeploy = "Default-Service-Deployment",
  PageChange = "Wizard-Page-Change",
  CreateNewProject = "Create-New-Project",
  SyncEngine = "Sync-Engine",
  ConnectionStringReplace = "Connection-String-Replaced",
  TrackOpenAddPagesModal = "Open-Add-Pages-Modal",
  TrackPressQuickstart = "Press-Quickstart",
  OpenAppServiceModalFromServicesList = "Open-AppService-Modal-From-Services-List",
  OpenCosmosDBServiceModalFromServicesList = "Open-CosmosDBService-Modal-From-Services-List",
  OpenAzureServiceAdvancedMode = "Open-Azure-Service-Advanced-Mode"
}