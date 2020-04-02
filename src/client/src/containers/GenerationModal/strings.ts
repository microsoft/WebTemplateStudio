import { defineMessages } from "react-intl";

export const strings = defineMessages({
  failedToGenerate: {
    id: "generationModal.failedToGenerate",
    defaultMessage: "ERROR: Templates could not be generated"
  },
  deploymentHalted: {
    id: "generationModal.deploymentHalted",
    defaultMessage: "ERROR: Azure Service deployment halted due to template error."
  },
  restartWizard: {
    id: "generationModal.restartWizard",
    defaultMessage: "Restart"
  },
  error: {
    id: "generationModal.error",
    defaultMessage: "ERROR:"
  },
  deploymentFailure: {
    id: "generationModal.deploymentFailure",
    defaultMessage: "failed to deploy."
  },
  closeWizard: {
    id: "generationModal.closeWizard",
    defaultMessage: "Close Wizard"
  },
  deploymentSuccess: {
    id: "generationModal.success",
    defaultMessage: "is deployed on"
  },
  isDeploying: {
    id: "generationModal.isDeploying",
    defaultMessage: "Deploying"
  },
  working: {
    id: "generationModal.working",
    defaultMessage: "Working"
  },
  openInCode: {
    id: "generationModal.openInCode",
    defaultMessage: "Open Project"
  },
  unknownStatus: {
    id: "generationModal.unknownStatus",
    defaultMessage: "Unknown Status"
  },
  noServicesToDeploy: {
    id: "generationModal.noServicesToDeploy",
    defaultMessage: "No services to deploy."
  },
  help: {
    id: "generationModal.help",
    defaultMessage: "Report an issue"
  },
  createAnotherProject: {
    id: "generationModal.createAnotherProject",
    defaultMessage: "Create New Project"
  },
  creatingYourProject: {
    id: "generationModal.creatingYourProject",
    defaultMessage: "Creating Your Project"
  },
  projectCreation: {
    id: "generationModal.projectCreation",
    defaultMessage: "Project Creation"
  },
  generationCompleteWithAzure: {
    id: "generationModal.generationCompleteWithAzure",
    defaultMessage: "Open your project while we take a few minutes to finish deploying Azure services."
  },
  seeReadMePrefix: {
    id: "generationModal.seeReadMePrefix",
    defaultMessage: "Click 'Open Project' and see "
  },
  seeReadMePrefixWithAzure: {
    id: "generationModal.seeReadMePrefixWithAzure",
    defaultMessage: "See "
  },
  readMe: {
    id: "generationModal.readme",
    defaultMessage: "README.md"
  },
  seeReadMeSuffix: {
    id: "generationModal.seeReadMeSuffix",
    defaultMessage: " to get instructions."
  },
  templateGeneration: {
    id: "generationModal.templateGeneration",
    defaultMessage: "Template Generation"
  }
});
