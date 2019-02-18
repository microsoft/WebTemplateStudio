import * as msrest from 'ms-rest-azure';

// temporary until integrated with azure auth
export abstract class AzureAuthentication {
    private static credentials: msrest.DeviceTokenCredentials;

    public static async getCredentials() : Promise<msrest.DeviceTokenCredentials> {
        if (this.credentials === null) {
            try {
            this.credentials = await msrest.interactiveLogin();
            } catch (err) {
                return Promise.reject(err);
            }
        }
        return this.credentials;
    }
}