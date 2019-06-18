"use strict";
exports.__esModule = true;
var coreTemplateStudio_1 = require("../coreTemplateStudio");
coreTemplateStudio_1.CoreTemplateStudio.GetInstance(undefined)
    .then(function (instance) {
    var projType = "FullStackWebApp";
    console.log(instance);
    console.log("hey");
    instance
        .getFrameworks(projType)
        .then(function (results) {
        console.log(results);
    })["catch"](function () {
        console.log("cannot get frameworks");
    });
    return instance;
})["catch"](function () {
    console.log("promise rejectedd");
});
//console.log(corets.then(instance => {}));
//let coretsInstance = corets.getInstance(undefined);
//const projType = "FullStackWebApp";
//let frontendFramework = corets.getFrameworks(projType); //i think its {{"name": "angular"}, {"name": "vue"}}
//CoreTemplateStudio.GetExistingInstance().getFrameworks
//let backendFramework = corets.getFrameworks(projType).backend;
//let frontendFramework = corets.getFrameworks(projType).frontend;
//console.log(corets);
//console.log(frontendFramework);
//console.log(projType);
// let count = 0;
// let projNameStr = "proj"
// let projNum = new Number(count)
// let projName = projNameStr.concat(projNum.toString());
//for(let item in )
// let projectPayload = {
//   backendFramework: item[j].name;
//   frontendFramework: item[i].name;
//   pages:
//   path: '/';
//   projectName: projName;
//   projectType: projType;
//   services: ''
// }
// await coretsInstance.generate(projectPayload);
// coretsInstance.sync(projectPayload)
// import coreTemplateStudio, call coreTemplateStudio.getInstance(context) (context would be str extension path that I have to find/).
// using an imported LaunchExpenience class, pass in the context, call attemptSync()?
//get json of frontend frameworks by calling coreTemplateStudio.getFrameworks(fullstack project type name), getFeatures, getPages (test it with 4 pages)
// [nvm]can i just	get a list of frontend and backend frameworks from the loop through the items in frontendframeworks.json and backendframeworks.json file and taking the name attribute
// mimck command payload with the diff permutations which is the following:
// export interface IGenerationPayloadType {
//   backendFramework: string;
//   frontendFramework: string;
//   pages: any;
//   path: string;
//   projectName: string;
//   projectType: string;
//   services: any;
// }
// call coreTEmplateSTudio_instance.generate(madeup payload)
//i could also be completely wrong, in which case rip
// 	Make sure your Typescript script gets compiled into JavaScript by yarn build (Node cannot run Typescript directly, so it needs to be converted into JavaScript first)
// 	Add a yarn generate in package.json ("generate": "react-scripts generate-test")?
// 	Add a step to the dev build pipeline that calls yarn generate after building the extension. Make sure pipeline fails if your generate script outputs any errors
