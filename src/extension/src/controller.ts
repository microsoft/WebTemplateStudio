import { AzureAuth } from './azure-auth/azureAuth';
export abstract class Controller {
    /**
     * Handles messages from the wizard
     *
     * */
    public static getSubscriptions() {
        return AzureAuth.getSubscriptions();
    }

}