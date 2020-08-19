import { EXTENSION_COMMANDS } from "../../utils/constants/commands";
import { GenerationItemStatus, GENERATION_NAMES } from "../../types/generationStatus";

const wait = (m: number) => new Promise((r) => setTimeout(r, m));

const generate = async (message: any) => {
  const { pages, services } = message.payload;
  const servicesQueue: Promise<void>[] = [];

  await generateProject(pages);

  if (services.appService) {
    servicesQueue.push(generateAppService());
  }
  if (services.cosmosDB) {
    servicesQueue.push(generateCosmosDB());
  }

  await Promise.all(servicesQueue);
};

const openProjectVSCode = (message: any) => {
  console.log(`Call to open project in vscode: ${JSON.stringify(message)} `);
};

const generateProject = async (pages: any[]) => {
  sendGenerationStatus(GENERATION_NAMES.TEMPLATES, GenerationItemStatus.Generating);

  for (const page of pages) {
    const message = `create page ${page.name}`;
    sendGenerationStatus(GENERATION_NAMES.TEMPLATES, GenerationItemStatus.Generating, message);
    await wait(300);
  }

  sendGenerationStatus(
    GENERATION_NAMES.TEMPLATES,
    GenerationItemStatus.Success,
    "The project generation has finished successfully",
    { generationPath: "project_generation_path" }
  );
};

const generateAppService = async () => {
  sendGenerationStatus(
    GENERATION_NAMES.APP_SERVICE,
    GenerationItemStatus.Generating,
    "Deploying Azure services (this may take a few minutes)."
  );
  await wait(1000);
  sendGenerationStatus(GENERATION_NAMES.APP_SERVICE, GenerationItemStatus.Success);
};

const generateCosmosDB = async () => {
  sendGenerationStatus(
    GENERATION_NAMES.COSMOS_DB,
    GenerationItemStatus.Generating,
    "Deploying Azure services (this may take a few minutes)."
  );
  await wait(3000);
  sendGenerationStatus(GENERATION_NAMES.COSMOS_DB, GenerationItemStatus.Failed, "ERROR: CosmosDB failed to deploy");
};

const sendGenerationStatus = (name: string, status: GenerationItemStatus, message?: string, data?: any) => {
  window.postMessage(
    {
      command: EXTENSION_COMMANDS.GEN_STATUS,
      payload: {
        name,
        status,
        message,
        data
      },
    },
    "*"
  );
};

export { generate, openProjectVSCode };
