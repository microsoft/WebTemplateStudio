import { EXTENSION_COMMANDS } from "../../utils/constants";
import { GenerationItemStatus, GENERATION_NAMES } from "../../types/generationStatus";

const wait = (m: number) => new Promise((r) => setTimeout(r, m));

const generate = async (message: any) => {
  const { pages, services } = message.payload;
  const servicesQueue: Promise<void>[] = [];

  //Simulate generation pages
  await mockGenerateTemplates(pages);

  //Simulate generation services
  if (services.appService) {
    servicesQueue.push(mockGenerateSuccess(GENERATION_NAMES.APP_SERVICE, 1000));
  }
  if (services.cosmosDB) {
    servicesQueue.push(mockGenerateFailed(GENERATION_NAMES.COSMOS_DB, 2500, "ERROR: CosmosDB failed to deploy"));
  }

  await Promise.all(servicesQueue);
};

const openProjectVSCode = (message: any) => {
  console.log(`Call to open project in vscode: ${JSON.stringify(message)} `);
};

const mockGenerateTemplates = async (pages: any[]) => {

  sendGenerationStatus(GENERATION_NAMES.TEMPLATES, GenerationItemStatus.Generating);

  for (const page of pages) {
    const message = `create page ${page.name}`;
    sendGenerationStatus(GENERATION_NAMES.TEMPLATES, GenerationItemStatus.Generating, message);
    await wait(300);
  }  

  sendGenerationStatus(GENERATION_NAMES.TEMPLATES, GenerationItemStatus.Success);
};

const sendGenerationStatus = (name: string, status: GenerationItemStatus, message?: string) => {
  window.postMessage(
    {
      command: EXTENSION_COMMANDS.GEN_STATUS,
      payload: {
        name,
        status,
        message,
      },
    },
    "*"
  );
};

const mockGenerateSuccess = async (name: string, duration: number) => {
  sendGenerationStatus(name, GenerationItemStatus.Generating);
  await wait(duration);
  sendGenerationStatus(name, GenerationItemStatus.Success);
};

const mockGenerateFailed = async (name: string, duration: number, message: string) => {
  sendGenerationStatus(name, GenerationItemStatus.Generating);
  await wait(duration);
  sendGenerationStatus(name, GenerationItemStatus.Failed, message);
};

export { generate, openProjectVSCode };
