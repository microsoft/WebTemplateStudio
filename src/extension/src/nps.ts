/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

'use strict';

import { ExtensionContext, env, window, extensions, Uri, commands } from 'vscode';
import * as nls from 'vscode-nls';
import TelemetryReporter from 'vscode-extension-telemetry';

const localize = nls.loadMessageBundle();

const NPS_SURVEY_URL= 'https://www.surveymonkey.com/r/SMQM3DH';

const PROBABILITY = 0.15;
const SESSION_COUNT_KEY = 'nps/sessionCount';
const LAST_SESSION_DATE_KEY = 'nps/lastSessionDate';
const SKIP_VERSION_KEY = 'nps/skipVersion';
const IS_CANDIDATE_KEY = 'nps/isCandidate';

export function survey({ globalState }: ExtensionContext, reporter: TelemetryReporter) {
	(async () => {
		if (env.language !== 'en' && !env.language.startsWith('en-')) {
			return;
		}
		
		const skipVersion = globalState.get(SKIP_VERSION_KEY, '');
		if (skipVersion) {
			return;
		}

		const date = new Date().toDateString();
		const lastSessionDate = globalState.get(LAST_SESSION_DATE_KEY, new Date(0).toDateString());

		if (date === lastSessionDate) {
			return;
		}

		const sessionCount = globalState.get(SESSION_COUNT_KEY, 0) + 1;
		await globalState.update(LAST_SESSION_DATE_KEY, date);
		await globalState.update(SESSION_COUNT_KEY, sessionCount);

		if (sessionCount < 9) {
			return;
		}

		const isCandidate = globalState.get(IS_CANDIDATE_KEY, false)
			|| Math.random() < PROBABILITY;

		await globalState.update(IS_CANDIDATE_KEY, isCandidate);

		const extensionVersion = extensions.getExtension('ms-vscode.azure-account')!.packageJSON.version || 'unknown';
		if (!isCandidate) {
			await globalState.update(SKIP_VERSION_KEY, extensionVersion);
			return;
		}

		const take = {
			title: localize('azure-account.takeSurvey', "Take Survey"),
			run: async () => {
				/* __GDPR__
					"nps.survey/takeShortSurvey" : {}
				*/
				reporter.sendTelemetryEvent('nps.survey/takeShortSurvey');
				commands.executeCommand('vscode.open', Uri.parse(`${NPS_SURVEY_URL}?o=${encodeURIComponent(process.platform)}&v=${encodeURIComponent(extensionVersion)}&m=${encodeURIComponent(env.machineId)}`));
				await globalState.update(IS_CANDIDATE_KEY, false);
				await globalState.update(SKIP_VERSION_KEY, extensionVersion);
			}
		};
		const remind = {
			title: localize('azure-account.remindLater', "Remind Me Later"),
			run: async () => {
				/* __GDPR__
					"nps.survey/remindMeLater" : {}
				*/
				reporter.sendTelemetryEvent('nps.survey/remindMeLater');
				await globalState.update(SESSION_COUNT_KEY, sessionCount - 3);
			}
		};
		const never = {
			title: localize('azure-account.neverAgain', "Don't Show Again"),
			isSecondary: true,
			run: async () => {
				/* __GDPR__
					"nps.survey/dontShowAgain" : {}
				*/
				reporter.sendTelemetryEvent('nps.survey/dontShowAgain');
				await globalState.update(IS_CANDIDATE_KEY, false);
				await globalState.update(SKIP_VERSION_KEY, extensionVersion);
			}
		};
		/* __GDPR__
			"nps.survey/userAsked" : {}
		*/
		reporter.sendTelemetryEvent('nps.survey/userAsked');
		const button = await window.showInformationMessage(localize('azure-account.surveyQuestion', "Do you mind taking a quick feedback survey about the Azure Extensions for VS Code?"), take, remind, never);
		await (button || remind).run();
	})().catch(console.error);
}
