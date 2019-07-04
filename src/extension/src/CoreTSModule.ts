import { WizardServant, IPayloadResponse } from "./wizardServant";
import { ExtensionCommand } from "./constants";
import { CoreTemplateStudio } from "./coreTemplateStudio";

export class CoreTSModule extends WizardServant {
    clientCommandMap: Map<
        ExtensionCommand,
        (message: any) => Promise<IPayloadResponse>
    >;

    constructor() {
        super();
        this.clientCommandMap = this.defineCommandMap();
        console.log("creating CoreTSmodule");
    }

    private defineCommandMap(): Map<
        ExtensionCommand,
        (message: any) => Promise<IPayloadResponse>
    > {
        return new Map([[ExtensionCommand.GetFrameworks, this.getFrameworks]]);
    }

    async getFrameworks(message: any): Promise<IPayloadResponse> {
        let result = await CoreTemplateStudio.GetExistingInstance().getFrameworks(message.payload.projectType);
        return {
            payload: {
                frameworks: result,
                isPreview: message.payload.isPreview,
                projectType: message.payload.projectType
            }
        };
    }
}
