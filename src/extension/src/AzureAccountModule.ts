import * as vscode from "vscode";
/**
 * Wrap azure-account extension
 */
export class AzureAccount {
  /**
   * azureAccountCreateAccount
   */
  public static async azureAccountCreateAccount() {
    vscode.commands.executeCommand("azure-account.createAccount");
  }
  /**
   * azureAccountLogin
   */
  public static async azureAccountLogin() {
    await vscode.commands.executeCommand("azure-account.login");
  }
  /**
   * azureAccountLoginToCloud
   */
  public static async azureAccountLoginToCloud() {
    await vscode.commands.executeCommand("azure-account.loginToCloud");
  }
  /**
   * azureAccountSelectSubscriptions
   */
  public static async azureAccountSelectSubscriptions() {
    await vscode.commands.executeCommand("azure-account.selectSubscriptions");
  }
  /**
   * azureAccountLogin
   */
  public static async azureAccountSignOut() {
    await vscode.commands.executeCommand("azure-account.logout");
  }
}
