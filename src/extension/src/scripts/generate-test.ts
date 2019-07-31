import { CoreTemplateStudio } from "../coreTemplateStudio";
import { CONSTANTS } from "../constants";

let instance: CoreTemplateStudio;
let backends: string[] = [];
let frontends: string[] = [];
const projType = "FullStackWebApp";
let syncAttemptNum = 0;
let prevPromise: Promise<any> = Promise.resolve(null);

const delay = (time: number) => {
  return new Promise(function (resolve) {
    setTimeout(resolve, time);
  });
};

let getPagesObj = (
  instance: CoreTemplateStudio,
  frontend: string,
  backend: string
) => {
  return instance
    .getPages(projType, frontend, backend)
    .then(pages => {
      return pages.map((page: { name: string; templateId: string }) => {
        return { name: page.name, identity: page.templateId };
      });
    })
    .catch((error: Error) => {
      console.log(error.toString());
    });
};

let generateProj = (
  instance: CoreTemplateStudio,
  backend: string,
  frontend: string
) => {
  return getPagesObj(instance, frontend, backend).then(pagesObj => {
    return instance.generate({
      payload: {
        backendFramework: backend,
        frontendFramework: frontend,
        pages: pagesObj,
        path: "../../../../../src/extension/src/template_test",
        projectName: backend + "-" + frontend,
        projectType: projType,
        services: []
      },
      liveMessageHandler: value => {
        value;
      }
    });
  });
};

let attemptSync: any = (
  instanceObj: CoreTemplateStudio,
  syncAttemptNum: number
) => {
  if (syncAttemptNum >= CONSTANTS.API.MAX_SYNC_REQUEST_ATTEMPTS) {
    CoreTemplateStudio.DestroyInstance();
    throw new Error("too many failed sync requests");
  }
  return instanceObj
    .sync({
      payload: { path: CONSTANTS.API.DEVELOPMENT_PATH_TO_TEMPLATES },
      liveMessageHandler: value => {
        value;
      }
    })
    .then(async () => {
      return await instance.getFrameworks(projType);
    })
    .then(frameworks => {
      frameworks.forEach((obj: { tags: { type: string }; name: string }) => {
        if (obj.tags.type == "frontend") {
          frontends.push(obj.name);
        } else if (obj.tags.type == "backend") {
          backends.push(obj.name);
        }
      });

      frontends.forEach(frontendFrameWork => {
        backends.forEach(backendFramework => {
          prevPromise = prevPromise.then(() =>
            generateProj(instance, backendFramework, frontendFrameWork)
          );
        });
      });

      prevPromise.then(() => {
        console.log("project generation complete");
        CoreTemplateStudio.DestroyInstance();
      });
    })
    .catch(() => {
      syncAttemptNum++;
      return delay(3000).then(() => attemptSync(instance, syncAttemptNum));
    });
};

CoreTemplateStudio.GetInstance(undefined)
  .then(res => {
    instance = res;
  })
  .then(() => {
    return attemptSync(instance, syncAttemptNum);
  })
  .catch((error: Error) => {
    throw Error(error.toString());
  });
