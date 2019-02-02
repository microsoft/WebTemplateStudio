/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import { Event, Terminal, Progress, CancellationToken } from 'vscode';
import { ServiceClientCredentials } from 'ms-rest';
import { AzureEnvironment } from 'ms-rest-azure';
import { SubscriptionModels } from 'azure-arm-resource';

export type AzureLoginStatus = 'Initializing' | 'LoggingIn' | 'LoggedIn' | 'LoggedOut';

export interface AzureAccount {
	readonly status: AzureLoginStatus;
	readonly onStatusChanged: Event<AzureLoginStatus>;
	readonly waitForLogin: () => Promise<boolean>;
	readonly sessions: AzureSession[];
	readonly onSessionsChanged: Event<void>;
	readonly subscriptions: AzureSubscription[];
	readonly onSubscriptionsChanged: Event<void>;
	readonly waitForSubscriptions: () => Promise<boolean>;
	readonly filters: AzureResourceFilter[];
	readonly onFiltersChanged: Event<void>;
	readonly waitForFilters: () => Promise<boolean>;
}

export interface AzureSession {
	readonly environment: AzureEnvironment;
	readonly userId: string;
	readonly tenantId: string;
	readonly credentials: ServiceClientCredentials;
}

export interface AzureSubscription {
	readonly session: AzureSession;
	readonly subscription: SubscriptionModels.Subscription;
}

export type AzureResourceFilter = AzureSubscription;

export interface UploadOptions {
	contentLength?: number;
	progress?: Progress<{ message?: string; increment?: number }>;
	token?: CancellationToken;
}
