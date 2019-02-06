import * as vscode from 'vscode';

export class CosmosDbModule {

	// Account commands
	async createAccount() {
		return await vscode.commands.executeCommand('cosmosDB.createAccount');
	}

	async deleteAccount() {
		return await vscode.commands.executeCommand('cosmosDB.deleteAccount');
	}

	async copyConnectionString() {
		return await vscode.commands.executeCommand('cosmosDB.copyConnectionString');
	}

	async detachDatabaseAccount() {
		return await vscode.commands.executeCommand("cosmosDB.detachDatabaseAccount");
	}

	async attachDatabaseAccount() {
		return await vscode.commands.executeCommand("cosmosDB.attachDatabaseAccount");
	}

	// Mongo DB commands
	async createMongoDocument() {
		return await vscode.commands.executeCommand("cosmosDB.createMongoDocument");
	}

	async createMongoCollection() {
		return await vscode.commands.executeCommand("cosmosDB.createMongoCollection");
	}

	async executeMongoCommand() {
		return await vscode.commands.executeCommand('cosmosDB.executeMongoCommand');
	}

	async createMongoDatabase() {
		return await vscode.commands.executeCommand("cosmosDB.createMongoDatabase");
	}

	async connectMongoDB() {
		return await vscode.commands.executeCommand("cosmosDB.connectMongoDB");
	}

	async deleteMongoDB() {
		return await vscode.commands.executeCommand("cosmosDB.deleteMongoDB");
	}

	async deleteMongoCollection() {
		return await vscode.commands.executeCommand("cosmosDB.deleteMongoCollection");
	}

	async deleteMongoDocument() {
		return await vscode.commands.executeCommand("cosmosDB.deleteMongoDocument");
	}

	async executeAllMongoCommands() {
		return await vscode.commands.executeCommand("cosmosDB.executeAllMongoCommands");
	}

	async importDocument() {
		return await vscode.commands.executeCommand("cosmosDB.importDocument");
	}

	async openDocument() {
		return await vscode.commands.executeCommand("cosmosDB.openDocument");
	}

	async newMongoScrapbook() {
		return await vscode.commands.executeCommand("cosmosDB.newMongoScrapbook");
	}

	async launchMongoShell() {
		return await vscode.commands.executeCommand("cosmosDB.launchMongoShell");
	}

	// Doc DB commands

	async createDocDBStoredProcedure() {
		return await vscode.commands.executeCommand("cosmosDB.createDocDBStoredProcedure");
	}

	async createDocDBDocument() {
		return await vscode.commands.executeCommand("cosmosDB.createDocDBDocument");
	}

	async createDocDBCollection() {
		return await vscode.commands.executeCommand("cosmosDB.createDocDBCollection");
	}

	async createDocDBDatabase() {
		return await vscode.commands.executeCommand("cosmosDB.createDocDBDatabase");
	}

	async deleteDocDBDatabase() {
		return await vscode.commands.executeCommand("cosmosDB.deleteDocDBDatabase");
	}

	async deleteDocDBCollection() {
		return await vscode.commands.executeCommand("cosmosDB.deleteDocDBCollection");
	}

	async deleteDocDBDocument() {
		return await vscode.commands.executeCommand("cosmosDB.deleteDocDBDocument");
	}

	async openStoredProcedure() {
		return await vscode.commands.executeCommand("cosmosDB.openStoredProcedure");
	}

	// Graph commands

	async createGraphDatabase() {
		return await vscode.commands.executeCommand("cosmosDB.createGraphDatabase");
	}

	async createGraph() {
		return await vscode.commands.executeCommand("cosmosDB.createGraph");
	}

	async deleteGraphDatabase() {
		return await vscode.commands.executeCommand("cosmosDB.deleteGraphDatabase");
	}

	async deleteGraph() {
		return await vscode.commands.executeCommand("cosmosDB.deleteGraph");
	}

	async openGraphExplorer() {
		return await vscode.commands.executeCommand("cosmosDB.openGraphExplorer");
	}

	// other

	async openCollection() {
		return await vscode.commands.executeCommand("cosmosDB.openCollection");
	}

	async openInPortal() {
		await vscode.commands.executeCommand("cosmosDB.openInPortal");
	}

	async attachEmulator() {
		return await vscode.commands.executeCommand("cosmosDB.attachEmulator");
	}

	async loadMore() {
		return await vscode.commands.executeCommand("cosmosDB.loadMore");
	}

	async update() {
		return await vscode.commands.executeCommand("cosmosDB.update");
	}
}
