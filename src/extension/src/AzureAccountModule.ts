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
    vscode.commands.executeCommand("azure-account.login");
  }
  /**
   * azureAccountLoginToCloud
   */
  public static async azureAccountLoginToCloud() {
    vscode.commands.executeCommand("azure-account.loginToCloud");
  }
  /**
   * azureAccountSelectSubscriptions
   */
  public static async azureAccountSelectSubscriptions() {
    vscode.commands.executeCommand("azure-account.selectSubscriptions");
  }
  /**
   * azureAccountLogin
   */
  public static async azureAccountSignOut() {
    vscode.commands.executeCommand("azure-account.logout");
  }
}
