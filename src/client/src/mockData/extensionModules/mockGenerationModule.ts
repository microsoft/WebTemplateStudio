import { EXTENSION_COMMANDS } from "../../utils/constants";
import { GenerationItemStatus } from "../../types/generationStatus";

const wait = (m: number) => new Promise((r) => setTimeout(r, m));

const generate = async (message: any) => {
  const scope = message.payload && message.payload.scope ? message.payload.scope : "";
  const { pages, services } = message.payload;
  const servicesQueue: Promise<void>[] = [];

  //Simulate generation pages
  sendGenerationStatus("templates", GenerationItemStatus.Generating, scope);
  await mockGenerateTemplates(pages, scope);
  sendGenerationStatus("templates", GenerationItemStatus.Sucess, scope);

  //Simulate generation services
  if (services.appService) {
    servicesQueue.push(mockGenerateSuccess("appService", 1000, scope));
  }
  if (services.cosmosDB) {
    servicesQueue.push(mockGenerateFailed("cosmosDB", 2500, scope));
  }

  await Promise.all(servicesQueue);

  //Old -> remove when finished
  window.postMessage(
    {
      command: EXTENSION_COMMANDS.GEN_STATUS,
      payload: {
        scope,
        templates: {
          success: true,
          failure: false,
        },
        cosmos: {
          success: false,
          failure: true,
        },
        appService: {
          success: true,
          failure: false,
        },
        finished: true,
      },
    },
    "*"
  );
};

const openProjectVSCode = (message: any) => {
  console.log(`Call to open project in vscode: ${JSON.stringify(message)} `);
};

const mockGenerateTemplates = async (pages: any[], scope: string) => {
  for (const page of pages) {
    window.postMessage(
      {
        command: EXTENSION_COMMANDS.GEN_STATUS_MESSAGE,
        payload: {
          scope,
          status: `create page ${page.name}`,
        },
      },
      "*"
    );
    await wait(300);
  }
};

const sendGenerationStatus = (name: string, status: GenerationItemStatus, scope: string) => {
  window.postMessage(
    {
      command: EXTENSION_COMMANDS.GEN_STATUS,
      payload: {
        scope,
        name,
        status,
      },
    },
    "*"
  );
};

const mockGenerateSuccess = async (name: string, duration: number, scope: string) => {
  sendGenerationStatus(name, GenerationItemStatus.Generating, scope);
  await wait(duration);
  sendGenerationStatus(name, GenerationItemStatus.Sucess, scope);
};

const mockGenerateFailed = async (name: string, duration: number, scope: string) => {
  sendGenerationStatus(name, GenerationItemStatus.Generating, scope);
  await wait(duration);
  sendGenerationStatus(name, GenerationItemStatus.Failed, scope);
};

export { generate, openProjectVSCode };
