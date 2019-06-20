import { CoreTemplateStudio } from "../coreTemplateStudio";
import { CONSTANTS } from "../constants_test";

let instance: CoreTemplateStudio;
let backend: string[] = [];
let frontend: string[] = [];
let pagesObj: any[] = [];
const projType = "FullStackWebApp";
let syncAttemptNum = 0;

function delay(time: number) {
  return new Promise(function(resolve) {
    setTimeout(resolve, time);
  });
}

let attemptSync: any = (
  instanceObj: CoreTemplateStudio,
  syncAttemptNum: number
) => {
  if (syncAttemptNum < CONSTANTS.API.MAX_SYNC_REQUEST_ATTEMPTS) {
    return instanceObj
      .sync({
        port: instance.getPort(),
        payload: { path: CONSTANTS.API.DEVELOPMENT_PATH_TO_TEMPLATES },
        liveMessageHandler: value => {
          value;
        }
      })
      .then(() => {
        instance
          .getFrameworks(projType)
          .then(frameworks => {
            frameworks.forEach(
              (obj: { tags: { type: string }; name: string }) => {
                if (obj.tags.type == "frontend") {
                  frontend.push(obj.name);
                } else if (obj.tags.type == "backend") {
                  backend.push(obj.name);
                }
              }
            );
            instance
              .getPages(projType, frontend[0], backend[0])
              .then(pages => {
                pages.forEach((page: { name: any; templateId: any }) => {
                  pagesObj.push({
                    name: page.name,
                    identity: page.templateId
                  });
                });

                function generateProj(backend: string, frontend: string) {
                  return () => {
                    console.log(`generating ${backend} ${frontend}`);
                    return instance.generate({
                      port: instance.getPort(),
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
                  };
                }

                let prevPromise: Promise<any> = Promise.resolve(null);
                for (var i = 0; i < frontend.length; i++) {
                  for (var j = 0; j < backend.length; j++) {
                    prevPromise = prevPromise.then(
                      generateProj(backend[j], frontend[i])
                    );
                  }
                }

                prevPromise.then(() => {
                  console.log("done");
                });
              })
              .catch((error: Error) => {
                throw Error(error.toString());
              });
          })
          .catch((error: Error) => {
            throw Error(error.toString());
          });
      })
      .catch(() => {
        syncAttemptNum++;
        return delay(3000).then(() => attemptSync(instance, syncAttemptNum));
      });
  }
  if (syncAttemptNum >= CONSTANTS.API.MAX_SYNC_REQUEST_ATTEMPTS) {
    CoreTemplateStudio.DestroyInstance();
    throw new Error("too many failed sync requests");
  }
};

//to do - call sync again
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
// 	Make sure your} Typescript script gets compiled into JavaScript by yarn build (Node cannot run Typescript directly, so it needs to be converted into JavaScript first)
// 	Add a yarn generate in package.json ("generate": "react-scripts generate-test")?
// 	Add a step to the dev build pipeline that calls yarn generate after building the extension. Make sure pipeline fails if your generate script outputs any errors
