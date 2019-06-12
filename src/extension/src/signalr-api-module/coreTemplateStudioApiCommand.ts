import { ICommandPayload } from "./commandPayload";
import * as signalR from "@aspnet/signalr";

export abstract class CoreTemplateStudioApiCommand {
  protected readonly commandPayload: ICommandPayload;

  constructor(commandPayload: ICommandPayload) {
    this.commandPayload = commandPayload;
  }

  public async execute(
    connection: signalR.HubConnection
  ): Promise<any> {
    return this.performCommandAction(connection);
  }

  abstract async performCommandAction(
    connection: signalR.HubConnection
  ): Promise<any>;
}
