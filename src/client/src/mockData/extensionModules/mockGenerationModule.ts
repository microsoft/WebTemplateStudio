import { EXTENSION_COMMANDS } from "../../utils/constants";
import { GenerationItemStatus } from "../../types/generationStatus";

const wait = (m: number) => new Promise((r) => setTimeout(r, m));

const generate = async (message: any) => {
  const scope = message.payload && message.payload.scope ? message.payload.scope : "";
  const { pages, services } = message.payload;

  sendGenerationStatus("templates", GenerationItemStatus.Generating, scope);
  await mockGenerateTemplates(pages, scope);
  sendGenerationStatus("templates", GenerationItemStatus.Sucess, scope);

  if (services.appService) {
    sendGenerationStatus("appService", GenerationItemStatus.Generating, scope);
    await wait(1000);
    sendGenerationStatus("appService", GenerationItemStatus.Sucess, scope);
  }

  if (services.appService) {
    sendGenerationStatus("cosmosDb", GenerationItemStatus.Generating, scope);
    await wait(2500);
    sendGenerationStatus("appService", GenerationItemStatus.Failed, scope);
  }

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

export { generate, openProjectVSCode };
