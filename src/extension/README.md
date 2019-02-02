# Azure Account and Sign-In
The Azure Account extension provides a single Azure sign-in and subscription filtering experience for all other Azure extensions. It makes Azure's Cloud Shell service available in VS Code's integrated terminal.

## Commands


| Command |  |
| --- | --- |
| `Azure: Sign In`  | Sign in to your Azure subscription.
| `Azure: Sign In with Device Code` | Sign in to your Azure subscription with a device code. Use this in setups where the Sign In command does not work.
| `Azure: Sign In to Azure Cloud` | Sign in to your Azure subscription in one of the sovereign clouds.
| `Azure: Sign Out` | Sign out of your Azure subscription.
| `Azure: Select Subscriptions` | Pick the set of subscriptions you want to work with. Extensions should respect this list and only show resources within the filtered subscriptions.
| `Azure: Create an Account`  | If you don't have an Azure Account, you can [sign up](https://azure.microsoft.com/en-us/free/?utm_source=campaign&utm_campaign=vscode-azure-account&mktingSource=vscode-azure-account) for one today and receive $200 in free credits.
| `Azure: Open Bash in Cloud Shell`<sup>1</sup> | Open a new terminal running Bash in Cloud Shell.
| `Azure: Open PowerShell in Cloud Shell`<sup>1</sup> | Open a new terminal running PowerShell in Cloud Shell.
| `Azure: Upload to Cloud Shell`<sup>1</sup> | Upload a file to your Cloud Shell storage account
<sup>1</sup> On Windows: Requires Node.js 6 or later to be installed (https://nodejs.org).

## Settings

| Name | Description | Default |
| --- | --- | --- |
| azure.resourceFilter | The resource filter, each element is a tenant id and a subscription id separated by a slash.	 |
| azure.showSignedInEmail | Whether to show the email address (e.g., in the status bar) of the signed in account.	 | true
| azure.tenant | A specific tenant to sign in to. The default is to sign in to the common tenant and use all known tenants. |
| azure.cloud | The current Azure Cloud to connect to. | Azure
| azure.ppe | Development setting: The PPE environment for testing. |

## Contributing

This project welcomes contributions and suggestions.  Most contributions require you to agree to a
Contributor License Agreement (CLA) declaring that you have the right to, and actually do, grant us
the rights to use your contribution. For details, visit https://cla.microsoft.com.

When you submit a pull request, a CLA-bot will automatically determine whether you need to provide
a CLA and decorate the PR appropriately (e.g., label, comment). Simply follow the instructions
provided by the bot. You will only need to do this once across all repos using our CLA.

This project has adopted the [Microsoft Open Source Code of Conduct](https://opensource.microsoft.com/codeofconduct/).
For more information see the [Code of Conduct FAQ](https://opensource.microsoft.com/codeofconduct/faq/) or
contact [opencode@microsoft.com](mailto:opencode@microsoft.com) with any additional questions or comments.

## License
[MIT](LICENSE.md)

The Visual Studio Code logo is under the [license](https://code.visualstudio.com/license) of the Visual Studio Code product.