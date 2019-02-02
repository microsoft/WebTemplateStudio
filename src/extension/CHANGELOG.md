# Change Log
All notable changes to the "ms-vscode.azure-account" extension will be documented in this file.

## [0.8.0]
- Simplified sign in ([#75](https://github.com/Microsoft/vscode-azure-account/issues/75)).
- Setting for specifying PPE environment.

## [0.7.1]
- Update dependencies.
- Include generated ThirdPartyNotice.txt.

## [0.7.0]
- Test system proxy support ([#27](https://github.com/Microsoft/vscode-azure-account/issues/27)).

## [0.6.2]
- Update README with settings ([#107](https://github.com/Microsoft/vscode-azure-account/pull/107)).
- Add README and CHANGELOG back to packaged extension.

## [0.6.1]
- Check connection state before logging in ([#106](https://github.com/Microsoft/vscode-azure-account/issues/106)).

## [0.6.0]
- Bundle using Webpack ([#87](https://github.com/Microsoft/vscode-azure-account/issues/87)).

## [0.5.1]
- Unable to get the subscription list from Azure China ([#103](https://github.com/Microsoft/vscode-azure-account/issues/103)).
- Handle case where home tenant is not listed ([#102](https://github.com/Microsoft/vscode-azure-account/issues/102)).

## [0.5.0]
- Support national clouds ([#83](https://github.com/Microsoft/vscode-azure-account/issues/83)).
- Support user-supplied tenants ([#58](https://github.com/Microsoft/vscode-azure-account/issues/58)).
- Indicate when there are no subscriptions ([#51](https://github.com/Microsoft/vscode-azure-account/issues/51)).
- Update dependencies.

## [0.4.3]
- Setting to hide email ([#66](https://github.com/Microsoft/vscode-azure-account/issues/66)).
- Only offer tenants with at least one subscription  ([#47](https://github.com/Microsoft/vscode-azure-account/issues/47)).
- Ignore focus-out in tenant picker ([#77](https://github.com/Microsoft/vscode-azure-account/issues/77)).

## [0.4.2]
- Request PowerShell Core on Linux, replacing PowerShell on Windows.
- Fix reading initial size ([#76](https://github.com/Microsoft/vscode-azure-account/issues/76)).

## [0.4.1]
- Update icon to 'key' ([#55](https://github.com/Microsoft/vscode-azure-account/issues/55)).
- Add NPS user survey
- Update dependencies
- Check if there is a default domain ([#68](https://github.com/Microsoft/vscode-azure-account/issues/68)).

## [0.4.0]
- Add command to upload files to Cloud Shell
- Use multi-select picker for subscription filter ([Microsoft/vscode#45589](https://github.com/Microsoft/vscode/issues/45589)).
- Add timeout in promise race ([#46](https://github.com/Microsoft/vscode-azure-account/pull/46)).
- Keep going after signing in ([#45](https://github.com/Microsoft/vscode-azure-account/issues/45)).

## [0.3.3]
- Robustness against tenant details not resolving ([#33](https://github.com/Microsoft/vscode-azure-account/issues/33)).
- Promote API to create a Cloud Shell ([#34](https://github.com/Microsoft/vscode-azure-account/issues/34)).

## [0.3.2]
- Let the user pick the tenant to open a Cloud Shell for ([#33](https://github.com/Microsoft/vscode-azure-account/issues/33))
- Experimental API to create a Cloud Shell ([#34](https://github.com/Microsoft/vscode-azure-account/issues/34))
- Remove extranous "Close" button ([#41](https://github.com/Microsoft/vscode-azure-account/issues/41))
- Update moment.js

## [0.3.1]
- Support for ASAR in preparation for [Microsoft/vscode#36997](https://github.com/Microsoft/vscode/issues/36997)

## [0.3.0]
- Cache subscriptions for faster startup
- Improved progress indication when starting Cloud Shell
- Bug fixes
	- Ignore failing tenants when signing in
	- Send ping on Cloud Shell websocket to keep alive
	- Supply graph and key vault tokens to Cloud Shell

## [0.2.2]
- Bug fix: Do not modify configuration object

## [0.2.1]
- Bug fixes
	- Avoid having to click 'Copy & Open' to advance the login
	- Retry resizing terminal on 503, 504

## [0.2.0]
- Cloud Shell integration
- API for subscriptions cache

## [0.1.3]
- API change: addFilter -> selectSubscriptions
- When no subscriptions found, suggest signing up for an account

## [0.1.0]
- Initial release