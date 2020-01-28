
import { projectPathValidation } from "./extensionService";

import { IVSCodeObject } from "../../reducers/vscodeApiReducer";

import {
  EXTENSION_COMMANDS
} from "../constants";


describe("wizardSelectionSelector", () => {
  let mockVsCode:IVSCodeObject;
  let callbackExtension:Function;

  describe("validate project name", () => {
    let mockCallbackProjectPathValidation:Object = {};

    describe("not exist => valid", () => {
      beforeEach(()=>{
        window.addEventListener = jest.fn((event, cb) => {
          callbackExtension = cb;
        });

        mockCallbackProjectPathValidation = {
          data:{
            command:EXTENSION_COMMANDS.PROJECT_PATH_VALIDATION,
            payload:{
              projectPathValidation:{
                isValid:true
              }
            }
          }
        };

        const postMessage= (message: any) =>{
          callbackExtension(mockCallbackProjectPathValidation);
        }
        mockVsCode = { postMessage };
      })
  
      it("is valid, dont exist",(resolve)=>{
        projectPathValidation("", mockVsCode).then((event:any)=>{
          expect(event.data.payload.projectPathValidation.isValid).toBeTruthy();
          resolve();
        })
      })
    });

    describe("exist => not valid", () => {
      beforeEach(()=>{
        window.addEventListener = jest.fn((event, cb) => {
          callbackExtension = cb;
        });

        mockCallbackProjectPathValidation = {
          data:{
            command:EXTENSION_COMMANDS.PROJECT_PATH_VALIDATION,
            payload:{
              projectPathValidation:{
                isValid:false
              }
            }
          }
        };

        const postMessage= (message: any) =>{
          callbackExtension(mockCallbackProjectPathValidation);
        }
        mockVsCode = { postMessage };
      })

      it("is valid, dont exist",(resolve)=>{
        projectPathValidation("", mockVsCode).then((event:any)=>{
          expect(event.data.payload.projectPathValidation.isValid).toBeFalsy();
          resolve();
        })
      })
    });
  });
});