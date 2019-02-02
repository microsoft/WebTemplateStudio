/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import * as msRest from 'ms-rest';
import * as msRestAzure from 'ms-rest-azure';

// Copied and adapted from the Azue SDK.

export class TenantDetailsClient extends msRestAzure.AzureServiceClient {

	acceptLanguage = 'en-US';
	longRunningOperationRetryTimeout = 30;
	generateClientRequestId = true;
	details = new Details(this);

	constructor(public credentials: any, public tenantID: string, public baseUri = 'https://graph.windows.net') {
		super(credentials, {});

		let packageInfo = this.getPackageJsonInfo(__dirname);
		this.addUserAgentInfo(`${packageInfo.name}/${packageInfo.version}`);

		(<any>msRest).addSerializationMixin(this);
	}

}

export interface TenantDetails {
	objectId: string;
	displayName: string;
	verifiedDomains: { name: string; default: boolean; }[];
}

class Details {
	constructor(private client: TenantDetailsClient) {
	}

	getWithHttpOperationResponse() {
		return new Promise((resolve, reject) => {
			this._get((err, result, request, response) => {
				let httpOperationResponse = new (<any>msRest).HttpOperationResponse(request, response);
				httpOperationResponse.body = result;
				if (err) { reject(err); }
				else { resolve(httpOperationResponse); }
				return;
			});
		});
	}

	get() {
		return new Promise<{ value: [TenantDetails] }>((resolve, reject) => {
			this._get((err, result, request, response) => {
				if (err) { reject(err); }
				else { resolve(result); }
			});
		});
	}

	_get(callback: (err: any, result?: any, request?: any, response?: any) => void) {
		let client = this.client;
		let apiVersion = '1.6';

		// Construct URL
		let baseUrl = this.client.baseUri;
		let requestUrl = baseUrl + (baseUrl.endsWith('/') ? '' : '/') + '{tenantID}/tenantDetails';
		requestUrl = requestUrl.replace('{tenantID}', encodeURIComponent(this.client.tenantID));
		requestUrl += '?' + 'api-version=' + encodeURIComponent(apiVersion);

		// Create HTTP transport objects
		let httpRequest: any = new msRest.WebResource();
		httpRequest.method = 'GET';
		httpRequest.headers = {};
		httpRequest.url = requestUrl;
		// Set Headers
		if (this.client.generateClientRequestId) {
			httpRequest.headers['x-ms-client-request-id'] = (<any>msRestAzure).generateUuid();
		}
		if (this.client.acceptLanguage !== undefined && this.client.acceptLanguage !== null) {
			httpRequest.headers['accept-language'] = this.client.acceptLanguage;
		}
		httpRequest.headers['Content-Type'] = 'application/json; charset=utf-8';
		httpRequest.body = null;
		// Send Request
		return (<any>client).pipeline(httpRequest, (err: any, response: any, responseBody: any) => {
			if (err) {
				return callback(err);
			}
			let statusCode = response.statusCode;
			if (statusCode !== 200) {
				let error: any = new Error(responseBody);
				error.statusCode = response.statusCode;
				error.request = (<any>msRest).stripRequest(httpRequest);
				error.response = (<any>msRest).stripResponse(response);
				if (responseBody === '') responseBody = null;
				let parsedErrorResponse;
				try {
					parsedErrorResponse = JSON.parse(responseBody);
					if (parsedErrorResponse) {
						let internalError = null;
						if (parsedErrorResponse.error) internalError = parsedErrorResponse.error;
						error.code = internalError ? internalError.code : parsedErrorResponse.code;
						error.message = internalError ? internalError.message : parsedErrorResponse.message;
					}
					if (parsedErrorResponse !== null && parsedErrorResponse !== undefined) {
						error.body = parsedErrorResponse;
					}
				} catch (defaultError) {
					error.message = `Error "${defaultError.message}" occurred in deserializing the responseBody ` +
						`- "${responseBody}" for the default response.`;
					return callback(error);
				}
				return callback(error);
			}
			// Create Result
			let result = null;
			if (responseBody === '') responseBody = null;
			// Deserialize Response
			if (statusCode === 200) {
				let parsedResponse = null;
				try {
					parsedResponse = JSON.parse(responseBody);
					result = JSON.parse(responseBody);
					if (parsedResponse !== null && parsedResponse !== undefined) {
						result = parsedResponse;
					}
				} catch (error) {
					let deserializationError: any = new Error(`Error ${error} occurred in deserializing the responseBody - ${responseBody}`);
					deserializationError.request = (<any>msRest).stripRequest(httpRequest);
					deserializationError.response = (<any>msRest).stripResponse(response);
					return callback(deserializationError);
				}
			}

			return callback(null, result, httpRequest, response);
		});
	}
}
