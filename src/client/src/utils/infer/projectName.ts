import { IVSCodeObject } from "../../reducers/vscodeApiReducer";
import { addExistingProjectNameValidate, IValidation} from '../validations/validations';

export const inferProjectName = async (outputPath:string, vscode: IVSCodeObject) => {
  let projectName:string = "";
  let validate:IValidation;
  const baseProjectName:string = "myApp";

  validate = await addExistingProjectNameValidate(baseProjectName, outputPath, vscode);
  if (validate.isValid===true){
    projectName = baseProjectName;
  }else{
    for (var i=1; i<100; i++){
      let sugeredProjectName = baseProjectName + i.toString();
      let validate:IValidation = await addExistingProjectNameValidate(sugeredProjectName, outputPath, vscode);

      if (validate.isValid){
        projectName=sugeredProjectName;
        break;
      }
    }
  }

  return projectName;
};