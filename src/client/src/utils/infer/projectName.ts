import { IVSCodeObject } from "../../reducers/vscodeApiReducer";
import { addExistingProjectNameValidate, IValidation} from '../validations/validations';

export const inferProjectName = async (outputPath: string, vscode: IVSCodeObject) => {
  let projectName = "";
  const baseProjectName = "myApp";
  const validate = await addExistingProjectNameValidate(baseProjectName, outputPath, vscode);

  if (validate.isValid===true){
    projectName = baseProjectName;
  }else{
    for (let i=1; i<100; i++){
      const sugeredProjectName = baseProjectName + i.toString();
      const validate: IValidation = await addExistingProjectNameValidate(sugeredProjectName, outputPath, vscode);

      if (validate.isValid){
        projectName=sugeredProjectName;
        break;
      }
    }
  }

  return projectName;
};