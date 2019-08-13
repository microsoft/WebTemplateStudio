import { defineMessages } from "react-intl";

export const strings = defineMessages({
  failedToGenerate: {
    id: "postGenerationModal.failedToGenerate",
    defaultMessage: "ERROR: Templates could not be generated"
  },
  deploymentHalted: {
    id: "postGenerationModal.deploymentHalted",
    defaultMessage: "ERROR: Azure Service deployment halted due to template error."
  },
  restartWizard: {
    id: "postGenerationModal.restartWizard",
    defaultMessage: "Restart"
  },
  error: {
    id: "postGenerationModal.error",
    defaultMessage: "ERROR:"
  },
  deploymentFailure: {
    id: "postGenerationModal.deploymentFailure",
    defaultMessage: "failed to deploy."
  },
  closeWizard: {
    id: "postGenerationModal.closeWizard",
    defaultMessage: "Close Wizard"
  },
  deploymentSuccess: {
    id: "postGenerationModal.success",
    defaultMessage: "is deployed on"
  },
  isDeploying: {
    id: "postGenerationModal.isDeploying",
    defaultMessage: "Deploying"
  },
  working: {
    id: "postGenerationModal.working",
    defaultMessage: "Working"
  },
  openInCode: {
    id: "postGenerationModal.openInCode",
    defaultMessage: "Open Project"
  },
  unknownStatus: {
    id: "postGenerationModal.unknownStatus",
    defaultMessage: "Unknown Status"
  },
  noServicesToDeploy: {
    id: "postGenerationModal.noServicesToDeploy",
    defaultMessage: "No services to deploy."
  },
  help: {
    id: "postGenerationModal.help",
    defaultMessage: "Report an issue"
  },
  createAnotherProject: {
    id: "postGenerationModal.createAnotherProject",
    defaultMessage: "Create New Project"
  },
  creatingYourProject: {
    id: "postGenerationModal.creatingYourProject",
    defaultMessage: "Creating Your Project"
  },
  projectCreation: {
    id: "postGenerationModal.projectCreation",
    defaultMessage: "Project Creation"
  },
  generationCompleteWithAzure: {
    id: "postGenerationModal.generationCompleteWithAzure",
    defaultMessage: "Open your project while we take a few minutes to finish deploying Azure services."
  },
  seeReadMePrefix: {
    id: "postGenerationModal.seeReadMePrefix",
    defaultMessage: "Click 'Open Project' and see "
  },
  seeReadMePrefixWithAzure: {
    id: "postGenerationModal.seeReadMePrefixWithAzure",
    defaultMessage: "See "
  },
  readMe: {
    id: "postGenerationModal.readme",
    defaultMessage: "README.md"
  },
  seeReadMeSuffix: {
    id: "postGenerationModal.seeReadMeSuffix",
    defaultMessage: " to get instructions."
  },
  templateGeneration: {
    id: "postGenerationModal.templateGeneration",
    defaultMessage: "Template Generation"
  }
});
