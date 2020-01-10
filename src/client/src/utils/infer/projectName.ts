import { IVSCodeObject } from "../../reducers/vscodeApiReducer";
import { addExistingProjectNameValidate} from '../validations/validations';

export interface IStateValidationProjectName {
  isValid:boolean;
  errorMessage:string;
}

export const inferProjectName = async (outputPath:string, vscode: IVSCodeObject) => {
  let projectName:string = "";
  let validate:IStateValidationProjectName;
  const baseProjectName:string = "myApp";

  validate = await addExistingProjectNameValidate(baseProjectName, outputPath, vscode);
  if (validate.isValid===true) projectName = baseProjectName;

  if (projectName==""){
    for (var i=1; i<100; i++){
      let sugeredProjectName = baseProjectName + i.toString();
      let validate:IStateValidationProjectName = await addExistingProjectNameValidate(projectName, outputPath, vscode);
      if (validate.isValid){
        projectName=sugeredProjectName;
        break;
      }
    }
  }

  return projectName;
};