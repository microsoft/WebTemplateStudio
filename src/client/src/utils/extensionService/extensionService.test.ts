
import { projectPathValidation } from "./extensionService";

import { IVSCodeObject } from "../../reducers/vscodeApiReducer";

import {
  EXTENSION_COMMANDS
} from "../constants";


xdescribe("wizardSelectionSelector", () => {
  let mockVsCode: IVSCodeObject;
  let callbackExtension: Function;

  describe("validate project name", () => {
    let mockCallbackProjectPathValidation = {};

    describe("not exist => valid", () => {
      beforeEach(()=>{
        window.addEventListener = jest.fn((event, cb) => {
          callbackExtension = cb;
        });

        mockCallbackProjectPathValidation = {
          data:{
            command:EXTENSION_COMMANDS.PROJECT_PATH_VALIDATION,
            payload:{
              scope:222,
              projectPathValidation:{
                isValid:true
              }
            }
          }
        };

        const postMessage = jest.fn(() =>callbackExtension(mockCallbackProjectPathValidation));
        mockVsCode = { postMessage };
      })

      it("is valid, dont exist",(resolve)=>{
        projectPathValidation("dfss","sdfsdf", mockVsCode).then((event: any)=>{
          expect(event.data.payload.projectPathValidation.isValid).toBeTruthy();
          resolve();
        })
      })
    });
  });
});