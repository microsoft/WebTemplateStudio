import { CoreTemplateStudio } from "../coreTemplateStudio";
import { PLATFORM } from "../constants/constants";
import { CLI_SETTINGS } from "../constants/cli";
import retry from "p-retry";

let instance: CoreTemplateStudio;
let backends: string[] = [];
let frontends: string[] = [];
//TODO: This will need extending when React Native is complete
const projType = "FullStackWebApp";
let prevPromise: Promise<any> = Promise.resolve(null);

let syncTemplates = async () => {
  try {
    console.log(`Sync templates`);
    const path = CLI_SETTINGS.DEVELOPMENT_PATH_TO_TEMPLATES;
    const payload = { path, platform: PLATFORM.WEB };
    const syncPayload = { payload, liveMessageHandler: (value: any) => value };

    await retry(() => instance.sync(syncPayload), {
      retries: CLI_SETTINGS.MAX_SYNC_REQUEST_ATTEMPTS,
    });
  } catch (error) {
    CoreTemplateStudio.DestroyInstance();
    throw new Error("too many failed sync requests");
  }
};

let getFrameworks = async () => {
  try {
    const frameworks = await instance.getFrameworks(projType);
    frameworks.forEach((obj: { tags: { type: string }; name: string }) => {
      if (obj.tags.type == "frontend") {
        frontends.push(obj.name);
      } else if (obj.tags.type == "backend") {
        backends.push(obj.name);
      }
    });
  } catch (e) {
    console.log(e.toString());
  }
};

let getPages = async (frontend: string, backend: string) => {
  try {
    const pages = await instance.getPages(projType, frontend, backend);
    return pages.map((page: { name: string; templateId: string }) => {
      return { name: page.name, identity: page.templateId };
    });
  } catch (error) {
    console.log(error.toString());
  }
};

let generateProject = async (frontend: string, backend: string) => {
  console.log(`Generating ${frontend}-${backend}`);
  const pagesObj = await getPages(frontend, backend);
  return instance.generate({
    payload: {
      backendFramework: backend,
      frontendFramework: frontend,
      backendFrameworkLinuxVersion: "",
      pages: pagesObj,
      path: "../../../../../template_test",
      projectName: backend + "-" + frontend,
      projectType: projType,
      services: [],
    },
    liveMessageHandler: (value) => value,
  });
};

const generateProjects = async () => {
  frontends.forEach((frontend) => {
    backends.forEach((backend) => {
      prevPromise = prevPromise.then(() => generateProject(frontend, backend));
    });
  });

  prevPromise.then(() => {
    console.log("project generation complete");
    CoreTemplateStudio.DestroyInstance();
  });
};

CoreTemplateStudio.GetInstance(undefined)
  .then((res) => (instance = res))
  .then(syncTemplates)
  .then(getFrameworks)
  .then(generateProjects)
  .catch((error: Error) => {
    throw Error(error.toString());
  });
