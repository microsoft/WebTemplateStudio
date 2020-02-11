import { mapStateToProps } from './store';
import { IStateProps } from './interfaces';
import { AppState } from '../../../reducers';
import { getIVSCodeApi, getInitialState } from '../../../mockData/testing';
import { FormattedMessage } from 'react-intl';
import { validationMessages } from '../../../utils/validations/messages';

describe("validate infer name", () => {
  it("is not same",()=>{
    /*const state:AppState = {
      vscode:getIVSCodeApi().vscode,
      wizardContent:{
      },
      selection:{
        appType:getISelected(),
        frontendFramework:getISelected(),
        backendFramework:getISelected(),
        pages:[getISelected()],
        services:{
          azureFunctions:{
            selection:[],
            chooseExistingRadioButtonSelected: "",
            appNameAvailability: {
              isAppNameAvailable: true,
              message: ""
            },
            wizardContent: {
              serviceType: "" as unknown as FormattedMessage.MessageDescriptor
            }
          },
          cosmosDB:{
            selection:[],
            accountNameAvailability: {
              isAccountNameAvailable: true,
              message: ""
            },
            wizardContent: {
              serviceType: "" as unknown as FormattedMessage.MessageDescriptor
            }
          },
          appService:{
            selection:{
              subscription:"",
              isMicrosoftLearnSubscription:"",
              resourceGroup:"",
              internalName:"",
              siteName:""
            },
            siteNameAvailability: {
              isSiteNameAvailable: true,
              message: ""
            },
            wizardContent: {
              serviceType: "" as unknown as FormattedMessage.MessageDescriptor
            }
          }
        },
        outputPathObject:{
          outputPath:""
        },
        isValidatingName:false,
        projectNameObject:{
          projectName:"",
          validation:{
            isValid: false,
            error: validationMessages.default,
            isDirty:false
          }
        },
        validations:{}
      }
    };*/

    const mapStateToPropsInstance:IStateProps = mapStateToProps(getInitialState());

    expect(mapStateToPropsInstance.vscode != undefined).toBeTruthy();
    expect(mapStateToPropsInstance.pageOutOfBounds).toBeFalsy();
    expect(mapStateToPropsInstance.selectedFrontend != undefined).toBeTruthy();
    expect(mapStateToPropsInstance.selectedPages != undefined).toBeTruthy();
  });
});