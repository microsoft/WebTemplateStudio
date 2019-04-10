import { ICommandPayload } from "./commandPayload";
import * as signalR from "@aspnet/signalr";

export abstract class CoreTemplateStudioApiCommand {
  protected readonly commandPayload: ICommandPayload;

  constructor(commandPayload: ICommandPayload) {
    this.commandPayload = commandPayload;
  }

  public async execute(): Promise<any> {
    const connection = await this.connectToCoreApiHub();

    return this.performCommandAction(connection);
  }

  private async connectToCoreApiHub(): Promise<signalR.HubConnection> {
    const connection = new signalR.HubConnectionBuilder()
      .withUrl(`http://localhost:${this.commandPayload.port}/corehub`)
      .build();

    await connection.start().catch((error: Error) => console.log(error));

    return connection;
  }

  abstract async performCommandAction(
    connection: signalR.HubConnection
  ): Promise<any>;
}
